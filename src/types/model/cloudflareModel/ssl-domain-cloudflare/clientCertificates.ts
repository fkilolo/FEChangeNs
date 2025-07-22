export interface IClientCertificates {
    certificate?: boolean;
    csr?: string;
    expires_on?: string;
    hostnames?: string[];
    id?: string;
    request_type?: string;
    requested_validity?: number;
}