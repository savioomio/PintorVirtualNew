import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  backgroundColor?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  backgroundColor = colors.white,
}) => {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor, 
        paddingTop: Platform.OS === 'ios' ? insets.top : spacing.md,
      }
    ]}>
      <View style={styles.contentContainer}>
        <View style={styles.leftContainer}>
          {leftIcon && (
            <TouchableOpacity
              onPress={onLeftPress}
              disabled={!onLeftPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {leftIcon}
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        
        <View style={styles.rightContainer}>
          {rightIcon && (
            <TouchableOpacity
              onPress={onRightPress}
              disabled={!onRightPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    ...typography.h3,
    flex: 1,
    textAlign: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});