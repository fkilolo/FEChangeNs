import DataTable from "@/components/client/data-table";
import { useAppDispatch } from "@/redux/hooks";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, message, notification } from "antd";
import { useState, useRef } from 'react';
import queryString from 'query-string';
import { fetchPermission } from "@/redux/slice/business/auth/permissionSlide";
import ViewDetailPermission from "@/components/admin/business/permission/view.permission";
import ModalPermission from "@/components/admin/business/permission/modal.permission";
import { colorMethod } from "@/config/utils";
import Access from "@/components/share/access";
import { ALL_MODULES, ALL_PERMISSIONS } from "@/config/data/permissions";
import { callDeletePermission } from "@/config/api/business/permission.api";
import { ALL_METHOD } from "@/config/data/method";
import { IPermission } from "@/types/model/permissionModel/permission.d";

const PermissionPage = () => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [dataInit, setDataInit] = useState<IPermission | null>(null);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const tableRef = useRef<ActionType>();

    const handleDeletePermission = async (_id: string | undefined) => {
        if (_id) {
            const res = await callDeletePermission(_id);
            if (res && res.data) {
                message.success('Xóa Permission thành công');
                tableRef.current?.reload();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    };

    const columns: ProColumns<IPermission>[] = [
        {
            title: 'Tên',
            dataIndex: 'name',
            render: (_, record) => (
                <a onClick={() => {
                    setOpenViewDetail(true);
                    setDataInit(record);
                }}>{record.name}</a>
            ),
            sorter: true,
            fieldProps: {
                placeholder: 'Nhập tên quyền',
            },
        },
        {
            title: 'API',
            dataIndex: 'apiPath',
            sorter: true,
            fieldProps: {
                placeholder: 'Nhập đường dẫn API',
            },
        },
        {
            title: 'Method',
            dataIndex: 'method',
            valueType: 'select',
            valueEnum: ALL_METHOD,
            sorter: true,
            render: (_, record) => (
                <p style={{ fontWeight: 'bold', color: colorMethod(record.method) }}>{record.method}</p>
            ),
        },
        {
            title: 'Module',
            dataIndex: 'module',
            valueType: 'select',
            valueEnum: ALL_MODULES,
            sorter: true,
        },
        {
            title: 'Thao tác',
            hideInSearch: true,
            render: (_, record) => (
                <Space>
                    <Access permission={ALL_PERMISSIONS.PERMISSIONS.UPDATE}>
                        <EditOutlined
                            style={{ fontSize: 20, color: '#ffa500' }}
                            onClick={() => {
                                setOpenModal(true);
                                setDataInit(record);
                            }}
                        />
                    </Access>
                    <Access permission={ALL_PERMISSIONS.PERMISSIONS.DELETE}>
                        <Popconfirm
                            title="Xác nhận xóa permission"
                            description="Bạn có chắc chắn muốn xóa permission này ?"
                            onConfirm={() => handleDeletePermission(record._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <DeleteOutlined
                                style={{ fontSize: 20, color: '#ff4d4f', cursor: 'pointer' }}
                            />
                        </Popconfirm>
                    </Access>
                </Space>
            ),
        },
    ];

    const buildQuery = (params: any, sort: any) => {
        const filters = { ...params };
        ['name', 'apiPath', 'method', 'module'].forEach(key => {
            if (filters[key]) filters[key] = `/${filters[key]}/i`;
        });
        let query = queryString.stringify(filters);

        const sortKey = Object.keys(sort)[0];
        if (sortKey) {
            const order = sort[sortKey] === 'ascend' ? `sort=${sortKey}` : `sort=-${sortKey}`;
            query += `&${order}`;
        } else {
            query += '&sort=-updatedAt';
        }

        return query;
    };

    return (
        <Access permission={ALL_PERMISSIONS.PERMISSIONS.GET_PAGINATE}>
            <DataTable<IPermission>
                actionRef={tableRef}
                rowKey="_id"
                columns={columns}
                headerTitle="Danh sách Permissions (Quyền truy cập)"
                scroll={{ x: true }}
                rowSelection={false}
                request={async (params, sort): Promise<any> => {
                    const query = buildQuery(params, sort);
                    const res = await dispatch(fetchPermission({ query })).unwrap();
                    return {
                        data: res.result || [],
                        success: true,
                        total: res.meta?.total || 0,
                    };
                }}
                pagination={{
                    showSizeChanger: true,
                    showTotal: (total, range) => <div>{range[0]}-{range[1]} trên {total} dòng</div>,
                }}
                toolBarRender={() => (
                    <Access permission={ALL_PERMISSIONS.PERMISSIONS.CREATE}>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenModal(true)}>
                            Thêm mới
                        </Button>
                    </Access>
                )}
                search={{
                    labelWidth: 'auto',
                    span: 8,
                }}
                form={{
                    layout: 'horizontal',
                    labelCol: { span: 4 },
                    wrapperCol: { span: 24 },
                    colon: false,
                }}
            />

            {openModal && (
                <ModalPermission
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    reloadTable={() => tableRef.current?.reload()}
                    dataInit={dataInit}
                    setDataInit={setDataInit}
                />
            )}

            <ViewDetailPermission
                open={openViewDetail}
                onClose={setOpenViewDetail}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
        </Access>
    );
};

export default PermissionPage;
