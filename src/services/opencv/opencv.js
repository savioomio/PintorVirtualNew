// Carrega OpenCV.js de forma assíncrona
export default async function loadOpenCV() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('type', 'text/javascript');
        script.addEventListener('load', () => {
            if (cv.getBuildInformation) {
                console.log('OpenCV.js carregado com sucesso');
                resolve(cv);
            } else {
                // Esperar pelo CV
                var waitForCV = () => {
                    if (cv.getBuildInformation) {
                        console.log('OpenCV.js inicializado com sucesso');
                        resolve(cv);
                    } else {
                        console.log('Esperando OpenCV.js inicializar...');
                        setTimeout(waitForCV, 30);
                    }
                };
                waitForCV();
            }
        });
        script.addEventListener('error', () => {
            reject(new Error('Falha ao carregar OpenCV.js'));
        });
        script.src = 'https://docs.opencv.org/4.5.5/opencv.js';
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    });
}