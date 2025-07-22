import { PlusOutlined } from "@ant-design/icons";

const UploadButton = () => {
  return (
    <button style={{ border: 0, background: "none", cursor: 'pointer' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Chọn File</div>
    </button>
  );
};

export default UploadButton;
