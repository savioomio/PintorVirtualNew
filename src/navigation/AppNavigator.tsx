import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes, RootStackParamList } from '../types/navigation';

// Screens
import { HomeScreen } from '../features/home/screens/HomeScreen';
import { CameraScreen } from '../features/camera/screens/CameraScreen';
import { ColorSelectionScreen } from '../features/colorCatalog/screens/ColorSelectionScreen';
import { ImageEditScreen } from '../features/imageProcessing/screens/ImageEditScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.HOME}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name={Routes.HOME}
          component={HomeScreen}
        />
        <Stack.Screen
          name={Routes.CAMERA}
          component={CameraScreen}
        />
        <Stack.Screen
          name={Routes.COLOR_SELECTION}
          component={ColorSelectionScreen}
        />
        <Stack.Screen
          name={Routes.IMAGE_EDIT}
          component={ImageEditScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};