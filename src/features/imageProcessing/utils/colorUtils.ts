// Converter RGB para string CSS
export const rgbToString = (rgb: { r: number; g: number; b: number }, alpha: number = 1): string => {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};

// Converter hexadecimal para RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    // Remover # se existir
    const cleanHex = hex.charAt(0) === '#' ? hex.substring(1) : hex;

    // Converter hex para decimal
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);

    return { r, g, b };
};

// Converter RGB para hexadecimal
export const rgbToHex = (rgb: { r: number; g: number; b: number }): string => {
    return '#' +
        componentToHex(rgb.r) +
        componentToHex(rgb.g) +
        componentToHex(rgb.b);
};

// Auxiliar para converter componente para hex
const componentToHex = (c: number): string => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
};

// Calcular cor complementar
export const getComplementaryColor = (rgb: { r: number; g: number; b: number }): { r: number; g: number; b: number } => {
    return {
        r: 255 - rgb.r,
        g: 255 - rgb.g,
        b: 255 - rgb.b,
    };
};

// Calcular cor mais clara
export const getLighterColor = (rgb: { r: number; g: number; b: number }, amount: number = 0.3): { r: number; g: number; b: number } => {
    return {
        r: Math.min(255, rgb.r + (255 - rgb.r) * amount),
        g: Math.min(255, rgb.g + (255 - rgb.g) * amount),
        b: Math.min(255, rgb.b + (255 - rgb.b) * amount),
    };
};

// Calcular cor mais escura
export const getDarkerColor = (rgb: { r: number; g: number; b: number }, amount: number = 0.3): { r: number; g: number; b: number } => {
    return {
        r: Math.max(0, rgb.r * (1 - amount)),
        g: Math.max(0, rgb.g * (1 - amount)),
        b: Math.max(0, rgb.b * (1 - amount)),
    };
};

// Verificar se uma cor é escura (útil para determinar a cor do texto)
export const isDarkColor = (rgb: { r: number; g: number; b: number }): boolean => {
    // Fórmula YIQ para determinar o brilho percebido
    const yiq = ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
    return yiq < 128;
};