import { FooterToolbar, ModalForm, ProCard, ProFormSwitch, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { isMobile } from 'react-device-detect';
import { CheckSquareOutlined } from "@ant-design/icons";
import ModuleApi from "./module.api";
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchRoleById, resetSingleRole } from "@/redux/slice/business/roleSlide";
import { callFetchPermission } from "@/config/api/business/permission.api";
import { callCreateRole, callFetchRoleById, callUpdateRole } from "@/config/api/business/role.api";
import { IPermission } from "@/types/model/permissionModel/permission.d";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    reloadTable: () => void;    
    selectedRoleId: string ;
}

const ModalRole = (props: IProps) => {
    const { openModal, setOpenModal, reloadTable, selectedRoleId } = props;
    
    const dispatch = useAppDispatch();
    const [singleRole, setSingleRole] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedRoleId) {
                const res = await callFetchRoleById(selectedRoleId);
                if (res) setSingleRole(res);
            } else {
                setSingleRole(null); // reset khi tạo mới
            }
        };
        fetchData();
    }, [selectedRoleId]);

    const [form] = Form.useForm();

    const [listPermissions, setListPermissions] = useState<{
        module: string;
        permissions: IPermission[]
    }[] | null>(null);

    const groupByPermission = (data: any) => {
        return _(data)
            .groupBy(x => x.module)
            .map((value, key) => {
                return { module: key, permissions: value as IPermission[] };
            })
            .value();
    }

    useEffect(() => {
        const init = async () => {
            const res :any= await callFetchPermission(`current=1&pageSize=100000`);
            if (res?.result) {
                setListPermissions(groupByPermission(res?.result))
            }
        }
        init();
    }, [])

    useEffect(() => {
        if (listPermissions?.length && singleRole?._id) {
            form.setFieldsValue({
                name: singleRole.name,
                isActive: singleRole.isActive,
                description: singleRole.description
            })
            const userPermissions = groupByPermission(singleRole.permissions);

            listPermissions.forEach(x => {
                let allCheck = true;
                x.permissions?.forEach(y => {
                    const temp = userPermissions.find(z => z.module === x.module);

                    if (temp) {
                        const isExist = temp.permissions.find(k => k._id === y._id);
                        if (isExist) {
                            form.setFieldValue(["permissions", y._id as string], true);
                        } else allCheck = false;
                    } else {
                        allCheck = false;
                    }
                })
                form.setFieldValue(["permissions", x.module], allCheck)
            })
        }
    }, [listPermissions, singleRole])

    const submitRole = async (valuesForm: any) => {
        const { description, isActive, name, permissions } = valuesForm;
        const checkedPermissions = [];

        if (permissions) {
            for (const key in permissions) {
                if (key.match(/^[0-9a-fA-F]{24}$/) && permissions[key] === true) {
                    checkedPermissions.push(key);
                }
            }
        }

        if (singleRole?._id) {
            //update
            const role = {
                name, description, isActive, permissions: checkedPermissions
            }
            const res :any= await callUpdateRole(role, singleRole._id);
            if (res) {
                message.success("Cập nhật role thành công");
                handleReset();
                reloadTable();
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra',
                    description: res.message
                });
            }
        } else {
            //create
            const role = {
                name, description, isActive, permissions: checkedPermissions
            }
            const res :any= await callCreateRole(role);
            if (res) {
                message.success("Thêm mới role thành công");
                handleReset();
                reloadTable();
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
        setOpenModal(false);
        dispatch(resetSingleRole({}));
    }

    return (
        <>
            <ModalForm
                title={<>{singleRole?._id ? "Cập nhật Role" : "Tạo mới Role"}</>}
                open={openModal}
                modalProps={{
                    onCancel: () => { handleReset() },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: isMobile ? "100%" : 900,
                    keyboard: false,
                    maskClosable: false,

                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitRole}
                submitter={{
                    render: (_: any, dom: any) => <FooterToolbar>{dom}</FooterToolbar>,
                    submitButtonProps: {
                        icon: <CheckSquareOutlined />
                    },
                    searchConfig: {
                        resetText: "Hủy",
                        submitText: <>{singleRole?._id ? "Cập nhật" : "Tạo mới"}</>,
                    }
                }}
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Tên Role"
                            name="name"
                            rules={[
                                { required: true, message: 'Vui lòng không bỏ trống' },
                            ]}
                            placeholder="Nhập name"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormSwitch
                            label="Trạng thái"
                            name="isActive"
                            checkedChildren="ACTIVE"
                            unCheckedChildren="INACTIVE"
                            initialValue={true}
                            fieldProps={{
                                defaultChecked: true,
                            }}
                        />
                    </Col>

                    <Col span={24}>
                        <ProFormTextArea
                            label="Miêu tả"
                            name="description"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập miêu tả role"
                            fieldProps={{
                                autoSize: { minRows: 2 }
                            }}
                        />
                    </Col>
                    <Col span={24}>
                        <ProCard
                            title="Quyền truy cập"
                            subTitle="Các quyền truy cập được phép cho quyền hạn này"
                            headStyle={{ color: '#d81921' }}
                            style={{ marginBottom: 20 }}
                            headerBordered
                            size="small"
                            bordered
                        >
                            <ModuleApi
                                form={form}
                                listPermissions={listPermissions}
                            />

                        </ProCard>

                    </Col>
                </Row>
            </ModalForm>
        </>
    )
}

export default ModalRole;
