export interface ImageSize {
    width: number;
    height: number;
}

export interface ImageInfo {
    uri: string;
    width: number;
    height: number;
}

export interface ProcessedImage {
    originalUri: string;
    processedUri: string;
    maskUri?: string;
    width: number;
    height: number;
}