
import { useAppDispatch } from "@/redux/hooks";
import { ISearchDomain } from "@/types/model/searchDomainModel/searchDomain";
import { Card, Col, Input, Row, message, notification } from "antd";
import { useState } from "react";

const DashboardPage = () => {
    const dispatch = useAppDispatch();
    const [listDomain, setListDomain] = useState<ISearchDomain[]>([]);



    return (
        <Row gutter={[20, 20]}>
          <Col span={16} offset={4}>
            {listDomain.map((item, index) => (
              <div key={index} style={{ paddingBottom: "12px" }}>
                <Card title={item?.supplier} bordered={false}>
                  {item.messageErrorPromise && (
                    <div style={{ color: "red" }}>{item.messageErrorPromise}</div>
                  )}
                </Card>
              </div>
            ))}
          </Col>
        </Row>
      );
};

export default DashboardPage;
