import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
  ...rest
}) => {
  // Determinar estilos com base na variante
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? colors.disabled : colors.primary,
          borderWidth: 0,
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? colors.disabled : colors.secondary,
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: colors.transparent,
          borderWidth: 1,
          borderColor: disabled ? colors.disabled : colors.primary,
        };
      default:
        return {};
    }
  };

  // Determinar estilos com base no tamanho
  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.md,
        };
      case 'medium':
        return {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.lg,
        };
      case 'large':
        return {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xl,
        };
      default:
        return {};
    }
  };

  // Determinar estilos de texto
  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return {
          color: colors.white,
        };
      case 'outline':
        return {
          color: disabled ? colors.textTertiary : colors.primary,
        };
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[
        styles.button,
        getVariantStyle(),
        getSizeStyle(),
        fullWidth && styles.fullWidth,
        style,
      ]}
      activeOpacity={0.7}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'outline' ? colors.primary : colors.white}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.text,
            getTextStyle(),
            size === 'small' && { fontSize: typography.bodySmall.fontSize },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    ...typography.button,
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});