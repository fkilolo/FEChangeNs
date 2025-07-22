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

export interface IBunnyZone {
  Id: number;
  Domain: string;
  Records: IRecordDNS[];
  DateModified: string;
  DateCreated: string;
  NameserversDetected: boolean;
  CustomNameserversEnabled: boolean;
  Nameserver1: string;
  Nameserver2: string;
  SoaEmail: string;
  NameserversNextCheck: string;
  LoggingEnabled: boolean;
  LoggingIPAnonymizationEnabled: boolean;
  LogAnonymizationType: number;
}

export interface IBunnyZoneResponse {
  Items: IBunnyZone[];
  CurrentPage: number;
  TotalItems: number;
  HasMoreItems: boolean;
}

export interface IBunnyDataResponse {
  Items: IBunnyZone[];
  CurrentPage: number;
  TotalItems: number;
  HasMoreItems: boolean;
}
