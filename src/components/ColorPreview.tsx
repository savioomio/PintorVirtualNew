import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Color } from '../types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface ColorPreviewProps {
  color: Color;
  size?: number;
  showName?: boolean;
  isSelected?: boolean;
  onPress?: () => void;
}

export const ColorPreview: React.FC<ColorPreviewProps> = ({
  color,
  size = 40,
  showName = false,
  isSelected = false,
  onPress,
}) => {
  const isColorDark = isDarkColor(color.rgb);
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={!onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View style={[
        styles.colorCircle,
        { 
          backgroundColor: color.hex, 
          width: size, 
          height: size,
          borderWidth: isSelected ? 3 : 0,
        }
      ]}>
        {isSelected && (
          <View style={[
            styles.checkmark,
            { borderColor: isColorDark ? colors.white : colors.black }
          ]} />
        )}
      </View>
      
      {showName && (
        <Text style={styles.colorName} numberOfLines={1}>
          {color.name}
        </Text>
      )}
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
    alignItems: 'center',
  },
  colorCircle: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary,
  },
  colorName: {
    ...typography.caption,
    marginTop: spacing.xs,
    maxWidth: 80,
    textAlign: 'center',
  },
  checkmark: {
    width: 12,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '-45deg' }],
  },
});