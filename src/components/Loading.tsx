import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Modal } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface LoadingProps {
  visible: boolean;
  message?: string;
  transparent?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  visible,
  message,
  transparent = false,
}) => {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
    >
      <View style={[
        styles.container,
        transparent && { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
      ]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          {message && <Text style={styles.message}>{message}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingContainer: {
    padding: spacing.lg,
    borderRadius: 8,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 120,
    minHeight: 120,
  },
  message: {
    ...typography.body,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});