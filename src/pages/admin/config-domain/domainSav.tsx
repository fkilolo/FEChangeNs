import DataTable from "@/components/client/data-table";
import { useAppDispatch } from "@/redux/hooks";
import { EditOutlined, SyncOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, Space, message, notification } from "antd";
import { useState, useRef } from "react";
import queryString from "query-string";
import Access from "@/components/share/access";
import { ALL_PERMISSIONS } from "@/config/data/permissions";
import { fetchDomainSav } from "@/redux/slice/business/sav/domainSavSlide";
import {
  callUpdateAllDomainSav,
  callUpdateDomainSav,
} from "@/config/api/business/domainSav.api";
import { IDomainSav } from "@/types/model/savModel/domainSav.d";
import ModalDomainSav from "@/components/admin/business/sav/modal.domainSav";

const DomainSavPage = () => {
  const dispatch = useAppDispatch();
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isUpdateAll, setIsUpdateAll] = useState(false);
  const [dataInit, setDataInit] = useState<IDomainSav | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<IDomainSav[]>([]);
  const tableRef = useRef<ActionType>();

  const openUpdateModal = (record?: IDomainSav) => {
    setIsUpdateAll(!record);
    setDataInit(record || null);
    setOpenModal(true);
  };

  const handleSubmit = async (values: Partial<any>) => {
    try {
      setLoadingUpdate(true);
      if (isUpdateAll) {
        const domainList = selectedRows.map((item) => item.domain_name);
        await callUpdateAllDomainSav("", {
          ns_1: values.ns_1,
          ns_2: values.ns_2,
          domainList: (domainList || []).filter((d): d is string => typeof d === "string"),
        });
        message.success("Cập nhật các domain đã chọn thành công");
      } else if (dataInit?._id) {
        await callUpdateDomainSav(dataInit._id, values);
        message.success("Cập nhật domain thành công");
      }
      tableRef.current?.reload();
      setOpenModal(false);
      setSelectedRowKeys([]);
      setSelectedRows([]);
    } catch (error) {
      notification.error({
        message: "Lỗi cập nhật",
        description: (error as any)?.response?.data?.message || "Có lỗi xảy ra",
      });
    } finally {
      setLoadingUpdate(false);
    }
  };

  const buildQuery = (params: any, sort: any) => {
    const clone = { ...params };
    if (clone.domain_name) clone.domain_name = `/${clone.domain_name}/i`;

    let query = queryString.stringify(clone);
    let sortBy = "";

    if (sort?.domain_name)
      sortBy = sort.domain_name === "ascend" ? "sort=domain_name" : "sort=-domain_name";

    query += sortBy ? `&${sortBy}` : `&sort=-updatedAt`;

    return query;
  };

  const columns: ProColumns<IDomainSav>[] = [
    {
      title: "Domain",
      dataIndex: "domain_name",
      sorter: true,
    },
    {
      title: "NS1",
      dataIndex: "ns_1",
      ellipsis: true,
    },
    {
      title: "NS2",
      dataIndex: "ns_2",
      ellipsis: true,
    },
    {
      title: "Thao tác",
      hideInSearch: true,
      width: 100,
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => openUpdateModal(record)}
          >
            Sửa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Access permission={ALL_PERMISSIONS.SAV.GET_PAGINATE}>
      <DataTable<IDomainSav>
        actionRef={tableRef}
        rowKey="_id"
        columns={columns}
        headerTitle="Danh sách Domain SAV"
        request={async (params, sort) => {
          const query = buildQuery(params, sort);
          const res: any = await dispatch(fetchDomainSav({ query })).unwrap();
          return {
            data: res?.result || [],
            success: true,
            total: res?.meta?.total || 0,
          };
        }}
        pagination={{
          showSizeChanger: true,
          showTotal: (total, range) => (
            <div>
              {range[0]}-{range[1]} trên {total} dòng
            </div>
          ),
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys, rows) => {
            setSelectedRowKeys(keys);
            setSelectedRows(rows);
          },
        }}
        toolBarRender={() => [
          <Access permission={ALL_PERMISSIONS.SAV.UPDATE} key="updateAll">
            <Button
              type="primary"
              icon={<SyncOutlined />}
              disabled={selectedRowKeys.length === 0}
              onClick={() => openUpdateModal()}
              loading={loadingUpdate}
            >
              Cập nhật tất cả ({selectedRowKeys.length})
            </Button>
          </Access>,
        ]}
        scroll={{ x: true }}
      />

      <ModalDomainSav
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        loading={loadingUpdate}
        isUpdateAll={isUpdateAll}
        dataInit={dataInit}
      />
    </Access>
  );
};

export default DomainSavPage;
