import { DatePicker, UploadFile } from "antd";

export enum LocalstorageKeys {
  DomainIdSelected = 'domainIdSelected'
}

export interface UploadedFile extends UploadFile {
  cdnOrigin?: string;
}


export type DateRangeType =
  NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>["picker"]>;

export enum Mode {
  Create = 'create',
  View = 'view',
  Edit = 'edit'
}

