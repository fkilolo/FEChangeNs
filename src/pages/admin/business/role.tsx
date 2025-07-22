import DataTable from "@/components/client/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Tag, message, notification } from "antd";
import { useState, useRef } from 'react';
import dayjs from 'dayjs';
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

    const isFetching = useAppSelector(state => state.role.isFetching);
    const meta = useAppSelector(state => state.role.meta);
    const roles = useAppSelector(state => state.role.result);

    const handleDeleteRole = async (_id: string | undefined) => {
        if (_id) {
            const res = await callDeleteRole(_id);
            if (res && res.data) {
                message.success('Xóa Role thành công');
                reloadTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    }

    const reloadTable = () => {
        tableRef?.current?.reload();
    }

    const columns: ProColumns<IRole>[] = [
        {
            title: 'Tên',
            dataIndex: 'name',
            sorter: true,
            fieldProps: {
                placeholder: 'Nhập dữ liệu',
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            render(dom, entity, index, action, schema) {
                return <>
                    <Tag color={entity.isActive ? "lime" : "red"} >
                        {entity.isActive ? "ACTIVE" : "INACTIVE"}
                    </Tag>
                </>
            },
            hideInSearch: true,
        },
        // {
        //     title: 'Ngày tạo',
        //     dataIndex: 'createdAt',
        //     width: 200,
        //     sorter: true,
        //     render: (text, record, index, action) => {
        //         return (
        //             <>{dayjs(record.createdAt).format('DD-MM-YYYY HH:mm:ss')}</>
        //         )
        //     },
        //     hideInSearch: true,
        // },
        // {
        //     title: 'Ngày sửa',
        //     dataIndex: 'updatedAt',
        //     width: 200,
        //     sorter: true,
        //     render: (text, record, index, action) => {
        //         return (
        //             <>{dayjs(record.updatedAt).format('DD-MM-YYYY HH:mm:ss')}</>
        //         )
        //     },
        //     hideInSearch: true,
        // },
        {

            title: 'Thao tác',
            hideInSearch: true,
            width: 50,
            render: (_value, entity, _index, _action) => (
                <Space>
                    <Access
                        permission={ALL_PERMISSIONS.ROLES.UPDATE}
                        hideChildren
                    >
                        <EditOutlined
                            style={{
                                fontSize: 20,
                                color: '#ffa500',
                            }}
                            type=""
                            onClick={() => {
                                dispatch(fetchRoleById((entity._id) as string))
                                setOpenModal(true);
                            }}
                        />
                    </Access>
                    <Access
                        permission={ALL_PERMISSIONS.ROLES.DELETE}
                        hideChildren
                    >
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa role"}
                            description={"Bạn có chắc chắn muốn xóa role này ?"}
                            onConfirm={() => handleDeleteRole(entity._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin: "0 10px" }}>
                                <DeleteOutlined
                                    style={{
                                        fontSize: 20,
                                        color: '#ff4d4f',
                                    }}
                                />
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
        if (sort && sort.name) {
            sortBy = sort.name === 'ascend' ? "sort=name" : "sort=-name";
        }
        if (sort && sort.createdAt) {
            sortBy = sort.createdAt === 'ascend' ? "sort=createdAt" : "sort=-createdAt";
        }
        if (sort && sort.updatedAt) {
            sortBy = sort.updatedAt === 'ascend' ? "sort=updatedAt" : "sort=-updatedAt";
        }

        //mặc định sort theo updatedAt
        if (Object.keys(sortBy).length === 0) {
            temp = `${temp}&sort=-updatedAt`;
        } else {
            temp = `${temp}&${sortBy}`;
        }

        return temp;
    }

    return (
        <div>
            <Access
                permission={ALL_PERMISSIONS.ROLES.GET_PAGINATE}
            >
                <DataTable<IRole>
                    actionRef={tableRef}
                    headerTitle="Danh sách Roles (Quyền Hạn)"
                    rowKey="_id"
                    loading={isFetching}
                    columns={columns}
                    dataSource={roles}
                    request={async (params, sort, filter): Promise<any> => {
                        const query = buildQuery(params, sort, filter);
                        dispatch(fetchRole({ query }))
                    }}
                    scroll={{ x: true }}
                    pagination={
                        {
                            current: meta.current,
                            pageSize: meta.pageSize,
                            showSizeChanger: true,
                            total: meta.total,
                            showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                        }
                    }
                    rowSelection={false}
                    toolBarRender={(_action, _rows): any => {
                        return (
                            <Access
                                permission={ALL_PERMISSIONS.ROLES.CREATE}
                                hideChildren
                            >
                                <Button
                                    icon={<PlusOutlined />}
                                    type="primary"
                                    onClick={() => setOpenModal(true)}
                                >
                                    Thêm mới
                                </Button>
                            </Access>
                        );
                    }}
                    search={{
                        labelWidth: 'auto',
                    }}
                    form={{
                        layout: 'horizontal', // Layout ngang cho label và input
                        colon: false, // Bỏ dấu ":" ở cuối label
                    }}
                />
            </Access>
            {
                openModal &&
                <ModalRole
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    reloadTable={reloadTable}
                />
            }
        </div>
    )
}

export default RolePage;