import { Color } from '../../../types';

// Função para converter hex para RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  // Remover # se existir
  const cleanHex = hex.charAt(0) === '#' ? hex.substring(1) : hex;
  
  // Converter hex para decimal
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  return { r, g, b };
};

// Lista de cores predefinidas para o MVP
export const colors: Color[] = [
  {
    id: '1',
    name: 'Branco Neve',
    hex: '#FFFFFF',
    rgb: hexToRgb('#FFFFFF')
  },
  {
    id: '2',
    name: 'Areia',
    hex: '#E8DCCA',
    rgb: hexToRgb('#E8DCCA')
  },
  {
    id: '3',
    name: 'Cinza Claro',
    hex: '#D3D3D3',
    rgb: hexToRgb('#D3D3D3')
  },
  {
    id: '4',
    name: 'Azul Sereno',
    hex: '#B0C4DE',
    rgb: hexToRgb('#B0C4DE')
  },
  {
    id: '5',
    name: 'Verde Sage',
    hex: '#AECFBA',
    rgb: hexToRgb('#AECFBA')
  },
  {
    id: '6',
    name: 'Amarelo Pastel',
    hex: '#FFFACD',
    rgb: hexToRgb('#FFFACD')
  },
  {
    id: '7',
    name: 'Coral Suave',
    hex: '#F08080',
    rgb: hexToRgb('#F08080')
  },
  {
    id: '8',
    name: 'Lavanda',
    hex: '#E6E6FA',
    rgb: hexToRgb('#E6E6FA')
  },
  {
    id: '9',
    name: 'Azul Marinho',
    hex: '#000080',
    rgb: hexToRgb('#000080')
  },
  {
    id: '10',
    name: 'Verde Floresta',
    hex: '#228B22',
    rgb: hexToRgb('#228B22')
  },
  {
    id: '11',
    name: 'Vermelho Tijolo',
    hex: '#B22222',
    rgb: hexToRgb('#B22222')
  },
  {
    id: '12',
    name: 'Cinza Chumbo',
    hex: '#708090',
    rgb: hexToRgb('#708090')
  },
  {
    id: '13',
    name: 'Terracota',
    hex: '#E2725B',
    rgb: hexToRgb('#E2725B')
  },
  {
    id: '14',
    name: 'Turquesa',
    hex: '#40E0D0',
    rgb: hexToRgb('#40E0D0')
  },
  {
    id: '15',
    name: 'Amarelo Mostarda',
    hex: '#FFDB58',
    rgb: hexToRgb('#FFDB58')
  },
  {
    id: '16',
    name: 'Rosa Antigo',
    hex: '#C08081',
    rgb: hexToRgb('#C08081')
  },
  {
    id: '17',
    name: 'Marsala',
    hex: '#955251',
    rgb: hexToRgb('#955251')
  },
  {
    id: '18',
    name: 'Verde Água',
    hex: '#66CDAA',
    rgb: hexToRgb('#66CDAA')
  },
  {
    id: '19',
    name: 'Azul Petróleo',
    hex: '#004E64',
    rgb: hexToRgb('#004E64')
  },
  {
    id: '20',
    name: 'Bege Neutro',
    hex: '#F5F5DC',
    rgb: hexToRgb('#F5F5DC')
  },
];

export default colors;