import React from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import { NavigationProps, Routes } from '../../../types/navigation';
import { Button } from '../../../components/Button';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import * as ImagePicker from 'expo-image-picker';

export const HomeScreen: React.FC<NavigationProps<Routes.HOME>> = ({
  navigation,
}) => {
  // Função para navegar para a tela da câmera
  const handleOpenCamera = () => {
    navigation.navigate(Routes.CAMERA);
  };

  // Função para selecionar uma imagem da galeria
  const handleSelectImage = async () => {
    try {
      // Solicitar permissão para acessar a galeria
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Precisamos de permissão para acessar suas fotos');
        return;
      }
      
      // Abrir o seletor de imagens
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        // Navegar para a seleção de cores com a imagem selecionada
        navigation.navigate(Routes.COLOR_SELECTION, {
          imageUri: selectedImage.uri,
          imageWidth: selectedImage.width || 800, // Valor padrão caso width não esteja disponível
          imageHeight: selectedImage.height || 600, // Valor padrão caso height não esteja disponível
        });
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      alert('Não foi possível selecionar a imagem. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>NovaFlex</Text>
          <Text style={styles.tagline}>Transforme suas paredes virtualmente</Text>
        </View>
        
        {/* Botões */}
        <View style={styles.buttonContainer}>
          <Button
            title="Tirar Foto"
            onPress={handleOpenCamera}
            fullWidth
            size="large"
            style={styles.button}
          />
          
          <Button
            title="Selecionar da Galeria"
            onPress={handleSelectImage}
            variant="outline"
            fullWidth
            size="large"
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl * 2,
  },
  logoText: {
    ...typography.h1,
    fontSize: 42,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  tagline: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },
  button: {
    marginBottom: spacing.lg,
  },
});