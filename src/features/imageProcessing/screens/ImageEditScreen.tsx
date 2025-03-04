import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Alert, Share } from 'react-native';
import { NavigationProps, Routes } from '../../../types/navigation';
import { Header } from '../../../components/Header';
import { Button } from '../../../components/Button';
import { ImageEditor } from '../components/ImageEditor';
import { Loading } from '../../../components/Loading';
import { ProcessedImage } from '../../../types/image';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { ColorPreview } from '../../../components/ColorPreview';
import { imageProcessingService } from '../services/imageProcessingService';

export const ImageEditScreen: React.FC<NavigationProps<Routes.IMAGE_EDIT>> = ({
  navigation,
  route,
}) => {
  const { imageUri, imageWidth, imageHeight, selectedColor } = route.params;
  
  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<string>('Preparando imagem...');
  
  // Estado para armazenar a imagem processada
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);
  
  // Estado para armazenar a URI da imagem final
  const [resultImageUri, setResultImageUri] = useState<string | null>(null);
  
  // Efeito para processar a imagem ao carregar a tela
  useEffect(() => {
    const processImage = async () => {
      setIsLoading(true);
      setLoadingMessage('Preparando imagem...');
      
      try {
        const result = await imageProcessingService.processImage(
          imageUri,
          imageWidth,
          imageHeight,
          // Começar com segmentação automática
          'automatic'
        );
        
        if (result) {
          setProcessedImage(result);
        } else {
          Alert.alert(
            'Erro',
            'Houve um problema ao processar a imagem. Tente novamente.'
          );
          navigation.goBack();
        }
      } catch (error) {
        console.error('Erro ao processar imagem:', error);
        Alert.alert(
          'Erro',
          'Houve um problema ao processar a imagem. Tente novamente.'
        );
        navigation.goBack();
      } finally {
        setIsLoading(false);
      }
    };
    
    processImage();
  }, [imageUri, imageWidth, imageHeight, navigation]);
  
  // Função para voltar à tela anterior
  const handleBack = () => {
    navigation.goBack();
  };
  
  // Função para salvar a imagem processada
  const handleSave = async (savedImageUri: string) => {
    setIsLoading(true);
    setLoadingMessage('Salvando imagem...');
    
    try {
      setResultImageUri(savedImageUri);
      setLoadingMessage('Imagem salva com sucesso!');
      
      // Simulação de espera para mostrar a mensagem de sucesso
      setTimeout(() => {
        setIsLoading(false);
        
        // Mostrar opções ao usuário
        Alert.alert(
          'Imagem Salva',
          'O que você deseja fazer agora?',
          [
            {
              text: 'Compartilhar',
              onPress: () => handleShare(savedImageUri),
            },
            {
              text: 'Nova Foto',
              onPress: () => navigation.navigate(Routes.CAMERA),
            },
            {
              text: 'OK',
              style: 'cancel',
            },
          ]
        );
      }, 1000);
    } catch (error) {
      console.error('Erro ao salvar imagem:', error);
      setIsLoading(false);
      Alert.alert(
        'Erro',
        'Houve um problema ao salvar a imagem. Tente novamente.'
      );
    }
  };
  
  // Função para compartilhar a imagem
  const handleShare = async (uri: string) => {
    try {
      const result = await Share.share({
        url: uri,
        title: 'Minha Parede Simulada',
        message: 'Veja como ficou minha parede com a cor ' + selectedColor.name,
      });
      
      if (result.action === Share.sharedAction) {
        console.log('Imagem compartilhada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao compartilhar imagem:', error);
      Alert.alert(
        'Erro',
        'Houve um problema ao compartilhar a imagem. Tente novamente.'
      );
    }
  };
  
  // Renderizar o componente
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Simular Cor"
        leftIcon={<Text style={styles.backButton}>←</Text>}
        onLeftPress={handleBack}
        rightIcon={
          <ColorPreview
            color={selectedColor}
            size={30}
            isSelected={false}
          />
        }
      />
      
      {processedImage && (
        <View style={styles.editorContainer}>
          <ImageEditor
            image={processedImage}
            selectedColor={selectedColor}
            onSave={handleSave}
          />
        </View>
      )}
      
      <View style={styles.footer}>
        <Button
          title="Salvar"
          onPress={() => processedImage && handleSave(processedImage.processedUri)}
          fullWidth
          disabled={isLoading || !processedImage}
        />
      </View>
      
      <Loading visible={isLoading} message={loadingMessage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  editorContainer: {
    flex: 1,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  backButton: {
    fontSize: 24,
    color: colors.primary,
  },
});