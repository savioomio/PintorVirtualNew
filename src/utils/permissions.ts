import { Camera } from 'expo-camera';
import { Alert, Linking, Platform } from 'react-native';

// Função para solicitar permissão da câmera
export const requestCameraPermission = async (): Promise<boolean> => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  
  if (status === 'granted') {
    return true;
  }
  
  if (status === 'denied') {
    Alert.alert(
      'Permissão necessária',
      'O aplicativo precisa de acesso à sua câmera para capturar imagens das paredes.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Configurações',
          onPress: () => Linking.openSettings(),
        },
      ]
    );
  }
  
  return false;
};

// Função para verificar a permissão da câmera
export const checkCameraPermission = async (): Promise<boolean> => {
  const { status } = await Camera.getCameraPermissionsAsync();
  return status === 'granted';
};

// Função para formatação específica do caminho do arquivo
export const getFileInfo = (uri: string) => {
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];
  
  let fileName = uri.split('/').pop() || `image-${Date.now()}.${fileType}`;
  
  // Adicionar prefixo file:// para iOS se não existir
  if (Platform.OS === 'ios' && !uri.startsWith('file://')) {
    uri = `file://${uri}`;
  }
  
  return {
    uri,
    name: fileName,
    type: `image/${fileType}`,
  };
};