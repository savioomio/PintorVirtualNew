import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView } from 'react-native';
import { NavigationProps, Routes } from '../../../types/navigation';
import { Header } from '../../../components/Header';
import { Button } from '../../../components/Button';
import { ColorGrid } from '../components/ColorGrid';
import { Loading } from '../../../components/Loading';
import colors from '../data/colors';
import { Color } from '../../../types';
import { colors as themeColors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { getAdjustedImageDimensions } from '../../../utils';

export const ColorSelectionScreen: React.FC<
  NavigationProps<Routes.COLOR_SELECTION>
> = ({ navigation, route }) => {
  const { imageUri, imageWidth, imageHeight } = route.params;
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Calcular dimensões para exibir a imagem de preview
  const adjustedDimensions = getAdjustedImageDimensions(
    imageWidth, 
    imageHeight, 
    undefined, 
    200
  );

  // Selecionar uma cor
  const handleSelectColor = (color: Color) => {
    setSelectedColor(color);
  };

  // Continuar para a próxima tela
  const handleContinue = () => {
    if (selectedColor) {
      setIsLoading(true);
      
      // Simular um pequeno delay para mostrar o carregamento
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate(Routes.IMAGE_EDIT, {
          imageUri,
          imageWidth,
          imageHeight,
          selectedColor,
        });
      }, 500);
    }
  };

  // Voltar para a tela da câmera
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Escolha uma Cor"
        leftIcon={<Text style={styles.backButton}>←</Text>}
        onLeftPress={handleBack}
      />
      
      <View style={styles.previewContainer}>
        <Image
          source={{ uri: imageUri }}
          style={[
            styles.previewImage,
            {
              width: adjustedDimensions.width,
              height: adjustedDimensions.height,
            },
          ]}
          resizeMode="contain"
        />
        
        {selectedColor && (
          <View style={styles.selectedColorContainer}>
            <View
              style={[
                styles.colorSwatch,
                { backgroundColor: selectedColor.hex },
              ]}
            />
            <Text style={styles.colorName}>{selectedColor.name}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.gridContainer}>
        <ColorGrid
          colors={colors}
          selectedColor={selectedColor}
          onSelectColor={handleSelectColor}
        />
      </View>
      
      <View style={styles.footer}>
        <Button
          title="Continuar"
          onPress={handleContinue}
          disabled={!selectedColor}
          fullWidth
        />
      </View>
      
      <Loading visible={isLoading} message="Preparando simulação..." />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
  },
  previewContainer: {
    backgroundColor: themeColors.surface,
    padding: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: themeColors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewImage: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: themeColors.border,
  },
  gridContainer: {
    flex: 1,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: themeColors.border,
    backgroundColor: themeColors.background,
  },
  backButton: {
    fontSize: 24,
    color: themeColors.primary,
  },
  selectedColorContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  colorSwatch: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: themeColors.border,
    marginBottom: spacing.xs,
  },
  colorName: {
    ...typography.bodySmall,
    textAlign: 'center',
    maxWidth: 80,
  },
});