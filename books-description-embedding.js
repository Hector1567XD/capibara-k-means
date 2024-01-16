const FastText = require('fasttext.js');
const path = require('path');

// Función para cargar el modelo y obtener el vector de un texto
async function getVectorFromText(text) {
  // Ruta del modelo
  const modelPath = path.resolve(__dirname, './cc.es.300.bin');

  // Crear instancia de FastText
  const fastText = new FastText({
    loadModel: modelPath,
  });

  console.log('pre-load')
  // Cargar el modelo
  await fastText.load();
  console.log('post-load')

  // Obtener el vector del texto proporcionado
  const vector = await fastText.getVector(text);

  return vector;
}

// Ejemplo de uso
const textoEjemplo = 'Esto es un ejemplo de texto';
getVectorFromText(textoEjemplo)
  .then(vector => {
    console.log('Vector del texto:', vector);
  })
  .catch(error => {
    console.error('Error:', error);
  });
