import { IUser } from "@/types/model/userModel/user.d";
import { Badge, Descriptions, Drawer, Tag } from "antd";
import dayjs from 'dayjs';

interface IProps {
    onClose: (v: boolean) => void;
    open: boolean;
    dataInit: IUser | null;
    setDataInit: (v: any) => void;
}

const ViewDetailUser = (props: IProps) => {
    const { onClose, open, dataInit, setDataInit } = props;
    return (
        <>
            <Drawer
                title="Thông Tin User"
                placement="right"
                onClose={() => { onClose(false); setDataInit(null) }}
                open={open}
                width={"40vw"}
                maskClosable={false}
            >
                <Descriptions title="" bordered column={2} layout="vertical">
                    <Descriptions.Item label="Tên tài khoản">{dataInit?.userName}</Descriptions.Item>

                    <Descriptions.Item label="Vai trò" >{dataInit?.role?.name}</Descriptions.Item>

                    <Descriptions.Item label="Team" >
                        {
                            dataInit?.team?.map(item => {
                                return (
                                    <p>
                                        <Badge status="processing" text={<>{item?.name}</>} />
                                    </p>
                                )
                            })
                        }
                    </Descriptions.Item>

                    <Descriptions.Item label="Email">{dataInit?.email}</Descriptions.Item>

                    <Descriptions.Item label="Chức vụ">
                        {
                            dataInit?.position?.map(item => {
                                return (
                                    <Badge status="processing" text={<>{item}</>} />
                                )
                            })
                        }
                    </Descriptions.Item>

                    <Descriptions.Item label="Trạng thái">
                        {
                            dataInit?.status === 1 ?
                                <Tag color="green">Đang làm việc</Tag>
                                :
                                <Tag color="red">Nghỉ việc</Tag>
                        }
                    </Descriptions.Item>

                    <Descriptions.Item label="Tên telegram">{dataInit?.telegramName}</Descriptions.Item>

                    <Descriptions.Item label="Id telegram">{dataInit?.telegramId}</Descriptions.Item>

                    <Descriptions.Item label="Ngày tạo">{dataInit && dataInit.createdAt ? dayjs(dataInit.createdAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>
                    <Descriptions.Item label="Ngày sửa">{dataInit && dataInit.updatedAt ? dayjs(dataInit.updatedAt).format('DD-MM-YYYY HH:mm:ss') : ""}</Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}

export default ViewDetailUser;