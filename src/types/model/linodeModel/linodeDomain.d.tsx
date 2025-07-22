export interface IRecordDNS {
  Id: number;
  Type: number;
  Ttl: number;
  Value: string;
  Name: string;
  Weight: number;
  Priority: number;
  Port: number;
  Flags: number;
  Tag: string;
  Accelerated: boolean;
  AcceleratedPullZoneId: number;
  LinkName: string;
  GeolocationInfo: any;
  MonitorStatus: number;
  MonitorType: number;
  GeolocationLatitude: number;
  GeolocationLongitude: number;
  EnviromentalVariables: any[];
  LatencyZone: string | null;
  SmartRoutingType: number;
  Disabled: boolean;
  Comment: string | null;
}

export interface ILinodeDomain {
  id: number;
  domain: string;
  type: "master" | "slave";
  status: "active" | "disabled";
  description?: string;
  soa_email: string;
  retry_sec: number;
  expire_sec: number;
  ttl_sec: number;
  refresh_sec: number;
  tags?: string[];
  group?: string;
  axfr_ips?: string[];
  master_ips?: string[];
  created: string;
  updated: string;
}

export interface ILinodeDomainResponse {
  data: ILinodeDomain[]; // Danh sách các domain
  page: number; // Số trang hiện tại
  pages: number; // Tổng số trang
  results: number; // Tổng số domain
}

export interface ILinodeDataResponse {
  Items: ILinodeDomain[];
  CurrentPage: number;
  TotalItems: number;
  HasMoreItems: boolean;
}

export interface ILinodeDomain {
  [name: string]: any;
}


export interface ILinodeDNSRecordsResponse {
  data: ILinodeDNSRecord[];
  page: number;
  pages: number;
  results: number;
}

export interface ILinodeDNSRecord {
  id: number;
  type: "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "SRV" | "NS" | "PTR" | "CAA";
  name: string;
  target: string;
  priority?: number;
  weight?: number;
  port?: number;
  service?: string;
  protocol?: string;
  ttl_sec: number;
  tag?: string;
}

