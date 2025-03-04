import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { Button } from '../../../components/Button';

interface CapturedImageProps {
  imageUri: string;
  imageWidth: number;
  imageHeight: number;
  onRetake: () => void;
  onContinue: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const CapturedImage: React.FC<CapturedImageProps> = ({
  imageUri,
  imageWidth,
  imageHeight,
  onRetake,
  onContinue,
}) => {
  // Calcular dimensões para exibir a imagem
  const aspectRatio = imageWidth / imageHeight;
  const displayWidth = SCREEN_WIDTH;
  const displayHeight = displayWidth / aspectRatio;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUri }}
        style={[
          styles.image,
          {
            width: displayWidth,
            height: displayHeight,
          },
        ]}
        resizeMode="contain"
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>Foto Capturada</Text>
        <Text style={styles.subtitle}>
          Esta parede está adequada para a simulação de cor?
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Tirar Outra"
            onPress={onRetake}
            variant="outline"
            style={styles.button}
          />
          <Button
            title="Continuar"
            onPress={onContinue}
            variant="primary"
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  image: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: spacing.lg,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    ...typography.h2,
    color: colors.white,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.white,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  button: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
});