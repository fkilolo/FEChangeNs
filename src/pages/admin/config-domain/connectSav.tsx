import DataTable from "@/components/client/data-table";
import { useAppDispatch } from "@/redux/hooks";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, Popconfirm, Space, Tag, message, notification } from "antd";
import { useState, useRef } from "react";
import queryString from "query-string";
import Access from "@/components/share/access";
import { ALL_PERMISSIONS } from "@/config/data/permissions";
import { fetchConnectSav } from "@/redux/slice/business/sav/connectSavSlide";
import { callDeleteConnectSav } from "@/config/api/business/connectSav.api";
import ModalConnectSav from "@/components/admin/business/sav/modal.connectSav";

interface IConnectSav {
    _id?: string;
    name?: string;
    apikey?: string;
    userName?: string;
    total_domain?: number;
    createdAt?: string;
    updatedAt?: string;
}

const ConnectSavPage = () => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
    const [dataInit, setDataInit] = useState<IConnectSav | null>(null);
    const tableRef = useRef<ActionType>();

    const handleDelete = async (_id?: string) => {
        if (_id) {
            const res: any = await callDeleteConnectSav(_id);
            if (res) {
                message.success("Xóa kết nối thành công");
                tableRef.current?.reload();
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res?.message || "Không thể xóa kết nối",
                });
            }
        }
    };

    const handleEdit = (record: IConnectSav) => {
        setDataInit(record);
        setOpenModal(true);
    };

    const buildQuery = (params: any, sort: any) => {
        const clone = { ...params };
        if (clone.name) clone.name = `/${clone.name}/i`;
        if (clone.userName) clone.userName = `/${clone.userName}/i`;

        let query = queryString.stringify(clone);
        let sortBy = "";

        if (sort?.name) sortBy = sort.name === "ascend" ? "sort=name" : "sort=-name";
        else if (sort?.userName) sortBy = sort.userName === "ascend" ? "sort=userName" : "sort=-userName";

        query += sortBy ? `&${sortBy}` : `&sort=-updatedAt`;

        return query;
    };

    const columns: ProColumns<IConnectSav>[] = [
        {
            title: "Tên kết nối",
            dataIndex: "name",
            render: (_, record) => (
                <a
                    onClick={() => {
                        setOpenViewDetail(true);
                        setDataInit(record);
                    }}
                >
                    {record?.name}
                </a>
            ),
            sorter: true,
        },
        {
            title: "API Key",
            dataIndex: "apikey",
            ellipsis: true,
        },
        {
            title: "Tài khoản",
            dataIndex: "userName",
            sorter: true,
        },
        {
            title: "Tổng domain",
            dataIndex: "total_domain",
        },
        {
            title: "Thao tác",
            hideInSearch: true,
            width: 50,
            render: (_, record) => (
                <Space>
                    <EditOutlined
                        style={{ fontSize: 20, color: "#ffa500" }}
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Xác nhận xóa kết nối"
                        description="Bạn có chắc chắn muốn xóa kết nối này?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                        placement="leftTop"
                    >
                        <span style={{ cursor: "pointer", marginLeft: 10 }}>
                            <DeleteOutlined style={{ fontSize: 20, color: "#ff4d4f" }} />
                        </span>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Access permission={ALL_PERMISSIONS.SAV.GET_PAGINATE}>
            <DataTable<IConnectSav>
                actionRef={tableRef}
                rowKey="_id"
                columns={columns}
                headerTitle="Danh sách Kết nối SAV"
                request={async (params, sort, filter) => {
                    const query = buildQuery(params, sort);
                    const res: any = await dispatch(fetchConnectSav({ query })).unwrap();
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
                toolBarRender={() => [
                    <Access permission={ALL_PERMISSIONS.SAV.CREATE} key="add">
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenModal(true)}>
                            Thêm mới
                        </Button>
                    </Access>,
                ]}
                scroll={{ x: true }}
            />

            {openModal && (
                <ModalConnectSav
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    dataInit={dataInit}
                    setDataInit={setDataInit}
                />
            )}

        </Access>
    );
};

export default ConnectSavPage;
