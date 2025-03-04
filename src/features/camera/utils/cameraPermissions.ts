import { Camera } from 'expo-camera';
import { Alert, Linking } from 'react-native';

export const requestCameraPermission = async (): Promise<boolean> => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  
  if (status === 'granted') {
    return true;
  }
  
  Alert.alert(
    'Permissão de Câmera',
    'Precisamos de acesso à sua câmera para capturar imagens das paredes.',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Abrir Configurações',
        onPress: () => Linking.openSettings(),
      },
    ]
  );
  
  return false;
};

export const checkCameraPermission = async (): Promise<boolean> => {
  const { status } = await Camera.getCameraPermissionsAsync();
  return status === 'granted';
};