import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  PanResponder,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Canvas, Path, useCanvasRef } from '@shopify/react-native-skia';
import { colors } from '../../../theme/colors';
import { SegmentationMode } from '../../../types';
import { rgbToString } from '../../imageProcessing/utils/colorUtils';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

interface ColorApplicationCanvasProps {
  imageUri: string;
  imageWidth: number;
  imageHeight: number;
  maskUri?: string;
  colorRgb: { r: number; g: number; b: number };
  opacity: number;
  segmentationMode: SegmentationMode;
  brushSize: number;
  onMaskUpdate?: (paths: string) => void;
}

export const ColorApplicationCanvas: React.FC<ColorApplicationCanvasProps> = ({
  imageUri,
  imageWidth,
  imageHeight,
  maskUri,
  colorRgb,
  opacity,
  segmentationMode,
  brushSize,
  onMaskUpdate,
}) => {
  // Calcular a escala da imagem para se ajustar à tela
  const scale = WINDOW_WIDTH / imageWidth;
  const scaledHeight = imageHeight * scale;

  // Estado para armazenar os paths de desenho manual
  const [paths, setPaths] = useState<{ path: string; width: number }[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  
  // Referência para o canvas
  const canvasRef = useCanvasRef();

  // Configurar o PanResponder para capturar os gestos de toque
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        // Iniciar um novo path
        setCurrentPath(`M${locationX} ${locationY}`);
      },
      onPanResponderMove: (evt) => {
        if (segmentationMode === SegmentationMode.MANUAL) {
          const { locationX, locationY } = evt.nativeEvent;
          // Adicionar um ponto ao path atual
          setCurrentPath((prev) => `${prev} L${locationX} ${locationY}`);
        }
      },
      onPanResponderRelease: () => {
        if (segmentationMode === SegmentationMode.MANUAL && currentPath) {
          // Finalizar o path atual e adicioná-lo à lista de paths
          setPaths((prev) => [...prev, { path: currentPath, width: brushSize }]);
          setCurrentPath('');
          
          // Notificar a atualização da máscara, se necessário
          if (onMaskUpdate) {
            onMaskUpdate(currentPath);
          }
        }
      },
    })
  ).current;

  // Efeito para limpar os paths quando o modo de segmentação muda
  useEffect(() => {
    if (segmentationMode === SegmentationMode.AUTOMATIC) {
      setPaths([]);
      setCurrentPath('');
    }
  }, [segmentationMode]);
  
  // Renderizar o componente
  return (
    <View style={styles.container}>
      {/* Imagem original como plano de fundo */}
      <Image
        source={{ uri: imageUri }}
        style={[
          styles.image,
          {
            width: WINDOW_WIDTH,
            height: scaledHeight,
          },
        ]}
        resizeMode="contain"
      />
      
      {/* Camada de cor com máscara (Modo automático) */}
      {segmentationMode === SegmentationMode.AUTOMATIC && maskUri && (
        <View
          style={[
            styles.overlay,
            {
              width: WINDOW_WIDTH,
              height: scaledHeight,
              backgroundColor: rgbToString(colorRgb, opacity),
            },
          ]}
        >
          <Image
            source={{ uri: maskUri }}
            style={[
              styles.mask,
              {
                width: WINDOW_WIDTH,
                height: scaledHeight,
              },
            ]}
            resizeMode="contain"
          />
        </View>
      )}
      
      {/* Canvas para desenho manual (Modo manual) */}
      {segmentationMode === SegmentationMode.MANUAL && (
        <View
          style={[
            styles.canvasContainer,
            {
              width: WINDOW_WIDTH,
              height: scaledHeight,
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Canvas
            ref={canvasRef}
            style={styles.canvas}
          >
            {/* Renderizar os paths salvos */}
            {paths.map((pathData, index) => (
              <Path
                key={index}
                path={pathData.path}
                strokeWidth={pathData.width}
                style="stroke"
                color={rgbToString(colorRgb, opacity)}
              />
            ))}
            
            {/* Renderizar o path atual */}
            {currentPath ? (
              <Path
                path={currentPath}
                strokeWidth={brushSize}
                style="stroke"
                color={rgbToString(colorRgb, opacity)}
              />
            ) : null}
          </Canvas>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    backgroundColor: colors.black,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  mask: {
    backgroundColor: 'transparent',
  },
  canvasContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  canvas: {
    flex: 1,
  },
});