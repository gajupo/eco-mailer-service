export interface ISpacesService {
    downloadFile(fileName: string): Promise<Buffer>;
    extractPathFromUrl(url: string): string;
    extractFileNameFromPath(path: string): string;
}