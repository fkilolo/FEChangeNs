import DataTable from "@/components/client/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUser } from "@/redux/slice/business/auth/userSlide";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Tag, message, notification } from "antd";
import { useState, useRef, useEffect } from 'react';
import queryString from 'query-string';
import ModalUser from "@/components/admin/business/user/modal.user";
import ViewDetailUser from "@/components/admin/business/user/view.user";
import Access from "@/components/share/access";
import { ALL_PERMISSIONS } from "@/config/data/permissions";
import { callDeleteUser } from "@/config/api/business/user.api";
import { ALL_POSITION } from "@/config/data/position";
import { ALL_USER_STATUS } from "@/config/data/user-status";
import { IUser } from "@/types/model/userModel/user.d";
import { fetchAllRole } from "@/redux/slice/business/roleSlide";
import { IRoleSelect } from "@/types/model/roleModel/roleSelect.d";

const UserPage = () => {
    const dispatch = useAppDispatch();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [dataInit, setDataInit] = useState<IUser | null>(null);
    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
    const tableRef = useRef<ActionType>();
    const [roleSelect, setRoleSelect] = useState<IRoleSelect>({});

    const isFetching = useAppSelector(state => state.user.isFetching);
    const meta = useAppSelector(state => state.user.meta);
    const users = useAppSelector(state => state.user.result);
    //team
    //role
    const roles = useAppSelector(state => state.role.optionRoles);

    const handleDeleteUser = async (_id: string | undefined) => {
        if (_id) {
            const res = await callDeleteUser(_id);
            if (res && res.data) {
                message.success('Xóa tài khoản thành công');
                // reloadTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    }

    const handleUser = (entity: IUser) => {
        setOpenModal(true);
        if (entity) {
            setDataInit(entity);
            if (entity.role) {
                setRoleSelect(
                    {
                        label: entity.role?.name,
                        value: entity.role?._id,
                        key: entity.role?._id,
                    }
                );
            }
         
        }
    }

    // const reloadTable = () => {
    //     tableRef?.current?.reload();
    // }

    useEffect(() => {
        dispatch(fetchAllRole());
    }, [])

    const columns: ProColumns<IUser>[] = [
        {
            title: 'Tên',
            dataIndex: 'userName',
            render: (text, record, index, action) => {
                return (
                    <a href="#" onClick={() => {
                        setOpenViewDetail(true);
                        setDataInit(record);
                    }}>
                        {record?.userName}
                    </a>
                )
            },
            sorter: true,
            fieldProps: {
                placeholder: 'Nhập dữ liệu',
            },
        },
        {
            title: 'Quyền hạn',
            dataIndex: 'role',
            fieldProps: {
                options: roles,
                showSearch: true,
            },
            valueType: 'treeSelect',
            render: (text, record, index, action) => {
                return (
                    <span>
                        {record?.role?.name}
                    </span>
                )
            },
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
            hideInSearch: true,
        },
        {
            title: 'Chức vụ',
            dataIndex: 'position',
            valueType: 'select',
            valueEnum: ALL_POSITION,
            render: (text, record, index, action) => {
                return (
                    <span>
                        {record?.position}
                    </span>
                )
            },
            sorter: true,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: ALL_USER_STATUS,
            render: (text, record, index, action) => {
                return (
                    record.status === 1 ?
                        <Tag color="green">Đang làm việc</Tag>
                        :
                        <Tag color="red">Nghỉ việc</Tag>
                )
            },
            sorter: true,
        },
        {
            title: 'Tên telegram',
            dataIndex: 'telegramName',
            sorter: true,
            hideInSearch: true,
        },
        {
            title: 'Telegram ',
            dataIndex: 'telegramId',
            sorter: true,
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
        //     title: 'Ngày cập nhật',
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
                    {/* <Access
                        permission={ALL_PERMISSIONS.USERS.UPDATE}
                        hideChildren
                    > */}
                        <EditOutlined
                            style={{
                                fontSize: 20,
                                color: '#ffa500',
                            }}
                            type=""
                            onClick={() => handleUser(entity)}
                        />
                    {/* </Access> */}

                    {/* <Access
                        permission={ALL_PERMISSIONS.USERS.DELETE}
                        hideChildren
                    > */}
                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa user"}
                            description={"Bạn có chắc chắn muốn xóa user này ?"}
                            onConfirm={() => handleDeleteUser(entity._id)}
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
                    {/* </Access> */}
                </Space>
            ),

        },
    ];

    const buildQuery = (params: any, sort: any, filter: any) => {
        const clone = { ...params };
        if (clone.userName) clone.userName = `/${clone.userName}/i`;
        if (clone.email) clone.email = `/${clone.email}/i`;

        let temp = queryString.stringify(clone);

        let sortBy = "";
        if (sort && sort.userName) {
            sortBy = sort.userName === 'ascend' ? "sort=userName" : "sort=-userName";
        }
        if (sort && sort.email) {
            sortBy = sort.email === 'ascend' ? "sort=email" : "sort=-email";
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
        temp += "&populate=role&fields=role._id,role.name";
        return temp;
    }

    return (
    
     <div>
            <Access
                permission={ALL_PERMISSIONS.USERS.GET_PAGINATE}
            >
                <DataTable<IUser>
                    actionRef={tableRef}
                    headerTitle="Danh sách Tài khoản"
                    rowKey="_id"
                    // loading={isFetching}
                    columns={columns}
                    dataSource={users}
                    request={async (params, sort, filter): Promise<any> => {
                        const query = buildQuery(params, sort, filter);
                        dispatch(fetchUser({ query }))
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
                                permission={ALL_PERMISSIONS.TEAMS.CREATE}
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
                    form={{
                        layout: 'horizontal', // Layout ngang cho label và input
                        labelCol: { span: 6 }, // Độ rộng label 6/24
                        wrapperCol: { span: 18 }, // Độ rộng input 18/24
                        colon: false, // Bỏ dấu ":" ở cuối label
                    }}
                />
            </Access>

            {
                openModal &&
                <ModalUser
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    // reloadTable={reloadTable}
                    dataInit={dataInit}
                    setDataInit={setDataInit}
                    roleSelect={roleSelect}
                    setRoleSelect={setRoleSelect}
                />
            }

            <ViewDetailUser
                onClose={setOpenViewDetail}
                open={openViewDetail}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
        </div> 
       

    )
}

export default UserPage;