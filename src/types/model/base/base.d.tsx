export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}

export interface IName {
    _id?: string;
    name?: string;
}

export interface IBasic {
    createdBy?: IName;
    isDeleted?: boolean;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
    updatedBy?: IName;
}