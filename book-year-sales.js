const { kmeans } = require('ml-kmeans');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');

function formattDataToKMeans(books)  // [ [year, sales], [year, sales], ... ]
{  
    return books.map(book => [book.year, book.sales]);
}

async function execute() {

  // Datos de ejemplo
  const books = [ // [ { year: int, sales: int } ]
    { year: 2000, sales: 100 },
    { year: 2001, sales: 120 },
    { year: 2002, sales: 90 },
    { year: 2003, sales: 80 },
    { year: 2004, sales: 150 },
    { year: 2005, sales: 130 },
    { year: 2006, sales: 110 },
    { year: 2007, sales: 95 },
    // Datos que no iran creciendo en linea recta si no que se expandiran a lo largo de los 4 cuadrantes entre el eje x y y
    { year: 2010, sales: 100 },
    { year: 2011, sales: 120 },
    { year: 2012, sales: 90 },
    { year: 2013, sales: 80 },
    { year: 2014, sales: 150 },
    { year: 2015, sales: 130 },
    { year: 2016, sales: 110 },
    { year: 2017, sales: 95 },
    { year: 2020, sales: 100 },
    { year: 2021, sales: 120 },
    { year: 2022, sales: 90 },
    { year: 2023, sales: 80 },
    { year: 2024, sales: 150 },
    { year: 2025, sales: 130 },
    { year: 2026, sales: 110 },
    { year: 2027, sales: 95 },
    { year: 2030, sales: 100 },
    { year: 2031, sales: 120 },
    { year: 2032, sales: 90 },
    { year: 2033, sales: 80 },
    { year: 2034, sales: 150 },
    { year: 2035, sales: 130 },
    { year: 2036, sales: 110 },
    { year: 2037, sales: 95 },
    { year: 2040, sales: 100 },
    { year: 2041, sales: 120 },
    { year: 2042, sales: 90 },
    { year: 2043, sales: 80 },
    { year: 2044, sales: 150 },
    { year: 2045, sales: 130 },
    { year: 2046, sales: 110 },
    { year: 2047, sales: 95 },
    { year: 2050, sales: 100 },
    { year: 2051, sales: 120 },
    { year: 2052, sales: 90 },
    { year: 2053, sales: 80 },
    { year: 2054, sales: 150 },
    { year: 2055, sales: 130 },
    { year: 2056, sales: 110 },
  ];
      
  // Número de clústeres que deseamos encontrar
  const k = 3;
  const data = formattDataToKMeans(books);
  // Aplicar el algoritmo k-means
  const result = kmeans(data, k);
  console.log('data', data);
  // Imprimir los centroides y las asignaciones de clúster
  console.log('Centroides:', result.centroids);
  console.log('Clusteres:', result.clusters);

  // Crear un gráfico de dispersión con colores para los clústeres
  const configuration = getDrawConfiguration(data, result.centroids, result.clusters);

  // Crea el servicio de renderizado y genera el gráfico
  const canvasRenderService = new ChartJSNodeCanvas({ width: 800, height: 600, backgroundColour: 'white' });
  const image = canvasRenderService.renderToBufferSync(configuration);

  // Guarda la imagen en un archivo
  fs.writeFileSync('kmeans_year_sales_example-2024.png', image);

  console.log('Centroides y asignaciones guardados en kmeans_example.png');
}

execute()

function getDrawConfiguration(data, centroids, clusters) {

  const punticosADibujar = centroids.map((centroid, index) => {
    const clusterData = data.filter((point, i) => clusters[i] === index && i < clusters.length);
    return {
      label: `Cluster ${index + 1}`,
      data: clusterData.map(point => ({ x: point[0], y: point[1] })),
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.8)`,
    };
  });

  return {
    type: 'scatter',
    data: {
      datasets: [...punticosADibujar, {
        label: 'Centroides',
        data: centroids.map(centroid => ({ x: centroid[0], y: centroid[1] })),
        backgroundColor: 'black',
        pointRadius: 10,
      }]
    },
    options: {
      scales: {
        x: { type: 'linear', position: 'bottom', title: { display: true, text: 'Año de Publicación' } },
        y: { type: 'linear', position: 'left', title: { display: true, text: 'Ventas' } },
      },
    },
  };
}
