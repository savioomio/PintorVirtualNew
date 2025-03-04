import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Color } from './index';

export enum Routes {
  HOME = 'Home',
  CAMERA = 'Camera',
  COLOR_SELECTION = 'ColorSelection',
  IMAGE_EDIT = 'ImageEdit'
}

export type RootStackParamList = {
  [Routes.HOME]: undefined;
  [Routes.CAMERA]: undefined;
  [Routes.COLOR_SELECTION]: {
    imageUri: string;
    imageWidth: number;
    imageHeight: number;
  };
  [Routes.IMAGE_EDIT]: {
    imageUri: string;
    imageWidth: number;
    imageHeight: number;
    selectedColor: Color;
  };
};

export type NavigationProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};