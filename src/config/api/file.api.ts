import { IBackendRes } from "@/types/model/base/base.d";
import { FileResponse } from "@/types/response/common";
import { AxiosProgressEvent } from "axios";
import axios from 'config/axios-customize';

interface Options {
    onUploadProgress?: (event: AxiosProgressEvent) => void
}

export const callUploadSingleFile = (file: any, folderType: string, options?: Options) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileUpload', file);
    return axios<IBackendRes<FileResponse>>({
        method: 'post',
        url: '/api/v1/files/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "folder_type": folderType
        },
        onUploadProgress: event => {
            options?.onUploadProgress?.(event)
        }
    });
}