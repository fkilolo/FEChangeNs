import React, { useEffect, useState, useRef } from "react";
import { Select, Spin, Input, Button, message, Alert, Flex, Transfer, Table, Pagination, Drawer, Descriptions } from "antd";
import { callFetchSpaceshipList, callFetchSpaceshipDomains, callUpdateSpaceshipNameservers } from "@/config/api/business/spaceship.api";
import axios from "@/config/axios-customize";
import type { GetProp, TableColumnsType, TableProps, TransferProps } from 'antd';
import dayjs from "dayjs";
import { EyeOutlined } from "@ant-design/icons";

// TableTransfer component
// ... TableTransfer code ...
type TransferItem = GetProp<TransferProps, 'dataSource'>[number];
type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

interface DataType {
  key: string;
  name: string;
  nameservers?: { provider: string; hosts: string[] };
  expirationDate?: string;
}

interface TableTransferProps extends TransferProps<TransferItem> {
  dataSource: DataType[];
  leftColumns: TableColumnsType<DataType>;
  rightColumns: TableColumnsType<DataType>;
}

// Custom TableTransfer với phân trang bảng phải và bảng trái
const TableTransfer: React.FC<TableTransferProps & {
  leftPage: number;
  setLeftPage: (page: number) => void;
  leftPageSize: number;
  setLeftPageSize: (size: number) => void;
  leftTotal: number;
  rightPage: number;
  setRightPage: (page: number) => void;
  rightPageSize: number;
  setRightPageSize: (size: number) => void;
  rightSearch: string;
}> = (props) => {
  const { leftColumns, rightColumns, targetKeys, dataSource, leftPage, setLeftPage, leftPageSize, setLeftPageSize, leftTotal, rightPage, setRightPage, rightPageSize, setRightPageSize, rightSearch, ...restProps } = props;
  // Data bảng phải (selected)
  const rightData = dataSource.filter(item => targetKeys.includes(item.key));
  const rightDataFiltered = rightData.filter(item =>
    !rightSearch || item.name.toLowerCase().includes(rightSearch.toLowerCase())
  );
  const rightTotal = rightDataFiltered.length;
  const rightDataPaged = rightDataFiltered.slice((rightPage - 1) * rightPageSize, rightPage * rightPageSize);
  // Data bảng trái (chỉ là items của trang hiện tại, đã fetch từ API)
  const leftData = dataSource.filter(item => !targetKeys.includes(item.key));
  return (
    <Transfer style={{ width: '100%' }} targetKeys={targetKeys} {...restProps}>
      {({
        direction,
        filteredItems,
        onItemSelect,
        onItemSelectAll,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;
        const rowSelection: TableRowSelection<TransferItem> = {
          getCheckboxProps: () => ({ disabled: listDisabled }),
          onChange(selectedRowKeys) {
            onItemSelectAll(selectedRowKeys, 'replace');
          },
          selectedRowKeys: listSelectedKeys,
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
        };
        // Bảng phải: phân trang client-side
        if (direction === 'right') {
          return <>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={rightDataPaged}
              size="small"
              pagination={false}
              locale={{ emptyText: "Domain đã chọn" }}
              style={{ pointerEvents: listDisabled ? 'none' : undefined }}
              onRow={({ key, disabled: itemDisabled }) => ({
                onClick: () => {
                  if (itemDisabled || listDisabled) {
                    return;
                  }
                  onItemSelect(key, !listSelectedKeys.includes(key));
                },
              })}
            />
            <Pagination
              style={{ marginTop: 8, textAlign: 'right' }}
              current={rightPage}
              pageSize={rightPageSize}
              total={rightTotal}
              showSizeChanger
              pageSizeOptions={["1", "2", "3", "4", "5"]}
              onChange={(page, pageSize) => {
                setRightPage(page);
                setRightPageSize(pageSize || 10);
              }}
            />
          </>;
        }
        // Bảng trái: phân trang theo API (dựa vào leftTotal)
        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={leftData}
            size="small"
            pagination={{
              current: leftPage,
              pageSize: leftPageSize,
              total: leftTotal,
              showSizeChanger: true,
              pageSizeOptions: ["1", "2", "3", "4", "5"],
              onChange: (page, pageSize) => {
                setLeftPage(page);
                setLeftPageSize(pageSize || 10);
              },
            }}
            locale={{ emptyText: "Danh sách domain" }}
            style={{ pointerEvents: listDisabled ? 'none' : undefined }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) {
                  return;
                }
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
            onChange={(pagination, filters, sorter, extra) => {
              if (extra.action === 'filter' || extra.action === 'paginate' || extra.action === 'sort') return;
            }}
            onHeaderRow={() => ({
              onInput: (e: any) => {
                // This onInput is for the search input in the table header,
                // but the search input is in the TableTransfer component itself.
                // This handler is not directly used for the search input in the table.
              }
            })}
          />
        );
      }}
    </Transfer>
  );
};

const filterOption = (input: string, item: DataType) =>
  item.name?.toLowerCase().includes(input.toLowerCase());

const NameServer = () => {
  const [connects, setConnects] = useState<any[]>([]);
  const [loadingConnect, setLoadingConnect] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [domains, setDomains] = useState<DataType[]>([]);
  const [loadingDomain, setLoadingDomain] = useState(false);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [ns1, setNs1] = useState("");
  const [ns2, setNs2] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateResult, setUpdateResult] = useState<any[] | null>(null);
  const [limit, setLimit] = useState<number>(50);
  // State phân trang bảng trái
  const [leftPage, setLeftPage] = useState(1);
  const [leftPageSize, setLeftPageSize] = useState(10);
  const [leftTotal, setLeftTotal] = useState(0);
  const [leftSearchInput, setLeftSearchInput] = useState("");
  const [leftSearch, setLeftSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  // State phân trang bảng phải (đưa ra ngoài)
  const [rightPage, setRightPage] = useState(1);
  const [rightPageSize, setRightPageSize] = useState(10);
  const [rightSearch, setRightSearch] = useState("");
  // State cho Drawer chi tiết domain
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);
  const [detailDomain, setDetailDomain] = useState<{ connectId: string, domain: string } | null>(null);
  const [connectSearch, setConnectSearch] = useState("");

  // Đảm bảo handleShowDetail ở đúng scope trước khi khai báo columns
  const handleShowDetail = (record: DataType) => {
    console.log('Xem chi tiết domain:', record);
    setDetailOpen(true);
    setDetailLoading(true);
    axios.get(`/api/v1/spaceship/domains/${selectedId}/${record.name ? `detail/${record.name}/` : ''}`)
      .then(res => {
        console.log('Kết quả API detail:', res);
        setDetailData(res);
      })
      .finally(() => setDetailLoading(false));
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const columns: TableColumnsType<DataType> = [
    {
      dataIndex: 'name',
      title: 'Tên domain',
    },
    {
      dataIndex: 'nameservers',
      title: 'Nameserver',
      render: (ns) => ns?.hosts ? (
        <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
          {ns.hosts.map((h: string, i: number) => <li key={i}>{h}</li>)}
        </ul>
      ) : '',
      responsive: ['md'],
      // Ẩn trên mobile
      ...(isMobile ? { show: false } : {}),
    },
    {
      dataIndex: 'expirationDate',
      title: 'Ngày hết hạn',
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY') : '',
      responsive: ['md'],
      ...(isMobile ? { show: false } : {}),
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      render: (_, record) => (
        <a
          style={{ zIndex: 2, position: 'relative' }}
          onClick={e => { e.stopPropagation(); handleShowDetail(record); }}
          title="Xem chi tiết"
        >
          <EyeOutlined />
        </a>
      ),
      width: 110,
      align: 'center',
    },
  ];

  useEffect(() => {
    if (!detailOpen || !detailDomain) return;
    setDetailLoading(true);
    (async () => {
      try {
        const res = await axios.get(`/api/v1/spaceship/domains/${detailDomain.connectId}/detail/${detailDomain.domain}/`);
        setDetailData(res.data || null);
      } finally {
        setDetailLoading(false);
      }
    })();
  }, [detailOpen, detailDomain]);

  // Fetch connects khi search
  useEffect(() => {
    const fetchConnects = async () => {
      setLoadingConnect(true);
      try {
        const params = connectSearch ? `current=1&pageSize=10&search=${encodeURIComponent(connectSearch)}` : "current=1&pageSize=10";
        const res = await callFetchSpaceshipList(params);
        setConnects(res?.result || []);
      } finally {
        setLoadingConnect(false);
      }
    };
    fetchConnects();
  }, [connectSearch]);

  // Reset bảng phải và kết quả chỉ khi đổi connect
  useEffect(() => {
    setTargetKeys([]);
    setUpdateResult(null);
  }, [selectedId]);

  // Fetch domains khi đổi connect hoặc limit
  useEffect(() => {
    if (!selectedId) return;
    console.log('Giá trị search (useEffect):', leftSearch);
    const fetchDomains = async () => {
      setLoadingDomain(true);
      try {
        const skip = (leftPage - 1) * leftPageSize;
        const params: any = { take: leftPageSize, skip, orderBy: "name" };
        if (leftSearch) params.search = leftSearch;
        console.log('Gọi API với params:', params);
        const res = await callFetchSpaceshipDomains(selectedId, params);
        let items = (res?.items || []).map((item: any) => ({
          key: String(item.name),
          name: item.name,
          nameservers: item.nameservers,
          expirationDate: item.expirationDate,
        }));
        // Merge thêm các domain đã chọn (targetKeys) mà chưa có trong items
        const selectedDomains = targetKeys
          .filter(key => !items.some((item: DataType) => item.key === key))
          .map(key => ({ key, name: key }));
        setDomains([...items, ...selectedDomains]);
        setLeftTotal(res?.total || 0);
      } finally {
        setLoadingDomain(false);
      }
    };
    fetchDomains();
  }, [selectedId, leftPage, leftPageSize, leftSearch]);

  // Debounce search 500ms
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setLeftSearch(leftSearchInput);
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [leftSearchInput]);

  const handleUpdate = async () => {
    if (!selectedId || !ns1 || !ns2 || targetKeys.length === 0) return;
    setUpdating(true);
    setUpdateResult(null);
    try {
      const res = await callUpdateSpaceshipNameservers({
        conect_id: selectedId,
        provider: "custom",
        domain: targetKeys,
        hosts: [ns1, ns2],
      });
      const resultArr = res || [];
      setUpdateResult(resultArr);
      // Loại domain thành công khỏi bảng phải
      const failedDomains = resultArr.filter((item: any) => !item.success).map((item: any) => String(item.domain));
      const successDomains = resultArr.filter((item: any) => item.success).map((item: any) => String(item.domain));
      if (successDomains.length > 0) {
        setTargetKeys(targetKeys.filter((key) => !successDomains.includes(String(key))));
      }
      if (failedDomains.length > 0) {
        message.warning(`Có ${failedDomains.length} domain chưa được cập nhật, vui lòng thử lại.`);
      } else {
        message.success("Đã gửi yêu cầu cập nhật nameserver!");
      }
    } catch (err: any) {
      message.error("Cập nhật nameserver thất bại!");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      <h1>Name Server</h1>
      <Flex
        gap={8}
        align="center"
        style={{ marginBottom: 16, justifyContent: isMobile ? 'flex-start' : 'space-between', flexDirection: isMobile ? 'column' : 'row', width: isMobile ? '100%' : 'auto', alignItems: 'normal' }}
      >
        <Spin spinning={loadingConnect}>
          <Select
            showSearch
            style={{ width: isMobile ? '100%' : 220, marginBottom: isMobile ? 8 : 0 }}
            placeholder="Chọn connect"
            value={selectedId}
            onChange={setSelectedId}
            onSearch={setConnectSearch}
            filterOption={false}
            options={connects.map((item) => ({ label: item.name, value: item._id }))}
            allowClear
          />
        </Spin>
        <Flex gap={8} align="center">
          <Input
            placeholder="ns1..."
            value={ns1}
            onChange={e => setNs1(e.target.value)}
            style={{ width: isMobile ? '100%' : 200, marginBottom: isMobile ? 8 : 0 }}
          />
          <Input
            placeholder="ns2..."
            value={ns2}
            onChange={e => setNs2(e.target.value)}
            style={{ width: isMobile ? '100%' : 200, marginBottom: isMobile ? 8 : 0 }}
          />
          <Button
            type="primary"
            loading={updating}
            disabled={!selectedId || !ns1 || !ns2 || targetKeys.length === 0}
            onClick={handleUpdate}
            style={{ width: isMobile ? '100%' : undefined }}
          >
            Cập nhật
          </Button>
        </Flex>
      </Flex>
      {updateResult && (
        <div style={{ marginBottom: 16 }}>
          {(() => {
            const total = updateResult.length;
            const successCount = updateResult.filter(item => item.success).length;
            const failed = updateResult.filter(item => !item.success);
            if (failed.length === 0) {
              return (
                <Alert
                  type="success"
                  showIcon
                  message={`Cập nhật thành công ${successCount}/${total}`}
                  style={{ marginBottom: 8 }}
                />
              );
            }
            return failed.map((item, idx) => (
              <Alert
                key={idx}
                type="error"
                showIcon
                message={`Cập nhật thất bại ${item.domain} vui lòng thử lại`}
                style={{ marginBottom: 8 }}
              />
            ));
          })()}
        </div>
      )}
      <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>
        Giới hạn cập nhật nameserver cho mỗi domain là 5 lần trong 5 phút.
      </div>
      <Spin spinning={loadingDomain}>
        <Flex align="start" gap="middle" vertical>
          <TableTransfer
            dataSource={domains}
            targetKeys={targetKeys}
            showSearch
            showSelectAll={false}
            onChange={(keys) => setTargetKeys(keys.map(String))}
            filterOption={filterOption}
            leftColumns={columns}
            rightColumns={columns}
            leftPage={leftPage}
            setLeftPage={setLeftPage}
            leftPageSize={leftPageSize}
            setLeftPageSize={setLeftPageSize}
            leftTotal={leftTotal}
            rightPage={rightPage}
            setRightPage={setRightPage}
            rightPageSize={rightPageSize}
            setRightPageSize={setRightPageSize}
            rightSearch={rightSearch}
            onSearch={(direction, value) => {
              if (direction === 'left') {
                setLeftSearchInput(value);
                console.log('Transfer onSearch left (debounce input):', value);
              }
              if (direction === 'right') {
                setRightSearch(value);
                console.log('Transfer onSearch right:', value);
              }
            }}
          />
        </Flex>
      </Spin>
      {/* Drawer chi tiết domain */}
      <Drawer
        title={detailData?.name || "Chi tiết domain"}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        width={500}
        destroyOnClose
      >
        {detailLoading ? <Spin /> : detailData && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Tên domain">{detailData.name}</Descriptions.Item>
            <Descriptions.Item label="Ngày đăng ký">{detailData.registrationDate ? dayjs(detailData.registrationDate).format('DD/MM/YYYY') : ''}</Descriptions.Item>
            <Descriptions.Item label="Ngày hết hạn">{detailData.expirationDate ? dayjs(detailData.expirationDate).format('DD/MM/YYYY') : ''}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">{detailData.lifecycleStatus}</Descriptions.Item>
            <Descriptions.Item label="Nameserver">
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
                {detailData.nameservers?.hosts?.map((h: string, i: number) => <li key={i}>{h}</li>)}
              </ul>
            </Descriptions.Item>
            <Descriptions.Item label="Verification">{detailData.verificationStatus}</Descriptions.Item>
            <Descriptions.Item label="Premium">{detailData.isPremium ? 'Có' : 'Không'}</Descriptions.Item>
            <Descriptions.Item label="Auto Renew">{detailData.autoRenew ? 'Có' : 'Không'}</Descriptions.Item>
            <Descriptions.Item label="Provider">{detailData.nameservers?.provider}</Descriptions.Item>
            {/* Thêm các trường khác nếu muốn */}
          </Descriptions>
        )}
      </Drawer>
    </div>
  );
};

export default NameServer; 