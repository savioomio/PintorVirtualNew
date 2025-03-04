export const colors = {
    // Cores primárias
    primary: '#007AFF',
    primaryDark: '#0062CC',
    primaryLight: '#4D9FFF',

    // Cores secundárias
    secondary: '#5AC8FA',
    secondaryDark: '#48A1C8',
    secondaryLight: '#7DD6FB',

    // Cores de fundo
    background: '#FFFFFF',
    surface: '#F2F2F7',
    card: '#FFFFFF',

    // Texto
    text: '#000000',
    textSecondary: '#8E8E93',
    textTertiary: '#C7C7CC',

    // Estados
    success: '#34C759',
    warning: '#FFCC00',
    error: '#FF3B30',
    info: '#5AC8FA',

    // Outros
    border: '#CECED2',
    disabled: '#E5E5EA',
    transparent: 'transparent',
    overlay: 'rgba(0, 0, 0, 0.5)',

    // Preto e branco
    white: '#FFFFFF',
    black: '#000000',
};

export type ColorName = keyof typeof colors;