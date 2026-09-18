# Chief Trailers del Norte — sitio web

Sitio en [Next.js](https://nextjs.org) con animaciones de GSAP, scroll suave con Lenis y visor 3D con React Three Fiber.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

> Los archivos grandes (fotos originales, modelos 3D, CAD) están en Git LFS. Después de clonar: `git lfs install && git lfs pull`.

## Estructura del material

```
assets-src/            Material fuente, NO se publica en el sitio (Git LFS)
  fotos/               Fotos originales de Chief, en resolución completa y sin modificar
  models/              Modelos 3D originales (.glb exportados de SolidWorks)
    cad/               Archivos CAD (.STEP / .STL)
  marca/               Logotipos originales
  renders/             Renders estáticos del modelo 3D (sin uso actual)
  referencias/         Imágenes de referencia que no son de Chief (stock)
docs/                  Brief del proyecto y mockups de referencia
public/                Lo que sí se publica
  fotos/               Versiones web de las fotos (generadas, no editar a mano)
  models/              Modelos 3D optimizados para web
scripts/               Scripts para generar las versiones web
src/data/              Catálogo de productos y manifiesto de fotos
```

### Agregar o cambiar fotos

1. Copia la foto original (sin comprimir) a `assets-src/fotos/` con un nombre descriptivo, por ejemplo `chief-dolly-amarillo.jpg`.
2. Genera las versiones web (WebP de 1200 y 2400 px, calidad alta):

   ```bash
   npm run optimize:photos
   ```

3. Úsala en un producto desde `src/data/catalog.ts`:

   ```ts
   photo: { name: 'chief-dolly-amarillo', position: '50% 60%' },
   ```

   `position` ajusta el encuadre dentro de las tarjetas (como `object-position` en CSS).

### Agregar un modelo 3D

1. Guarda el `.glb` exportado de SolidWorks en `assets-src/models/`.
2. Revisa los materiales para identificar la pintura del chasis:

   ```bash
   npx @gltf-transform/cli inspect assets-src/models/archivo.glb
   ```

3. Genera la versión web indicando el índice del material de pintura:

   ```bash
   npm run optimize:model -- assets-src/models/archivo.glb public/models/nombre.glb --paint 0
   ```

4. Agrega `model: { path: '/models/nombre.glb', defaultColor: '#E31E24' }` al producto en `src/data/catalog.ts`.

## Docker

```bash
docker compose up --build -d
```

El contenedor escucha en el puerto `3000` y se publica en `http://localhost:3001`. Para usar otro puerto:

```bash
CHIEF_WEB_PORT=3002 docker compose up --build -d
```

Para detenerlo: `docker compose down`.
