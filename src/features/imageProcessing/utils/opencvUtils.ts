import * as ImageManipulator from 'expo-image-manipulator';
import { ImageSize } from '../../../types/image';
import { opencvManager } from '../../../services/opencv/opencvManager';
import * as FileSystem from 'expo-file-system';
import { Image } from 'react-native';

// Detectar paredes usando algoritmos
export const detectWalls = async (
  imageUri: string
): Promise<{ maskUri: string; processedImage: string } | null> => {
  try {
    if (!opencvManager.isLoaded()) {
      console.error('Módulo de processamento não está inicializado');
      return null;
    }

    console.log('Detectando paredes na imagem...');
    
    // Usar o processador de imagem para detectar paredes
    const result = await opencvManager.detectWalls(imageUri);
    
    if (!result || !result.maskUri) {
      throw new Error('Falha na detecção de paredes ou maskUri indefinido');
    }
    
    return {
      maskUri: result.maskUri,
      processedImage: result.processedUri,
    };
  } catch (error) {
    console.error('Erro na detecção de paredes:', error);
    return null;
  }
};

// Aplicar cor na imagem usando a máscara
export const applyColorToImage = async (
  imageUri: string,
  maskUri: string,
  color: { r: number; g: number; b: number },
  opacity: number = 0.7
): Promise<string | null> => {
  try {
    if (!opencvManager.isLoaded()) {
      console.error('Módulo de processamento não está carregado');
      return null;
    }
    
    console.log(`Aplicando cor RGB(${color.r},${color.g},${color.b}) com opacidade ${opacity}`);
    
    // Na versão real, usaríamos a máscara para aplicar a cor apenas nas paredes
    // Por enquanto, simulamos aplicando a cor na imagem inteira
    const result = await opencvManager.applyColorToWall(
      imageUri,
      color,
      opacity
    );
    
    return result;
  } catch (error) {
    console.error('Erro na aplicação de cor:', error);
    return null;
  }
};

// Obter dimensões de uma imagem
export const getImageSize = async (imageUri: string): Promise<ImageSize | null> => {
  try {
    return new Promise((resolve, reject) => {
      Image.getSize(
        imageUri,
        (width, height) => {
          resolve({ width, height });
        },
        (error) => {
          console.error('Erro ao obter dimensões da imagem:', error);
          reject(error);
        }
      );
    });
  } catch (error) {
    console.error('Erro ao obter dimensões da imagem:', error);
    return null;
  }
};