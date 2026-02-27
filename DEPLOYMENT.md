# 🌐 Guía de Despliegue en GitHub Pages

Esta guía detalla cómo desplegar la interfaz de **Siemens Logic Bridge** en GitHub Pages.

> [!NOTE]
> GitHub Pages solo sirve contenido estático. La funcionalidad de base de datos (Backend) no funcionará en la versión online a menos que se despliegue en un servicio como Render o Railway. Sin embargo, la interfaz y el traductor funcionarán perfectamente.

## Pasos para el Despliegue

### 1. Configurar el Repositorio
Asegúrate de haber subido tu código a un repositorio en GitHub.

### 2. Preparar el Frontend
1. Ve a la carpeta `frontend/`.
2. Instala el paquete de despliegue:
   ```bash
   npm install --save-dev gh-pages
   ```
3. Edita el archivo `frontend/package.json` y añade:
   - `"homepage": "https://leohidalgovelasquez-max.github.io/Proyecto_SCL-IEC61131/",`
   - En `scripts`: `"predeploy": "npm run build", "deploy": "gh-pages -d dist"`

### 3. Ejecutar el Despliegue
Desde la raíz del proyecto, ejecuta:
```bash
npm run build --workspace=frontend
cd frontend
npm run deploy
```

### 4. Configurar en GitHub
1. Ve a los **Settings** de tu repositorio en GitHub.
2. En la sección **Pages**, asegúrate de que el origen sea la rama `gh-pages`.

---

## 🚀 Despliegue del Backend (Opcional)
Para que la base de datos funcione online:
1. Sube el código a **Render.com**.
2. Configura una instancia de Web Service para la carpeta `backend/`.
3. Actualiza la constante `API_BASE` en `App.tsx` con la URL de Render.
