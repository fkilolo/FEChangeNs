export interface ICreateClientCertificates {
    zoneId?: string;
    token?: string;
    hostnames: string[];
    request_type?: string;
    requested_validity?: number;
}