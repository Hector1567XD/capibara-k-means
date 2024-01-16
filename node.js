const { exec } = require('child_process');

// Ejemplo de datos de entrada
const inputData = {
  modelPath: './cc.es.300.bin',
  texts: [
      'Texto 1', 'Texto 2', 'Texto 3',
      "Gato comida", "Señor de los anillos", "Texto de muestra",
      "Hola mundo", "Texto de prueba", "Texto de ejemplo",
      "Texto 3 de prueba", "Texto 2 de ejemplo", "Texto de super prueba",
  ],
  nComponents: 10,
};

// Definir la constante para determinar qué script ejecutar
const applyDimensionalityReduction = false;

// Llamada al script de Python
let pythonScript;
if (applyDimensionalityReduction) {
  pythonScript = 'get-text-dim-vectors.py';
} else {
  pythonScript = 'get-text-vectors.py';
}

const pythonProcess = exec(`python3 ${pythonScript}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }

  const outputData = JSON.parse(stdout);
  console.log('Vectores resultantes:', outputData);
});

// Enviar datos de entrada al script de Python
pythonProcess.stdin.write(JSON.stringify(inputData));
pythonProcess.stdin.end();
