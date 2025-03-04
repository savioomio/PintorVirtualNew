export * from './navigation';
export * from './image';

export interface Color {
  id: string;
  name: string;
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
}

export enum SegmentationMode {
  AUTOMATIC = 'automatic',
  MANUAL = 'manual'
}

export interface ImageMask {
  uri: string;
  width: number;
  height: number;
}