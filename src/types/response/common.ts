export interface FileResponse {
    id?: string;
    name?: string;
    cdnOrigin?: string
    fileUrl?: string;
    thumbnail?: string;
    data?: {
        fileUrl: string;
        fileName:string
    }
}