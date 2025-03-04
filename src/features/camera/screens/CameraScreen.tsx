import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar} from 'react-native';
import { CameraComponent } from '../components/CameraComponent';
import { CapturedImage } from '../components/CapturedImage';
import { Header } from '../../../components/Header';
import { colors } from '../../../theme/colors';
import { NavigationProps, Routes } from '../../../types/navigation';
import { opencvManager } from '../../../services/opencv/opencvManager';
import { Loading } from '../../../components/Loading';

export const CameraScreen: React.FC<NavigationProps<Routes.CAMERA>> = ({
  navigation,
}) => {
  const [capturedImage, setCapturedImage] = useState<{
    uri: string;
    width: number;
    height: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // Inicializar o módulo de processamento de imagem
  useEffect(() => {
    const initializeImageProcessing = async () => {
      setIsLoading(true);
      setLoadingMessage('Carregando módulos de processamento...');
      
      try {
        await opencvManager.initialize();
      } catch (error) {
        console.error('Erro ao inicializar processamento de imagem:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeImageProcessing();
  }, []);

  const handleCapture = (uri: string, width: number, height: number) => {
    setCapturedImage({ uri, width, height });
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleContinue = () => {
    if (capturedImage) {
      navigation.navigate(Routes.COLOR_SELECTION, {
        imageUri: capturedImage.uri,
        imageWidth: capturedImage.width,
        imageHeight: capturedImage.height,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {capturedImage ? (
        <CapturedImage
          imageUri={capturedImage.uri}
          imageWidth={capturedImage.width}
          imageHeight={capturedImage.height}
          onRetake={handleRetake}
          onContinue={handleContinue}
        />
      ) : (
        <>
          <Header
            title="Capturar Parede"
            backgroundColor="rgba(0, 0, 0, 0.5)"
          />
          <CameraComponent onCapture={handleCapture} />
        </>
      )}
      
      <Loading visible={isLoading} message={loadingMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
});