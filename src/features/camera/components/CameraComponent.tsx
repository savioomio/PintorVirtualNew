import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native';
import { CameraView, CameraType, FlashMode, useCameraPermissions } from 'expo-camera';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

interface CameraComponentProps {
  onCapture: (uri: string, width: number, height: number) => void;
}

export const CameraComponent: React.FC<CameraComponentProps> = ({ onCapture }) => {
  // Utiliza o hook para gerenciar as permissões da câmera
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [flashMode, setFlashMode] = useState<FlashMode>('off');
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const cameraRef = useRef<any>(null);

  if (!permission) {
    // Enquanto as permissões não forem carregadas
    return <View />;
  }

  if (!permission.granted) {
    // Se a permissão não foi concedida, mostra uma mensagem e um botão para solicitar
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Sem acesso à câmera. Por favor, conceda permissão nas configurações.
        </Text>
        <Button title="Conceder permissão" onPress={requestPermission} />
      </View>
    );
  }

  const handleCapture = async () => {
    if (cameraRef.current && !isCapturing) {
      setIsCapturing(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        console.log('Foto capturada:', photo.uri);
        onCapture(photo.uri, photo.width, photo.height);
      } catch (error) {
        console.error('Erro ao capturar foto:', error);
      } finally {
        setIsCapturing(false);
      }
    }
  };

  const toggleCameraType = () => {
    setCameraType(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlashMode = () => {
    setFlashMode(current => (current === 'off' ? 'on' : 'off'));
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={cameraType}
        flash={flashMode}
        ratio="16:9"
      >
        <View style={styles.overlayTop}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleFlashMode}>
            <Text style={styles.controlText}>
              {flashMode === 'on' ? '🔦 ON' : '🔦 OFF'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={toggleCameraType}>
            <Text style={styles.controlText}>🔄</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.guideBox}>
          <Text style={styles.guideText}>Centralize a parede na imagem</Text>
        </View>

        <View style={styles.captureContainer}>
          <TouchableOpacity
            style={[
              styles.captureButton,
              isCapturing && styles.captureButtonDisabled,
            ]}
            onPress={handleCapture}
            disabled={isCapturing}
          >
            {isCapturing ? (
              <ActivityIndicator color={colors.white} size="small" />
            ) : null}
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  permissionText: {
    ...typography.body,
    textAlign: 'center',
    color: colors.error,
    marginBottom: spacing.md,
  },
  overlayTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  controlButton: {
    padding: spacing.sm,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  controlText: {
    color: colors.white,
    fontSize: 16,
  },
  guideBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  guideText: {
    ...typography.body,
    color: colors.white,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: spacing.sm,
    borderRadius: 5,
  },
  captureContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    borderWidth: 4,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonDisabled: {
    backgroundColor: colors.disabled,
  },
});