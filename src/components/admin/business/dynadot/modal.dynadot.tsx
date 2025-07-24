import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { message } from "antd";
import { callCreateDynadot, callUpdateDynadot } from "@/config/api/business/dynadot.api";

interface IProps {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  reloadTable: () => void;
  dataInit?: any;
}

const ModalDynadot = (props: IProps) => {
  const { openModal, setOpenModal, reloadTable, dataInit } = props;

  const handleFinish = async (values: any) => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const data = {
      ...values,
      total_domain: 0,
      userName: userData?.userName || "",
    };
    let res;
    if (dataInit && dataInit._id) {
      res = await callUpdateDynadot(dataInit._id, data);
    } else {
      res = await callCreateDynadot(data);
    }
    if (res) {
      message.success(dataInit ? "Cập nhật dynadot thành công" : "Tạo mới dynadot thành công");
      setOpenModal(false);
      reloadTable();
    }
  };

  return (
    <ModalForm
      title={dataInit ? "Cập nhật Dynadot" : "Thêm mới Dynadot"}
      open={openModal}
      modalProps={{
        onCancel: () => setOpenModal(false),
        destroyOnClose: true,
        width: 500,
        okText: "Lưu",
        cancelText: "Hủy",
      }}
      submitter={{
        searchConfig: {
          submitText: "Lưu",
          resetText: "Hủy",
        },
      }}
      onFinish={handleFinish}
      autoFocusFirstInput
      preserve={false}
      initialValues={dataInit ? dataInit : {}}
    >
      <ProFormText
        name="name"
        label="Tên Dynadot"
        rules={[
          { required: true, message: "Vui lòng nhập tên" },
          { min: 1, max: 60, message: "Tên phải từ 1 đến 60 ký tự" },
        ]}
        placeholder="Nhập tên dynadot"
      />
      <ProFormText
        name="apikey"
        label="API Key"
        rules={[{ required: true, message: "Vui lòng nhập API Key" }]}
        placeholder="Nhập API Key"
      />
      <ProFormText
        name="secretkey"
        label="Secret Key"
        rules={[{ required: true, message: "Vui lòng nhập Secret Key" }]}
        placeholder="Nhập Secret Key"
      />
    </ModalForm>
  );
};

export default ModalDynadot; 