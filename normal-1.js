const kmeans = require('ml-kmeans');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');

async function execute() {
  // Datos de ejemplo
  const data = [
    [2, 3],
    [2, 2],
    [1, 2],
    [4, 5],
    [5, 5],
    [6, 6],
    [9, 8],
    [8, 7],
    [10, 8],
    [12.5, 13.5],
    [12.5, 12.5],
    [11.5, 12.5],
    [14.5, 15.5],
    [15.5, 15.5],
    [16.5, 16.5],
    [19.5, 18.5],
    [18.5, 17.5],
    [20.5, 18.5],
    [22.5, 23.5],
    [22.5, 22.5],
    [21.5, 22.5],
    [24.5, 25.5],
    [25.5, 25.5],
    [26.5, 26.5],
    [29.5, 28.5],
    [28.5, 27.5],
    [30.5, 28.5],
    [32.5, 33.5],
    [32.5, 32.5],
    [31.5, 32.5],
    [34.5, 35.5],
    [35.5, 35.5],
    [36.5, 36.5],
    [39.5, 38.5],
    [38.5, 37.5],
    [40.5, 38.5],
    [42.5, 43.5],
    [42.5, 42.5],
    [41.5, 42.5],
    [44.5, 45.5],
    [45.5, 45.5],
    [46.5, 46.5],
    [49.5, 48.5],
    [48.5, 47.5],
    [50.5, 48.5],
    [52.5, 53.5],
    [52.5, 52.5],
    [51.5, 52.5],
    [54.5, 55.5],
    [55.5, 55.5],
    [56.5, 56.5],
    [59.5, 58.5],
    [58.5, 57.5],
    [60.5, 58.5],
    [62.5, 63.5],
  ];

  // Número de clústeres que deseamos encontrar
  const k = 3;

  // Aplicar el algoritmo k-means
  const result = kmeans.kmeans(data, k);

  // Imprimir los centroides y las asignaciones de clúster
  console.log('Centroides:', result.centroids);
  console.log('Clusteres:', result.clusters);

  // Crear un gráfico de dispersión con colores para los clústeres
  const configuration = {
    type: 'scatter',
    data: {
      datasets: result.centroids.map((centroid, index) => {
        const clusterData = data.filter((point, i) => result.clusters[i] === index && i < result.clusters.length);
        return {
          label: `Cluster ${index + 1}`,
          data: clusterData.map(point => ({ x: point[0], y: point[1] })),
          backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`,
        };
      }),
    },
    options: {
      scales: {
        x: { type: 'linear', position: 'bottom' },
        y: { type: 'linear', position: 'left' },
      },
    },
  };

  // Crea el servicio de renderizado y genera el gráfico
  const canvasRenderService = new ChartJSNodeCanvas({ width: 800, height: 600, backgroundColour: 'white' });
  const image = canvasRenderService.renderToBufferSync(configuration);

  // Guarda la imagen en un archivo
  fs.writeFileSync('kmeans_normal_1_example.png', image);

  console.log('Centroides y asignaciones guardados en kmeans_example.png');
}

execute()
