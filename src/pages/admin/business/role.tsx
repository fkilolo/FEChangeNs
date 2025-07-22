import DataTable from "@/components/client/data-table";
import { useAppDispatch } from "@/redux/hooks";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Tag, message, notification } from "antd";
import { useState, useRef, useEffect } from 'react';
import queryString from 'query-string';
import { fetchRole, fetchRoleById } from "@/redux/slice/business/roleSlide";
import ModalRole from "@/components/admin/business/role/modal.role";
import { ALL_PERMISSIONS } from "@/config/data/permissions";
import Access from "@/components/share/access";
import { callDeleteRole } from "@/config/api/business/role.api";
import { IRole } from "@/types/model/roleModel/role.d";

const RolePage = () => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const tableRef = useRef<ActionType>();

    const handleDeleteRole = async (_id: string | undefined) => {
        if (_id) {
            const res = await callDeleteRole(_id);
            if (res && res.data) {
                message.success('Xóa Role thành công');
                tableRef?.current?.reload();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    };

    const columns: ProColumns<IRole>[] = [
        {
            title: 'Tên',
            dataIndex: 'name',
            sorter: true,
            fieldProps: { placeholder: 'Nhập dữ liệu' },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            hideInSearch: true,
            render: (_, entity) => (
                <Tag color={entity.isActive ? "lime" : "red"}>
                    {entity.isActive ? "ACTIVE" : "INACTIVE"}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            hideInSearch: true,
            width: 50,
            render: (_, entity) => (
                <Space>
                    <Access permission={ALL_PERMISSIONS.ROLES.UPDATE} hideChildren>
                        <EditOutlined
                            style={{ fontSize: 20, color: '#ffa500' }}
                            onClick={() => {
                                dispatch(fetchRoleById(entity._id as string));
                                setOpenModal(true);
                            }}
                        />
                    </Access>
                    <Access permission={ALL_PERMISSIONS.ROLES.DELETE} hideChildren>
                        <Popconfirm
                            placement="leftTop"
                            title="Xác nhận xóa role"
                            description="Bạn có chắc chắn muốn xóa role này?"
                            onConfirm={() => handleDeleteRole(entity._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin: "0 10px" }}>
                                <DeleteOutlined style={{ fontSize: 20, color: '#ff4d4f' }} />
                            </span>
                        </Popconfirm>
                    </Access>
                </Space>
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
        <div>
            <Access permission={ALL_PERMISSIONS.ROLES.GET_PAGINATE}>
                <DataTable<IRole>
                    actionRef={tableRef}
                    headerTitle="Danh sách Roles (Quyền Hạn)"
                    rowKey="_id"
                    columns={columns}
                    request={async (params, sort, filter) => {
                        const query = buildQuery(params, sort, filter);
                        const res: any = await dispatch(fetchRole({ query })).unwrap();
                        return {
                            data: res?.result || [],
                            success: true,
                            total: res?.meta?.total || 0,
                        };
                    }}
                    scroll={{ x: true }}
                    pagination={{
                        showSizeChanger: true,
                        showTotal: (total, range) => (
                            <div>{range[0]}-{range[1]} trên {total} dòng</div>
                        ),
                    }}
                    rowSelection={false}
                    toolBarRender={() => [
                        <Access permission={ALL_PERMISSIONS.ROLES.CREATE} hideChildren>
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={() => setOpenModal(true)}
                            >
                                Thêm mới
                            </Button>
                        </Access>
                    ]}
                    search={{ labelWidth: 'auto' }}
                    form={{
                        layout: 'horizontal',
                        colon: false,
                    }}
                />
            </Access>

            {openModal && (
                <ModalRole
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    reloadTable={() => tableRef.current?.reload()}
                />
            )}
        </div>
    );
};

export default RolePage;
