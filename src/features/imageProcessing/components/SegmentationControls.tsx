import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { SegmentationMode } from '../../../types';

interface SegmentationControlsProps {
  mode: SegmentationMode;
  opacity: number;
  brushSize?: number;
  onModeChange: (mode: SegmentationMode) => void;
  onOpacityChange: (value: number) => void;
  onBrushSizeChange?: (value: number) => void;
  onReset: () => void;
}

export const SegmentationControls: React.FC<SegmentationControlsProps> = ({
  mode,
  opacity,
  brushSize = 20,
  onModeChange,
  onOpacityChange,
  onBrushSizeChange,
  onReset,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.modeContainer}>
        <Text style={styles.label}>Modo:</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              mode === SegmentationMode.AUTOMATIC && styles.activeButton,
            ]}
            onPress={() => onModeChange(SegmentationMode.AUTOMATIC)}
          >
            <Text
              style={[
                styles.buttonText,
                mode === SegmentationMode.AUTOMATIC && styles.activeButtonText,
              ]}
            >
              Automático
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.modeButton,
              mode === SegmentationMode.MANUAL && styles.activeButton,
            ]}
            onPress={() => onModeChange(SegmentationMode.MANUAL)}
          >
            <Text
              style={[
                styles.buttonText,
                mode === SegmentationMode.MANUAL && styles.activeButtonText,
              ]}
            >
              Manual
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Opacidade: {Math.round(opacity * 100)}%</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.1}
          maximumValue={1.0}
          step={0.05}
          value={opacity}
          onValueChange={onOpacityChange}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={colors.primary}
        />
      </View>
      
      {mode === SegmentationMode.MANUAL && onBrushSizeChange && (
        <View style={styles.sliderContainer}>
          <Text style={styles.label}>Tamanho do Pincel: {brushSize}</Text>
          <Slider
            style={styles.slider}
            minimumValue={5}
            maximumValue={50}
            step={1}
            value={brushSize}
            onValueChange={onBrushSizeChange}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.border}
            thumbTintColor={colors.primary}
          />
        </View>
      )}
      
      <TouchableOpacity style={styles.resetButton} onPress={onReset}>
        <Text style={styles.resetButtonText}>Limpar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
  },
  modeContainer: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.body,
    marginBottom: spacing.xs,
    color: colors.text,
  },
  buttonGroup: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  modeButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    ...typography.body,
    color: colors.text,
  },
  activeButtonText: {
    color: colors.white,
  },
  sliderContainer: {
    marginBottom: spacing.md,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  resetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  resetButtonText: {
    ...typography.body,
    color: colors.error,
  },
});