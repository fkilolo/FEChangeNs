import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { isMobile } from "react-device-detect";
import { callCreateConnectSav, callUpdateConnectSav } from "@/config/api/business/connectsav.api";
import { IConnectSav } from "@/types/model/savModel/connectSav.d";

interface IProps {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  dataInit?: IConnectSav | null;
  setDataInit: (v: any) => void;
}

const ModalConnectSav = (props: IProps) => {
  const { openModal, setOpenModal, dataInit, setDataInit } = props;

  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    setDataInit(null);
    setOpenModal(false);
  };

  const submitForm = async (values: any) => {
    const { name, apikey, userName } = values;

    if (dataInit?._id) {
      // Update
      const res: any = await callUpdateConnectSav(dataInit._id, {
        name,
        apikey,
        userName,
      });

      if (res) {
        message.success("Cập nhật kết nối thành công");
        handleReset();
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res?.message || "Không thể cập nhật kết nối",
        });
      }
    } else {
      // Create
      const res: any = await callCreateConnectSav({
        name,
        apikey,
        userName,
      });

      if (res) {
        message.success("Tạo mới kết nối thành công");
        handleReset();
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: res?.message || "Không thể tạo kết nối",
        });
      }
    }
  };

  return (
    <ModalForm
      title={<>{dataInit?._id ? "Cập nhật Kết nối SAV" : "Tạo mới Kết nối SAV"}</>}
      open={openModal}
      form={form}
      modalProps={{
        onCancel: () => handleReset(),
        afterClose: handleReset,
        destroyOnClose: true,
        width: isMobile ? "100%" : 600,
        keyboard: false,
        maskClosable: false,
        okText: dataInit?._id ? "Cập nhật" : "Tạo mới",
        cancelText: "Hủy",
      }}
      initialValues={dataInit?._id ? dataInit : {}}
      onFinish={submitForm}
      preserve={false}
      scrollToFirstError
    >
      <Row gutter={16}>
        <Col span={24}>
          <ProFormText
            label="Tên kết nối"
            name="name"
            placeholder="Nhập tên kết nối"
            rules={[{ required: true, message: "Vui lòng nhập tên kết nối" }]}
          />
        </Col>

        <Col span={24}>
          <ProFormText
            label="API Key"
            name="apikey"
            placeholder="Nhập API key"
            rules={[{ required: true, message: "Vui lòng nhập API key" }]}
          />
        </Col>

        <Col span={24}>
          <ProFormText
            label="Tài khoản"
            name="userName"
            placeholder="Nhập tài khoản"
            rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
          />
        </Col>
      </Row>
    </ModalForm>
  );
};

export default ModalConnectSav;
