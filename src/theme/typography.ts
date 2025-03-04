import { Platform } from 'react-native';

export const fontFamily = {
  regular: Platform.OS === 'ios' ? 'System' : 'Roboto',
  medium: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
  bold: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
};

export const fontWeight = {
  normal: '400',
  medium: '600',
  bold: '700',
} as const;

export type FontWeight = keyof typeof fontWeight;
export type FontSize = keyof typeof fontSize;

export const typography = {
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  h3: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.md,
    fontWeight: fontWeight.normal,
  },
  bodySmall: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
  },
  button: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.normal,
  },
};

export type TypographyName = keyof typeof typography;