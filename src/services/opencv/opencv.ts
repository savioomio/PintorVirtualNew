// Define o tipo para a API global do OpenCV
declare global {
    interface Window {
      cv: any;
    }
  }
  
  /**
   * Promessa que carrega o OpenCV.js e resolve quando estiver pronto para uso
   * No ambiente React Native, isso funcionará em conjunto com o OpenCVBridge
   */
  export default function loadOpenCV(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        // Verificar se a bridge do OpenCV já está carregada pela WebView
        // A comunicação real será feita pela WebView bridge
        if (typeof window !== 'undefined' && window.cv) {
          console.log('OpenCV já está carregado');
          resolve(window.cv);
          return;
        }
  
        // Simular a interface do OpenCV quando estamos em React Native
        // Os métodos reais serão implementados pela WebView bridge
        const mockOpenCV = {
          loaded: true,
          version: '4.5.5',
          
          // Métodos de inicialização
          getBuildInformation: () => 'React Native OpenCV Bridge',
          
          // Tipos básicos
          Mat: function() { return {}; },
          MatVector: function() { return {
            size: () => 0,
            get: (i: number) => ({}),
            delete: () => {}
          }; },
          Size: function(width: number, height: number) { return { width, height }; },
          Scalar: function(v1: number, v2?: number, v3?: number, v4?: number) { 
            return { v1, v2, v3, v4 }; 
          },
          
          // Constantes comuns
          IMREAD_COLOR: 1,
          IMREAD_GRAYSCALE: 0,
          MORPH_RECT: 0,
          MORPH_CLOSE: 3,
          COLOR_RGBA2GRAY: 11,
          COLOR_BGR2HSV: 40,
          COLOR_HSV2BGR: 54,
          CV_8UC1: 0,
          CV_8UC3: 16,
          RETR_EXTERNAL: 0,
          CHAIN_APPROX_SIMPLE: 1,
          
          // Métodos que serão substituídos pela implementação real na bridge
          imdecode: () => ({}),
          cvtColor: () => {},
          GaussianBlur: () => {},
          Canny: () => {},
          dilate: () => {},
          findContours: () => {},
          drawContours: () => {},
          contourArea: () => 0,
          arcLength: () => 0,
          approxPolyDP: () => {},
          morphologyEx: () => {},
          getStructuringElement: () => ({}),
          split: () => {},
          merge: () => {},
          addWeighted: () => {},
        };
  
        console.log('OpenCV mock carregado para React Native');
        resolve(mockOpenCV);
      } catch (error) {
        console.error('Erro ao carregar OpenCV:', error);
        reject(error);
      }
    });
  }
  
  /**
   * Converte uma imagem Base64 para um formato que o OpenCV pode processar
   */
  export const base64ToImageData = async (base64: string): Promise<ImageData> => {
    return new Promise((resolve, reject) => {
      try {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Não foi possível obter contexto 2D do canvas'));
            return;
          }
          
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          resolve(imageData);
        };
        
        img.onerror = (e) => {
          reject(new Error('Erro ao carregar imagem: ' + e));
        };
        
        img.src = `data:image/jpeg;base64,${base64}`;
      } catch (error) {
        reject(error);
      }
    });
  };