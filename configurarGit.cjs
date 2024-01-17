const fs = require('fs');
const { execSync } = require('child_process');

// Contenido del archivo .gitattributes
const gitAttributesContent = '* text=auto\n';

// Ruta del archivo .gitattributes
const gitAttributesPath = '.gitattributes';

// Crea el archivo .gitattributes y escribe el contenido
fs.writeFileSync(gitAttributesPath, gitAttributesContent);

// Añade y hace commit del archivo .gitattributes
execSync(`git add ${gitAttributesPath}`);
execSync(`git commit -m "Agregar archivo .gitattributes para gestionar fin de línea"`);

console.log('Configuración de fin de línea añadida con éxito.');

if (hasChanges) {
    // Añade y hace commit del archivo .gitattributes
    execSync(`git add ${gitAttributesPath}`);
    execSync(`git commit -m "Agregar archivo .gitattributes para gestionar fin de línea"`);
    console.log('Configuración de fin de línea añadida con éxito.');
} else {
    console.log('No hay cambios para commitear.');
}