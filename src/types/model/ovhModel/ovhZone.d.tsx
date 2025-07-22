export interface IRecordDNS {
  key: string;
  fieldType: string;
  id: number;
  subDomain: string;
  target: string;
  ttl: number;
  zone: string;
  editMode?: boolean;
}
export interface IRecordSSL {
  _id: string;
  privateKey: string;
  certificateKey: string;
  expiry: string;
  record: string;
}

export interface IOvhZone {
  Id: number;
  domain: string;
  hosts: string;
  nameServers: string[];
  Records: IRecordDNS[];
}

export interface IOvhDomainModify {
  cdn: string;
  firewall: string;
  ownLog: string | null;
  ssl: boolean;
}

export interface IOvhDataResponse {
  Items: IOvhZone[];
  CurrentPage: number;
  TotalItems: number;
  HasMoreItems: boolean;
}
