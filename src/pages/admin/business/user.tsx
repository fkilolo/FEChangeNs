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

    const roles = useAppSelector(state => state.role.optionRoles);

    const handleDeleteUser = async (_id: string | undefined) => {
        if (_id) {
            const res = await callDeleteUser(_id);
            if (res && res.data) {
                message.success('Xóa tài khoản thành công');
                tableRef.current?.reload();
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
                setRoleSelect({
                    label: entity.role?.name,
                    value: entity.role?._id,
                    key: entity.role?._id,
                });
            }
        }
    }

    useEffect(() => {
        dispatch(fetchAllRole());
    }, [dispatch]);

    const columns: ProColumns<IUser>[] = [
        {
            title: 'Tên',
            dataIndex: 'userName',
            render: (_, record) => (
                <a onClick={() => {
                    setOpenViewDetail(true);
                    setDataInit(record);
                }}>
                    {record?.userName}
                </a>
            ),
            sorter: true,
        },
        {
            title: 'Quyền hạn',
            dataIndex: 'role',
            valueType: 'treeSelect',
            fieldProps: {
                options: roles,
                showSearch: true,
            },
            render: (_, record) => <span>{record?.role?.name}</span>,
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
        },
        {
            title: 'Chức vụ',
            dataIndex: 'position',
            valueType: 'select',
            valueEnum: ALL_POSITION,
            render: (_, record) => <span>{record?.position}</span>,
            sorter: true,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: ALL_USER_STATUS,
            render: (_, record) =>
                record.status === 1
                    ? <Tag color="green">Đang làm việc</Tag>
                    : <Tag color="red">Nghỉ việc</Tag>,
            sorter: true,
        },
        {
            title: 'Tên telegram',
            dataIndex: 'telegramName',
            sorter: true,
        },
        {
            title: 'Telegram',
            dataIndex: 'telegramId',
            sorter: true,
        },
        {
            title: 'Thao tác',
            hideInSearch: true,
            width: 50,
            render: (_, entity) => (
                <Space>
                    <EditOutlined
                        style={{ fontSize: 20, color: '#ffa500' }}
                        onClick={() => handleUser(entity)}
                    />
                    <Popconfirm
                        placement="leftTop"
                        title="Xác nhận xóa user"
                        description="Bạn có chắc chắn muốn xóa user này?"
                        onConfirm={() => handleDeleteUser(entity._id)}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <span style={{ cursor: "pointer", margin: "0 10px" }}>
                            <DeleteOutlined style={{ fontSize: 20, color: '#ff4d4f' }} />
                        </span>
                    </Popconfirm>
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

        if (sort?.userName) sortBy = sort.userName === 'ascend' ? "sort=userName" : "sort=-userName";
        if (sort?.email) sortBy = sort.email === 'ascend' ? "sort=email" : "sort=-email";
        if (sort?.createdAt) sortBy = sort.createdAt === 'ascend' ? "sort=createdAt" : "sort=-createdAt";
        if (sort?.updatedAt) sortBy = sort.updatedAt === 'ascend' ? "sort=updatedAt" : "sort=-updatedAt";

        temp += sortBy ? `&${sortBy}` : `&sort=-updatedAt`;
        temp += "&populate=role&fields=role._id,role.name";

        return temp;
    };

    return (
        <div>
            <Access permission={ALL_PERMISSIONS.USERS.GET_PAGINATE}>
                <DataTable<IUser>
                    actionRef={tableRef}
                    headerTitle="Danh sách Tài khoản"
                    rowKey="_id"
                    columns={columns}
                    request={async (params, sort, filter) => {
                        const query = buildQuery(params, sort, filter);
                        const res: any = await dispatch(fetchUser({ query })).unwrap();
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
                        <Access permission={ALL_PERMISSIONS.TEAMS.CREATE} hideChildren key="create-btn">
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={() => setOpenModal(true)}
                            >
                                Thêm mới
                            </Button>
                        </Access>
                    ]}
                    
                    form={{
                        layout: 'horizontal',
                        labelCol: { span: 6 },
                        wrapperCol: { span: 18 },
                        colon: false,
                    }}
                />
            </Access>

            {openModal && (
                <ModalUser
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    dataInit={dataInit}
                    setDataInit={setDataInit}
                    roleSelect={roleSelect}
                    setRoleSelect={setRoleSelect}
                />
            )}

            <ViewDetailUser
                onClose={setOpenViewDetail}
                open={openViewDetail}
                dataInit={dataInit}
                setDataInit={setDataInit}
            />
        </div>
    );
};

export default UserPage;
