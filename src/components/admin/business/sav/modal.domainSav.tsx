import {
    ModalForm,
    ProFormText,
  } from "@ant-design/pro-components";
  import { IDomainSav } from "@/types/model/savModel/domainSav.d";
  import { Form, Typography } from "antd";
  import { useEffect } from "react";
  
  type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: Partial<IDomainSav>) => void;
    loading: boolean;
    isUpdateAll?: boolean;
    dataInit?: IDomainSav | null;
  };
  
  const ModalDomainSav = ({
    open,
    onClose,
    onSubmit,
    loading,
    isUpdateAll = false,
    dataInit,
  }: Props) => {
    const [form] = Form.useForm();
  
    useEffect(() => {
      if (open) {
        form.setFieldsValue({
          domain_name: dataInit?.domain_name || "",
          ns_1: dataInit?.ns_1 || "",
          ns_2: dataInit?.ns_2 || "",
        });
      } else {
        form.resetFields();
      }
    }, [open, dataInit, form]);
  
    return (
      <ModalForm
        title={isUpdateAll ? "Cập nhật nameservers cho các Domain đã chọn" : "Cập nhật Domain"}
        open={open}
        form={form}
        onFinish={async (values) => {
          await onSubmit(values);
          return true;
        }}
        onOpenChange={(val) => !val && onClose()}
        width={400}
        modalProps={{
          okText: "Lưu",
          cancelText: "Hủy",
          confirmLoading: loading,
          destroyOnClose: true,
        }}
      >
        {isUpdateAll ? (
          <Typography.Text type="secondary">
            Bạn đang cập nhật NS cho các domain đã chọn.
          </Typography.Text>
        ) : (
          <ProFormText name="domain_name" label="Tên domain" disabled />
        )}
  
        <ProFormText
          name="ns_1"
          label="NS1"
          placeholder="Nhập NS1"
          rules={[{ required: true, message: "Vui lòng nhập NS1" }]}
        />
        <ProFormText
          name="ns_2"
          label="NS2"
          placeholder="Nhập NS2"
          rules={[{ required: true, message: "Vui lòng nhập NS2" }]}
        />
      </ModalForm>
    );
  };
  
  export default ModalDomainSav;
  