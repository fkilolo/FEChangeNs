import { ModalForm, ProForm, ProFormDigit, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { isMobile } from 'react-device-detect';
import { useState, useEffect } from "react";
import { DebounceSelect } from "../../../client/data-select/debouce.select";
import { callCreateUser, callUpdateUser } from "@/config/api/business/user.api";
import { callFetchRole } from "@/config/api/business/role.api";
import { callFetchTeamPublic } from "@/config/api/business/team.api";
import { ALL_POSITION } from "@/config/data/position";
import { ALL_USER_STATUS_SELECT } from "@/config/data/user-status";
import { IUser } from "@/types/model/userModel/user.d";
import { IRoleSelect } from "@/types/model/roleModel/roleSelect.d";
import { ITeamSelect } from "@/types/model/teamModel/teamSelect.d";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: IUser | null;
    setDataInit: (v: any) => void;
    // reloadTable: () => void;
    roleSelect: IRoleSelect;
    setRoleSelect: (v: any) => void;
}

const ModalUser = (props: IProps) => {
    const {
        openModal,
        setOpenModal,
        // reloadTable,
        dataInit,
        setDataInit,
        roleSelect,
        setRoleSelect
    } = props;

    const [roles, setRoles] = useState<IRoleSelect>(roleSelect);
    const [status, setStatus] = useState<{}>({});

    const [form] = Form.useForm();

    useEffect(() => {
        if (dataInit?._id) {
            if (dataInit.status) {
                const itemStatus = { 1: "Đang làm việc" };
                setStatus(itemStatus)
            }
        }
    }, [dataInit]);

    const submitUser = async (valuesForm: any) => {
        const { userName, password, team, role, email, position, status, telegramName, telegramId } = valuesForm;
        let listTeam = [];
        if (team) {
            listTeam = team.map((item: any) => { return item.value || item._id });
        }
        if (dataInit?._id) {
            //update
            const user = {
                _id: dataInit._id,
                team: listTeam,
                role: role.value || role._id,
                email,
                position,
                status,
                telegramName,
                telegramId,
                password
            }

            const res: any = await callUpdateUser(user, dataInit._id);
            if (res) {
                message.success("Cập nhật user thành công");
                handleReset();
                // reloadTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        } else {
            //create
            const user = {
                userName,
                password,
                team: listTeam,
                role: role.value,
                email,
                position,
                status,
                telegramName,
                telegramId,
            }
            const res: any = await callCreateUser(user);
            if (res) {
                message.success("Thêm mới user thành công");
                handleReset();
                // reloadTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        }
    }

    const handleReset = async () => {
        form.resetFields();
        setDataInit(null);
        setRoleSelect({});
        setOpenModal(false);
    }

    async function fetchRoleList(name: string): Promise<IRoleSelect[]> {
        const res :any= await callFetchRole(`current=1&pageSize=100&name=/${name}/i`);
        if (res) {
            const list = res.result;
            const temp = list.map((item: { name: string; _id: string }) => {
                return {
                    label: item.name,
                    value: item._id
                }
            })
            return temp;
        } else return [];
    }

    async function fetchTeamList(name: string): Promise<ITeamSelect[]> {
        const res: any = await callFetchTeamPublic(`current=1&pageSize=100&name=/${name}/i`);
        if (res) {
            const list = res.result;
            const temp = list.map((item: { name: string; _id: string }) => {
                return {
                    label: item.name,
                    value: item._id
                }
            })
            return temp;
        } else return [];
    }

    return (
        <>
            <ModalForm
                title={<>{dataInit?._id ? "Cập nhật User" : "Tạo mới User"}</>}
                open={openModal}
                modalProps={{
                    onCancel: () => { handleReset() },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: isMobile ? "100%" : 900,
                    keyboard: false,
                    maskClosable: false,
                    okText: <>{dataInit?._id ? "Cập nhật" : "Tạo mới"}</>,
                    cancelText: "Hủy"
                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitUser}
                initialValues={dataInit?._id ? dataInit : {}}
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            disabled={dataInit?._id ? true : false}
                            label="Tài khoản"
                            name="userName"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' }
                            ]}
                            placeholder="Nhập tài khoản"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText.Password
                            label="Password"
                            name="password"
                            rules={[{ required: dataInit?._id ? false : true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập password"
                        />
                    </Col>

                       

                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProForm.Item
                            name="role"
                            label="Vai trò"
                            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                        >
                            <DebounceSelect
                                allowClear
                                showSearch
                                defaultValue={roles}
                                value={roles}
                                placeholder="Chọn công vai trò"
                                fetchOptions={fetchRoleList}
                                onChange={(newValue: any) => {
                                    if (newValue?.length === 0 || newValue?.length === 1) {
                                        setRoles(newValue as IRoleSelect);
                                    }
                                }}
                                style={{ width: '100%' }}
                            />
                        </ProForm.Item>
                    </Col>
                    {/* <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormSelect
                            name="position"
                            label="Chức vụ"
                            valueEnum={ALL_POSITION}
                            placeholder="Vui lòng chọn chức vụ"
                            rules={[{ required: true, message: 'Vui lòng chọn chức vụ!' }]}
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormSelect
                            name="status"
                            label="Trạng thái"
                            options={ALL_USER_STATUS_SELECT}
                            placeholder="Vui lòng chọn trạng thái"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormText
                            label="Tên telegram"
                            name="telegramName"
                            placeholder="Nhập tên telegram"
                        />
                    </Col>

                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormDigit
                            label="Id telegram"
                            name="telegramId"
                            placeholder="Nhập id telegram"
                        />
                    </Col> */}
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormText
                            label="Email"
                            name="email"
                            rules={[
                                { type: 'email', message: 'Vui lòng nhập email hợp lệ' }
                            ]}
                            placeholder="Nhập email"
                        />
                    </Col>
                </Row>
            </ModalForm>
        </>
    )
}

export default ModalUser;
