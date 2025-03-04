import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { detectWalls, applyColorToImage } from '../utils/opencvUtils';
import { ProcessedImage } from '../../../types/image';
import { SegmentationMode } from '../../../types';

class ImageProcessingService {
  // Processar imagem com base no modo de segmentação
  async processImage(
    imageUri: string,
    width: number,
    height: number,
    segmentationMode: SegmentationMode
  ): Promise<ProcessedImage | null> {
    try {
      if (segmentationMode === SegmentationMode.AUTOMATIC) {
        return await this.processWithAutomaticSegmentation(imageUri, width, height);
      } else {
        return await this.processWithManualSegmentation(imageUri, width, height);
      }
    } catch (error) {
      console.error('Erro no processamento da imagem:', error);
      return null;
    }
  }

  // Processamento automático de imagem usando OpenCV
  private async processWithAutomaticSegmentation(
    imageUri: string,
    width: number,
    height: number
  ): Promise<ProcessedImage | null> {
    try {
      console.log('Iniciando segmentação automática...');
      
      // Detectar paredes usando OpenCV
      const result = await detectWalls(imageUri);
      
      if (!result) {
        throw new Error('Falha na detecção automática de paredes');
      }
      
      const { maskUri, processedImage } = result;
      
      return {
        originalUri: imageUri,
        processedUri: processedImage,
        maskUri,
        width,
        height,
      };
    } catch (error) {
      console.error('Erro na segmentação automática:', error);
      return null;
    }
  }

  // Processamento com segmentação manual (o usuário marca a área)
  private async processWithManualSegmentation(
    imageUri: string,
    width: number,
    height: number
  ): Promise<ProcessedImage | null> {
    try {
      console.log('Preparando para segmentação manual...');
      
      // Redimensionar a imagem para melhor desempenho
      const resizedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: Math.min(width, 800) } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      
      // No modo manual, não geramos uma máscara automática
      // Em vez disso, o usuário irá desenhar a máscara na tela
      return {
        originalUri: imageUri,
        processedUri: resizedImage.uri,
        width: resizedImage.width,
        height: resizedImage.height,
      };
    } catch (error) {
      console.error('Erro na preparação para segmentação manual:', error);
      return null;
    }
  }

  // Aplicar cor à imagem usando a máscara fornecida
  async applyColor(
    processedImage: ProcessedImage,
    colorRgb: { r: number; g: number; b: number },
    opacity: number = 0.7,
    customMaskUri?: string
  ): Promise<string | null> {
    try {
      const maskUri = customMaskUri || processedImage.maskUri;
      
      if (!maskUri) {
        throw new Error('Máscara não disponível para aplicação de cor');
      }
      
      const result = await applyColorToImage(
        processedImage.processedUri,
        maskUri,
        colorRgb,
        opacity
      );
      
      return result;
    } catch (error) {
      console.error('Erro na aplicação de cor:', error);
      return null;
    }
  }

  // Salvar a imagem processada
  async saveProcessedImage(imageUri: string): Promise<string | null> {
    try {
      const fileName = `processed_${Date.now()}.jpg`;
      const filePath = `${FileSystem.cacheDirectory}${fileName}`;
      
      await FileSystem.copyAsync({
        from: imageUri,
        to: filePath,
      });
      
      return filePath;
    } catch (error) {
      console.error('Erro ao salvar imagem processada:', error);
      return null;
    }
  }

  // Limpar arquivos temporários
  async cleanupTemporaryFiles(fileUris: string[]): Promise<void> {
    try {
      for (const uri of fileUris) {
        if (uri.startsWith(FileSystem.cacheDirectory || '')) {
          await FileSystem.deleteAsync(uri, { idempotent: true });
        }
      }
      console.log('Arquivos temporários limpos');
    } catch (error) {
      console.error('Erro ao limpar arquivos temporários:', error);
    }
  }
}

// Exportar instância do serviço
export const imageProcessingService = new ImageProcessingService();