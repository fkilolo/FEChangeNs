import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { message } from "antd";
import { useAppSelector } from "@/redux/hooks";
import { callCreateSpaceship, callUpdateSpaceship } from "@/config/api/business/spaceship.api";

interface IProps {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  reloadTable: () => void;
  dataInit?: any;
}

const ModalSpaceship = (props: IProps) => {
  const { openModal, setOpenModal, reloadTable, dataInit } = props;
  const user = useAppSelector((state: any) => state.account.user);

  const handleFinish = async (values: any) => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const data = {
      ...values,
      total_domain: 0,
      userName: userData?.userName || "",
    };
    let res;
    if (dataInit && dataInit._id) {
      res = await callUpdateSpaceship(dataInit._id, data);
    } else {
      res = await callCreateSpaceship(data);
    }
    if (res) {
      message.success(dataInit ? "Cập nhật spaceship thành công" : "Tạo mới spaceship thành công");
      setOpenModal(false);
      reloadTable();
    }
  };

  return (
    <ModalForm
      title={dataInit ? "Cập nhật Spaceship" : "Thêm mới Spaceship"}
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
        label="Tên Spaceship"
        rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        placeholder="Nhập tên spaceship"
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

export default ModalSpaceship; 