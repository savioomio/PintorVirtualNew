import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Color } from '../../../types';
import { colors as themeColors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

interface ColorItemProps {
  color: Color;
  isSelected: boolean;
  onSelect: (color: Color) => void;
}

export const ColorItem: React.FC<ColorItemProps> = ({
  color,
  isSelected,
  onSelect,
}) => {
  const handlePress = () => {
    onSelect(color);
  };

  // Verificar se a cor é escura para ajustar o texto
  const isColorDark = isDarkColor(color.rgb);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.colorPreview,
          { backgroundColor: color.hex },
          isSelected && styles.selectedColorPreview,
        ]}
      >
        {isSelected && (
          <Text
            style={[
              styles.checkmark,
              { color: isColorDark ? themeColors.white : themeColors.black },
            ]}
          >
            ✓
          </Text>
        )}
      </View>
      
      <Text style={styles.colorName} numberOfLines={1} ellipsizeMode="tail">
        {color.name}
      </Text>
      
      <Text style={styles.colorHex}>
        {color.hex}
      </Text>
    </TouchableOpacity>
  );
};

// Função para determinar se uma cor é escura
function isDarkColor(rgb: { r: number; g: number; b: number }): boolean {
  // Fórmula YIQ para determinar o brilho percebido
  const yiq = ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
  return yiq < 128;
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: themeColors.surface,
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themeColors.border,
  },
  selectedContainer: {
    borderColor: themeColors.primary,
    borderWidth: 2,
  },
  colorPreview: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: themeColors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColorPreview: {
    borderColor: themeColors.primary,
    borderWidth: 2,
  },
  checkmark: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  colorName: {
    ...typography.body,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  colorHex: {
    ...typography.caption,
    color: themeColors.textSecondary,
  },
});