import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ColorApplicationCanvas } from './ColorApplicationCanvas';
import { SegmentationControls } from './SegmentationControls';
import { ProcessedImage } from '../../../types/image';
import { Color, SegmentationMode } from '../../../types';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { imageProcessingService } from '../services/imageProcessingService';

interface ImageEditorProps {
  image: ProcessedImage;
  selectedColor: Color;
  onSave?: (resultImageUri: string) => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({
  image,
  selectedColor,
  onSave,
}) => {
  // Estado para controlar o modo de segmentação
  const [segmentationMode, setSegmentationMode] = useState<SegmentationMode>(
    SegmentationMode.AUTOMATIC
  );
  
  // Estado para controlar a opacidade da cor
  const [opacity, setOpacity] = useState<number>(0.7);
  
  // Estado para controlar o tamanho do pincel (modo manual)
  const [brushSize, setBrushSize] = useState<number>(20);
  
  // Estado para armazenar os paths de desenho manual
  const [manualMaskPaths, setManualMaskPaths] = useState<string[]>([]);
  
  // Estado para armazenar a imagem processada
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);
  
  // Efeito para processar a imagem quando o modo de segmentação muda
  useEffect(() => {
    const processImage = async () => {
      const result = await imageProcessingService.processImage(
        image.originalUri,
        image.width,
        image.height,
        segmentationMode
      );
      
      if (result) {
        setProcessedImage(result);
      }
    };
    
    processImage();
  }, [segmentationMode, image]);
  
  // Função para atualizar a máscara manual
  const handleMaskUpdate = (path: string) => {
    setManualMaskPaths((prev) => [...prev, path]);
  };
  
  // Função para limpar a máscara manual
  const handleReset = () => {
    setManualMaskPaths([]);
  };
  
  // Função para salvar a imagem processada
  const handleSave = async () => {
    if (processedImage && onSave) {
      let resultUri = processedImage.processedUri;
      
      // Aplicar cor usando o serviço
      if (segmentationMode === SegmentationMode.AUTOMATIC) {
        const coloredImage = await imageProcessingService.applyColor(
          processedImage,
          selectedColor.rgb,
          opacity
        );
        
        if (coloredImage) {
          resultUri = coloredImage;
        }
      } else {
        // Em um app real, aqui converteríamos os paths em uma máscara
        // e aplicaríamos a cor usando OpenCV
        
        // Para o MVP, simulamos usando a URI original
        resultUri = processedImage.processedUri;
      }
      
      // Salvar a imagem final
      const savedImageUri = await imageProcessingService.saveProcessedImage(
        resultUri
      );
      
      if (savedImageUri) {
        onSave(savedImageUri);
      }
    }
  };
  
  // Renderizar o componente
  return (
    <View style={styles.container}>
      {processedImage && (
        <ScrollView bounces={false} style={styles.scrollView}>
          <View style={styles.canvasContainer}>
            <ColorApplicationCanvas
              imageUri={processedImage.processedUri}
              imageWidth={processedImage.width}
              imageHeight={processedImage.height}
              maskUri={processedImage.maskUri}
              colorRgb={selectedColor.rgb}
              opacity={opacity}
              segmentationMode={segmentationMode}
              brushSize={brushSize}
              onMaskUpdate={handleMaskUpdate}
            />
          </View>
        </ScrollView>
      )}
      
      <SegmentationControls
        mode={segmentationMode}
        opacity={opacity}
        brushSize={brushSize}
        onModeChange={setSegmentationMode}
        onOpacityChange={setOpacity}
        onBrushSizeChange={setBrushSize}
        onReset={handleReset}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  canvasContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
});