import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { colors } from './src/theme/colors';
import { typography } from './src/theme/typography';
import { spacing } from './src/theme/spacing';
import { opencvManager } from './src/services/opencv/opencvManager';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Inicializar o módulo de processamento de imagem
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Aguardar um pequeno tempo para simular o carregamento
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Inicializar o módulo de processamento
        const initialized = await opencvManager.initialize();
        
        if (!initialized) {
          setLoadError('Falha ao inicializar o módulo de processamento. Por favor, reinicie o aplicativo.');
        }
      } catch (error) {
        console.error('Erro ao inicializar o aplicativo:', error);
        setLoadError('Erro ao inicializar o aplicativo. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Tela de carregamento inicial
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
        <Text style={styles.loadingSubtext}>Inicializando módulos de processamento</Text>
      </View>
    );
  }

  // Tela de erro
  if (loadError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Ops! Algo deu errado.</Text>
        <Text style={styles.errorSubtext}>{loadError}</Text>
      </View>
    );
  }

  // Renderizar o aplicativo
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // Estilos existentes mantidos aqui
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  loadingText: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  loadingSubtext: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: '80%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.lg,
  },
  errorText: {
    ...typography.h2,
    color: colors.error,
    marginBottom: spacing.md,
  },
  errorSubtext: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: '80%',
  },
});