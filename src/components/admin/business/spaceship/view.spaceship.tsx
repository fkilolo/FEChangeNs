import DataTable from "@/components/client/data-table";
import { useAppDispatch } from "@/redux/hooks";
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button } from "antd";
import { useRef } from 'react';
import queryString from 'query-string';
import { fetchSpaceshipList } from "@/redux/slice/business/spaceshipSlide";
import dayjs from "dayjs";
import ModalSpaceship from "./modal.spaceship";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import { callDeleteSpaceship } from "@/config/api/business/spaceship.api";

const ViewSpaceship = () => {
  const dispatch = useAppDispatch();
  const tableRef = useRef<ActionType>();
  const [openModal, setOpenModal] = useState(false);
  const [dataInit, setDataInit] = useState<any>(null);

  const columns: ProColumns<any>[] = [
    {
      title: 'Tên',
      dataIndex: 'name',
      sorter: false,
      fieldProps: { placeholder: 'Nhập dữ liệu' },
    },
    {
      title: 'Người tạo',
      dataIndex: 'userName',
      hideInSearch: true,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      hideInSearch: true,
      render: (_, entity) => entity.createdAt ? dayjs(entity.createdAt).format("DD/MM/YYYY HH:mm") : ""
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      hideInSearch: true,
      render: (_, entity) => entity.updatedAt ? dayjs(entity.updatedAt).format("DD/MM/YYYY HH:mm") : ""
    },
    {
      title: 'Thao tác',
      hideInSearch: true,
      width: 80,
      render: (_, entity) => (
        <>
          <EditOutlined
            style={{ fontSize: 18, color: '#ffa500', marginRight: 16, cursor: 'pointer' }}
            onClick={() => {
              setDataInit(entity);
              setOpenModal(true);
            }}
          />
          <Popconfirm
            placement="leftTop"
            title="Xác nhận xóa"
            description="Bạn có chắc chắn muốn xóa spaceship này?"
            onConfirm={async () => {
              const res = await callDeleteSpaceship(entity._id);
              if (res) {
                message.success("Xóa spaceship thành công");
                // Lấy lại tổng số item và pageSize từ actionRef
                const table: any = tableRef.current;
                const pageInfo = table?.pageInfo || {};
                const total = (pageInfo as any).total || 0;
                const pageSize = (pageInfo as any).pageSize || 10;
                const current = (pageInfo as any).current || 1;
                const totalAfterDelete = total - 1;
                const lastPage = Math.ceil(totalAfterDelete / pageSize) || 1;
                if (current > lastPage) {
                  tableRef.current?.reload?.(); // reload về trang 1
                } else {
                  tableRef.current?.reload();
                }
              }
            }}
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <span style={{ cursor: "pointer" }}>
              <DeleteOutlined style={{ fontSize: 18, color: '#ff4d4f' }} />
            </span>
          </Popconfirm>
        </>
      ),
    },
  ];

  const buildQuery = (params: any, sort: any, filter: any) => {
    const clone = { ...params };
    if (clone.name) clone.name = `/${clone.name}/i`;
    let temp = queryString.stringify(clone);
    let sortBy = "";
    if (sort?.name) sortBy = sort.name === 'ascend' ? "sort=name" : "sort=-name";
    if (sort?.createdAt) sortBy = sort.createdAt === 'ascend' ? "sort=createdAt" : "sort=-createdAt";
    if (sort?.updatedAt) sortBy = sort.updatedAt === 'ascend' ? "sort=updatedAt" : "sort=-updatedAt";
    temp += sortBy ? `&${sortBy}` : `&sort=-updatedAt`;
    return temp;
  };

  return (
    <>
      <DataTable
        actionRef={tableRef}
        headerTitle="Danh sách Spaceship"
        rowKey="_id"
        columns={columns}
        request={async (params, sort, filter) => {
          const query = buildQuery(params, sort, filter);
          const res = await dispatch(fetchSpaceshipList(query)).unwrap();
          const currentPage = params.current || 1;
          if ((res?.result?.length === 0) && (currentPage > 1)) {
            // Nếu trang hiện tại rỗng và lớn hơn 1, tự động load lại trang trước
            const prevParams = { ...params, current: currentPage - 1 };
            const prevQuery = buildQuery(prevParams, sort, filter);
            const prevRes = await dispatch(fetchSpaceshipList(prevQuery)).unwrap();
            return {
              data: prevRes?.result || [],
              success: true,
              total: prevRes?.meta?.total || 0,
            };
          }
          return {
            data: res?.result || [],
            success: true,
            total: res?.meta?.total || 0,
          };
        }}
        scroll={{ x: true }}
        pagination={{
          showSizeChanger: true,
          showTotal: (total: number, range: [number, number]) => (
            <div>{range[0]}-{range[1]} trên {total} dòng</div>
          ),
        }}
        rowSelection={false}
        toolBarRender={() => [
          <Button type="primary" key="add" onClick={() => setOpenModal(true)}>Thêm mới</Button>
        ]}
        search={{ labelWidth: 'auto' }}
        form={{
          layout: 'horizontal',
          colon: false,
        }}
      />
      <ModalSpaceship
        openModal={openModal}
        setOpenModal={(v) => {
          setOpenModal(v);
          if (!v) setDataInit(null);
        }}
        reloadTable={() => tableRef.current?.reload()}
        dataInit={dataInit}
      />
    </>
  );
};

export default ViewSpaceship; 