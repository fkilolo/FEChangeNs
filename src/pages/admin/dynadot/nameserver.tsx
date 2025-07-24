import React, { useEffect, useState, useRef } from "react";
import { Select, Spin, Input, Button, message, Alert, Flex, Transfer, Table, Pagination, Drawer, Descriptions } from "antd";
import { callFetchDynadotList, callFetchDynadotDomains, callUpdateDynadotNameservers, callFetchDynadotDomainDetail } from "@/config/api/business/dynadot.api";
import type { GetProp, TableColumnsType, TableProps, TransferProps } from 'antd';
import dayjs from "dayjs";
import { EyeOutlined } from "@ant-design/icons";

type TransferItem = GetProp<TransferProps, 'dataSource'>[number];
type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

interface DataType {
  key: string;
  name: string;
  nameservers?: { name_servers: { server_name: string }[] };
  expirationDate?: number;
}

interface TableTransferProps extends TransferProps {
  leftColumns: TableColumnsType<TransferItem>;
  rightColumns: TableColumnsType<TransferItem>;
}

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

  const rightData = (dataSource || []).filter(item => (targetKeys || []).includes(item.key));
  const rightDataFiltered = rightData.filter(item =>
    !rightSearch || item.name.toLowerCase().includes(rightSearch.toLowerCase())
  );
  const rightTotal = rightDataFiltered.length;
  const rightDataPaged = rightDataFiltered.slice((rightPage - 1) * rightPageSize, rightPage * rightPageSize);

  const leftData = (dataSource || []).filter(item => !(targetKeys || []).includes(item.key));

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
              pageSizeOptions={["10", "20", "30", "50", "100"]}
              onChange={(page, pageSize) => {
                setRightPage(page);
                setRightPageSize(pageSize || 10);
              }}
            />
          </>;
        }
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
              pageSizeOptions: ["10", "20", "30", "50", "100"],
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
          />
        );
      }}
    </Transfer>
  );
};

const NameServer = () => {
  const [connects, setConnects] = useState<any[]>([]);
  const [connectPage, setConnectPage] = useState(1);
  const [connectTotalPage, setConnectTotalPage] = useState(1);
  const [loadingConnect, setLoadingConnect] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [domains, setDomains] = useState<DataType[]>([]);
  const [loadingDomain, setLoadingDomain] = useState(false);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [ns1, setNs1] = useState("");
  const [ns2, setNs2] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateResult, setUpdateResult] = useState<any[] | null>(null);
  const [leftPage, setLeftPage] = useState(1);
  const [leftPageSize, setLeftPageSize] = useState(10);
  const [leftTotal, setLeftTotal] = useState(0);
  const [leftSearchInput, setLeftSearchInput] = useState("");
  const [leftSearch, setLeftSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [rightPage, setRightPage] = useState(1);
  const [rightPageSize, setRightPageSize] = useState(10);
  const [rightSearch, setRightSearch] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);
  const [connectSearch, setConnectSearch] = useState("");

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleShowDetail = (record: DataType) => {
    console.log('Xem chi tiết domain:', record);
    setDetailOpen(true);
    setDetailLoading(true);
    callFetchDynadotDomainDetail(selectedId!, record.name)
      .then(res => {
        console.log('Kết quả API detail:', res);
        setDetailData(res?.data?.domainInfo?.[0] || null);
      })
      .finally(() => setDetailLoading(false));
  };

  const fetchConnects = async (page = 1, search = "") => {
    setLoadingConnect(true);
    try {
      const params = `current=${page}&pageSize=10${search ? `&search=${encodeURIComponent(search)}` : ""}`;
      const res = await callFetchDynadotList(params);
      if (page === 1) {
        setConnects(res?.result || []);
      } else {
        setConnects(prev => [...prev, ...(res?.result || [])]);
      }
      setConnectPage(res?.meta?.current || 1);
      setConnectTotalPage(res?.meta?.pages || 1);
    } finally {
      setLoadingConnect(false);
    }
  };

  useEffect(() => {
    fetchConnects(1, connectSearch);
  }, [connectSearch]);

  useEffect(() => {
    setTargetKeys([]);
    setUpdateResult(null);
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId) return;
    const fetchDomains = async () => {
      setLoadingDomain(true);
      try {
        const skip = (leftPage - 1) * leftPageSize;
        const params: any = { take: leftPageSize, skip, orderBy: "name" };
        if (leftSearch) params.search = leftSearch;
        const res = await callFetchDynadotDomains(selectedId, params);
        let items = (res?.data?.domainInfo || []).map((item: any) => ({
          key: String(item.domainName),
          name: item.domainName,
          nameservers: item.glueInfo?.name_server_settings,
          expirationDate: item.expiration,
        }));
        const selectedDomains = targetKeys
          .filter(key => !items.some((item: DataType) => item.key === key))
          .map(key => ({ key, name: key }));
        setDomains([...items, ...selectedDomains]);
        setLeftTotal(res?.data?.domainInfo?.length || 0);
      } finally {
        setLoadingDomain(false);
      }
    };
    fetchDomains();
  }, [selectedId, leftPage, leftPageSize, leftSearch]);

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
      const res = await callUpdateDynadotNameservers({
        conect_id: selectedId,
        domain: targetKeys,
        hosts: [ns1, ns2],
      });
      const resultArr = res || [];
      setUpdateResult(resultArr);
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

  const columns: TableColumnsType<DataType> = [
    {
      dataIndex: 'name',
      title: 'Tên domain',
    },
    {
      dataIndex: 'nameservers',
      title: 'Nameserver',
      render: (ns) => ns?.name_servers ? (
        <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
          {ns.name_servers.map((h: any, i: number) => <li key={i}>{h.server_name}</li>)}
        </ul>
      ) : '',
      responsive: ['md'],
    },
    {
      dataIndex: 'expirationDate',
      title: 'Ngày hết hạn',
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY') : '',
      responsive: ['md'],
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

  const filterOption = (input: string, item: DataType) =>
    item.name?.toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>
        Giới hạn cập nhật nameserver cho mỗi domain là 5 lần trong 5 phút.
      </div>
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
            onSearch={value => {
              setConnectSearch(value);
              setConnectPage(1);
            }}
            filterOption={false}
            options={connects.map((item) => ({ label: item.name, value: item._id }))}
            allowClear
            onPopupScroll={e => {
              const target = e.target as HTMLElement;
              if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 10) {
                if (connectPage < connectTotalPage && !loadingConnect) {
                  fetchConnects(connectPage + 1, connectSearch);
                }
              }
            }}
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
            const successDomains = updateResult.filter((item: any) => item.success);
            const failedDomains = updateResult.filter((item: any) => !item.success);
            
            return (
              <>
                {successDomains.length > 0 && (
                  <Alert
                    type="success"
                    showIcon
                    message={`Cập nhật thành công ${successDomains.length}/${updateResult.length} domain`}
                    style={{ marginBottom: 8 }}
                  />
                )}
                {failedDomains.map((item, idx) => (
                  <Alert
                    key={idx}
                    type="error"
                    showIcon
                    message={`Cập nhật thất bại ${item.domain} vui lòng thử lại`}
                    style={{ marginBottom: 8 }}
                  />
                ))}
              </>
            );
          })()}
        </div>
      )}
      <Spin spinning={loadingDomain}>
        <Flex align="start" gap="middle" vertical>
          <TableTransfer
            dataSource={domains}
            targetKeys={targetKeys}
            showSearch
            showSelectAll={false}
            onChange={(keys) => setTargetKeys(keys.map(key => String(key)))}
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
              }
              if (direction === 'right') {
                setRightSearch(value);
              }
            }}
          />
        </Flex>
      </Spin>
      <Drawer
        title={detailData?.domainName || "Chi tiết domain"}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        width={500}
        destroyOnClose
      >
        {detailLoading ? <Spin /> : detailData && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Tên domain">{detailData.domainName}</Descriptions.Item>
            <Descriptions.Item label="Ngày đăng ký">{detailData.registration ? dayjs(detailData.registration).format('DD/MM/YYYY') : ''}</Descriptions.Item>
            <Descriptions.Item label="Ngày hết hạn">{detailData.expiration ? dayjs(detailData.expiration).format('DD/MM/YYYY') : ''}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">{detailData.status}</Descriptions.Item>
            <Descriptions.Item label="Nameserver">
              <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
                {detailData.glueInfo?.name_server_settings?.name_servers?.map((h: any, i: number) => <li key={i}>{h.server_name}</li>)}
              </ul>
            </Descriptions.Item>
            <Descriptions.Item label="Privacy">{detailData.privacy}</Descriptions.Item>
            <Descriptions.Item label="Locked">{detailData.locked}</Descriptions.Item>
            <Descriptions.Item label="Disabled">{detailData.disabled}</Descriptions.Item>
            <Descriptions.Item label="Renew Option">{detailData.renew_option}</Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </div>
  );
};

export default NameServer; 