import { callFetchDNSDomain, callFetchWhoIsDomain } from "@/config/api/business/domain.api";
import { IWhoISDomain } from "@/types/model/domainModel/whoISDomain.d";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { Card, Col, Input, Row, Tag, notification } from "antd";
import { useState } from "react";
import { Chart } from "react-google-charts";

const WhoIsDomain = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [domain, setDomain] = useState<string>("");
    const [infoDomain, setInfoDomain] = useState<IWhoISDomain>();
    const [DNSDomain, setDNSDomain] = useState<any[]>([]);

    const handleSearchDomain = async () => {
        setInfoDomain({})
        setDNSDomain([])
        setIsLoading(true);
        if (domain) {
            getInfoDomain(domain);
            getDNSDomain(domain);
        } else {
            setTimeout(() => {
                setIsLoading(false);
                return notification.error({
                    message: 'Có lỗi xảy ra',
                    description: "Vui lòng nhập tên domain bạn muốn tìm thông tin"
                });
            }, 1000);
        }
    }

    const getInfoDomain = async (domain: string) => {
        const resDomain = await callFetchWhoIsDomain(domain);
        if (resDomain.error) {
            setIsLoading(false);
            return notification.error({
                message: 'Có lỗi xảy ra',
                description: resDomain.message
            });
        }
        setInfoDomain(resDomain.data);
        setIsLoading(false);
    }

    const getDNSDomain = async (domain: string) => {
        const resDomain = await callFetchDNSDomain(domain);
        if (resDomain.error) {
            setIsLoading(false);
            return notification.error({
                message: 'Có lỗi xảy ra',
                description: resDomain.message
            });
        }
        setDNSDomain(resDomain.data);
    }

    const handleDomain = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDomain(event.target.value.trim());
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchDomain();
        }
    };

    const options = {
        tooltip: { isHtml: true }, // Enable HTML tooltips
    };

    return (
        <Row gutter={[20, 20]}>
            <Col span={24} md={24}>
                <Row >
                    <Col span={12} offset={6}>
                        <Input
                            type="text"
                            value={domain}
                            onChange={(event) => handleDomain(event)}
                            onKeyDown={handleKeyDown}
                            style={{ height: '40px', borderRadius: '13px' }} placeholder="Nhập tên domain bạn muốn tìm thông tin"
                        ></Input>
                    </Col>
                    <Col span={24} md={1} style={{ textAlign: 'center', paddingLeft: '12px' }}>

                        {
                            isLoading ?
                                <div className="domain-search">
                                    <LoadingOutlined
                                        style={{
                                            fontSize: '30px',
                                            cursor: 'pointer',
                                            alignItems: 'center',
                                            height: '100%',
                                            color: '#fff'

                                        }}
                                    />
                                </div>
                                :
                                <div
                                    onClick={() => handleSearchDomain()}
                                    className="domain-search"
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    <SearchOutlined
                                        style={{
                                            fontSize: '30px',
                                            alignItems: 'center',
                                            height: '100%',
                                            color: '#fff'
                                        }}
                                    />
                                </div>
                        }
                    </Col>
                </Row>
            </Col >
            <Col lg={12} md={12} sm={24} xs={24}>
                {
                    infoDomain?.domainName &&
                    <Card title={infoDomain?.domainName} bordered={false} >
                        <div className="info-domain">
                            <tbody>
                                <tr className="row-info-domain">
                                    <td className="title-info-domain">Tên doamin:</td>
                                    <td className="content-info-domain"> {infoDomain?.domainName}</td>
                                </tr>
                                <tr>
                                    <td className="title-info-domain">Ngày đăng ký:</td>
                                    <td className="content-info-domain"> {infoDomain?.creationDate}</td>
                                </tr>
                                <tr className="row-info-domain">
                                    <td className="title-info-domain">Ngày hết hạn:</td>
                                    <td className="content-info-domain"> {infoDomain?.expirationDate}</td>
                                </tr>
                                <tr>
                                    <td className="title-info-domain">Chủ sở hữu tên miền:</td>
                                    <td className="content-info-domain"> {infoDomain?.registrantName}</td>
                                </tr>
                                <tr className="row-info-domain">
                                    <td className="title-info-domain">Cờ trạng thái:</td>
                                    <td className="content-info-domain">
                                        {
                                            infoDomain?.status?.map((item, index) => {
                                                return (
                                                    <Tag color="green">{item}</Tag>
                                                )
                                            })
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="title-info-domain">Quản lý tại Nhà đăng ký:</td>
                                    <td className="content-info-domain"> {infoDomain?.registrar}</td>
                                </tr>
                                <tr className="row-info-domain">
                                    <td className="title-info-domain">Nameservers:</td>
                                    <td className="content-info-domain">
                                        {
                                            infoDomain?.nameServer?.map((item, index) => {
                                                return (
                                                    <Tag color="green">{item}</Tag>
                                                )
                                            })
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="title-info-domain">DNSSEC:</td>
                                    <td className="content-info-domain"> {infoDomain?.DNSSEC}</td>
                                </tr>
                            </tbody>
                        </div>
                    </Card>
                }
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
                {
                    DNSDomain?.length > 0 && (
                        <Card title={"Kiểm tra bản đồ DNS"} bordered={false} >

                            <Chart
                                chartEvents={[
                                    {
                                        eventName: "select",
                                        callback: ({ chartWrapper }) => {
                                            const chart = chartWrapper?.getChart();
                                            const selection = chart?.getSelection();
                                            if (selection && selection.length === 0) return;
                                            const region = DNSDomain && DNSDomain[selection && selection[0].row + 1];
                                            console.log("Selected : " + region);
                                        },
                                    },
                                ]}
                                chartType="GeoChart"
                                width="100%"
                                height="100%"
                                data={DNSDomain}
                                options={options}
                            />

                        </Card>
                    )
                }
            </Col>
        </Row >
    )
}

export default WhoIsDomain;