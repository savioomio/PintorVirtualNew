import { Dimensions, Platform } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// Função para aguardar um tempo específico
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Função para gerar IDs únicos
export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Função para ajustar dimensões da imagem para caber na tela
export const getAdjustedImageDimensions = (
  imageWidth: number,
  imageHeight: number,
  screenWidth: number = SCREEN_WIDTH,
  maxHeight: number = SCREEN_HEIGHT * 0.7
): { width: number; height: number } => {
  const aspectRatio = imageWidth / imageHeight;
  
  let newWidth = screenWidth;
  let newHeight = screenWidth / aspectRatio;
  
  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    newWidth = maxHeight * aspectRatio;
  }
  
  return {
    width: newWidth,
    height: newHeight,
  };
};

// Função para formatar bytes para um formato legível
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};