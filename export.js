const fs = require('fs');
const path = require('path');

// Define la ruta al directorio principal del proyecto
const projectDirectory = path.resolve(__dirname, '..');

function exportFilesToText(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error al leer el directorio:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(
            `Error al obtener información sobre el archivo ${file}:`,
            err,
          );
          return;
        }

        if (stats.isFile()) {
          // Verificar si es un archivo
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              console.error(`Error al leer el archivo ${file}:`, err);
              return;
            }

            const outputFile = path.join(directory, `${file}.txt`);
            fs.writeFile(outputFile, data, (err) => {
              if (err) {
                console.error(`Error al escribir el archivo ${file}.txt:`, err);
                return;
              }
            });
          });
        }
      });
    });
  });
}

// Llama a la función para exportar archivos a texto, pasando la ruta del proyecto
exportFilesToText(projectDirectory);
