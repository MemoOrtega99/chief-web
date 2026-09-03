# Brief de Producto — Sitio Web Chief Trailers del Norte

**Para:** Memo (Desarrollo) y David (Tecnología)
**De:** Alan
**Objetivo del documento:** contenido y estructura completa del sitio, lista para programar. Todo lo aquí definido ya fue validado con el cliente/dirección de marca — donde falta información puntual, está marcado como `[PENDIENTE]`.

**Mockups de referencia visual (adjuntos por separado):**
- `chief-trailers-home-completo.html` — Home completo, 7 bloques
- `chief-trailers-product-page.html` — Ficha de producto (ejemplo: Plataforma High Cube 40')

---

## 1. Contexto del cliente

Chief Trailers del Norte fabrica, repara y vende remolques y semirremolques industriales de alta resistencia, con diseño e ingeniería 100% mexicana.

**Slogan de marca:** "En Chief Trailers del Norte, la calidad es primero."

**Ubicación / planta:** Carretera Monterrey-Reynosa Km. 40.5, Ejido La Fragua, C.P. 67450, Cadereyta Jiménez, N.L.

**Contacto actual:** 81 1636 5258 · chieftrailers.com.mx

**Líneas de producto:**
- Portacontenedor Fijo 40'
- Portacontenedor Fijo 40-20 FT
- Portacontenedor Extendible 40'-20'
- Plataforma High Cube 40' (2 y 3 ejes)
- Dolly Convertidor Tipo A
- Camas bajas *(sin material 3D/fotográfico aún — pendiente)*
- Proyectos especiales (a medida)

**Objetivo del sitio:** generación de leads/cotizaciones. Sin precios visibles — cotización personalizada.

**Audiencia (dual, mismo peso):**
1. **Operación propia** — deciden rápido, buscan disponibilidad y referencia de precio.
2. **Flotilla o empresa** — deciden en comité, buscan volumen, specs técnicas, tiempos de entrega, garantía.

**Mercado geográfico:** Monterrey, CDMX, Tampico, Manzanillo, Lázaro Cárdenas (Michoacán).

**Clientes actuales (para bloque de credibilidad):** TLE, TWTSA, SMD Picazo, TLM, Cisneros Autotransportes, ALSA, TQ, TMP, 3T, Buznav Logística, Servitrans, TEA, Polanco Transportes, PHES.

**Stack:** desarrollo a medida (mismo enfoque que el sitio de SOZEI Intelligence).

---

## 2. Sistema de diseño

**Dirección visual:** bold / industrial — inspirado directamente en la línea gráfica de redes sociales del cliente, no en un estilo plano/minimalista.

**Paleta:**
- Rojo de marca (protagonista): `#E31E24` / variante oscura `#a5151a`
- Negro (`#111111` / `#000000`) — uso puntual: nav, bloques de contraste/cita, gradientes del hero
- Blanco / gris papel (`#f2f1ef`) — fondo predominante del sitio
- Gris acero (`#9a9fa8`) — texto secundario, detalles técnicos

**Tipografía:**
- Display/headlines: Montserrat (700–900), todo mayúsculas, headlines bicolor (blanco + rojo en la misma frase, como en el material de marketing del cliente)
- Cuerpo: Inter

**Elementos de firma visual:**
- Gradientes metálicos radiales en fondos oscuros (hero, bloques de contraste)
- Paneles rojos translúcidos superpuestos (detrás del modelo 3D en el hero)
- Cortes diagonales / clip-path en cards y mosaicos de fotos (consistente con el estilo de los diseños de redes del cliente)
- Arcos circulares delgados como elemento decorativo de fondo
- Checkmarks circulares rojos para atributos destacados

**Diferenciador técnico central:** toda la línea de producto se visualiza en **modelado 3D** (archivos SolidWorks → GLB/GLTF), no solo fotografía — esto aplica al hero, al grid de productos y a las fichas individuales.

---

## 3. Home

### 3.1 Hero
- **Fondo:** modelo 3D del remolque protagonista, animado en loop (no interactivo en esta sección) + modelos secundarios en versión simplificada/wireframe de fondo, para no saturar el peso de carga
- **Headline:** "Ingeniería Mexicana con Visión Global"
- **Subheadline:** "En Chief Trailers del Norte, la calidad es primero."
- **CTA:** "Cotiza tu remolque"
- **Checks debajo del CTA:** Diseño 3D / Acero G50-G100 / Pruebas antes de entregar

**Nota técnica — optimización del 3D:** los archivos de SolidWorks vienen con geometría muy densa (pensada para manufactura, no tiempo real). Antes de integrar:
- Comprimir geometría (Draco compression en `.glb`)
- Usar versiones low-poly/wireframe para los modelos secundarios de fondo
- Cargar el modelo principal primero, los secundarios después (lazy load)
- Tener una imagen estática de respaldo (poster) mientras carga el modelo 3D

### 3.2 ¿Quiénes somos?
- **Texto:** "Fabricantes de remolques y plataformas de alta resistencia para el transporte de carga pesada, con diseño e ingeniería 100% mexicana."
- **Visual:** mosaico de fotos reales en cortes diagonales (soldadura, taller, diseño 3D)
- **3 atributos destacados:** Diseño 3D / Acero de alta resistencia grado 50 y 100 / Pruebas antes de entregar

### 3.3 Nuestros productos
- **Formato:** grid interactivo, una card por subtipo de producto (no agrupado por familia)
- **Cada card:** preview/render 3D del modelo (no foto) + nombre + link a ficha completa
- **Listado de cards:** Portacontenedor Fijo 40' / Portacontenedor Fijo 40-20 FT / Portacontenedor Extendible 40'-20' / Plataforma High Cube 2 ejes / Plataforma High Cube 3 ejes / Dolly Convertidor / Camas bajas *(marcada como "pendiente 3D")* / Proyectos especiales
- **Por qué 3D y no foto:** el cliente no cuenta con fotografía profesional pareja de todas las líneas; usar el modelado 3D (mismo activo que se usa en las fichas) resuelve esto y da consistencia visual

### 3.4 Proceso de fabricación
- **Formato:** carrusel horizontal con scroll-snap (se detiene en cada card al deslizar), no scroll vertical
- **Todos los pasos con foto real** (no mezclar con íconos)
- **7 pasos:** 1) Corte con plasma mecanizado · 2) Oxicorte y doblez · 3) Soldadura · 4) Sandblast · 5) Pintura · 6) Personalización · 7) Logística de entrega

### 3.5 Cobertura / Mercado
- **Formato:** mapa de México (silueta estilizada) con puntos marcados y etiquetados directamente (sin necesidad de hover)
- **Plazas:** Monterrey, CDMX, Tampico, Manzanillo, Lázaro Cárdenas (Michoacán)

### 3.6 Clientes
- **Formato:** grid estático de logos en escala de grises; cada logo se resalta a color completo al hacer hover (efecto individual)
- Logos listados en sección 1

### 3.7 CTA final
- Repite el slogan de marca como bloque de contraste (fondo negro)
- CTA: "Cotiza tu remolque"
- Datos de contacto directo (teléfono, WhatsApp si se confirma — ver sección 6)

---

## 4. Ficha de producto (plantilla — se repite por cada línea)

### 4.1 Visor 3D + datos clave (split screen)
- **Layout:** visor 3D a un lado (sticky durante el scroll), specs clave al otro lado
- **Interacción del visor:** orbit control (girar libremente) + zoom
- **Color:** selector de **paleta libre** (no limitado a swatches predefinidos)

**Nota técnica — color libre:** requiere que el modelo 3D tenga los materiales de pintura separados correctamente por mesh (chasis, defensas, etc.), para que el color picker solo afecte partes pintables y no, por ejemplo, llantas o piezas metálicas sin pintura. Validar esto contra los archivos reales antes de comprometerse con la función completa.

- **Datos clave junto al visor:** nombre del remolque + línea, dimensiones (ancho/alto/longitud), capacidad de carga, CTA de cotización específico de esa configuración

### 4.2 Especificaciones técnicas completas
- **Formato:** acordeón (categorías se expanden individualmente)
- **Categorías:** Estructura / Patines / Suspensión neumática / Sistema de arrastre / Accesorios / Pintura / Opcionales
- Contenido real ya disponible en las fichas técnicas del cliente (ver PDFs de referencia compartidos)

### 4.3 Galería de fotos reales
- Fotos de unidades entregadas de esa línea (complementa al visor 3D)

### 4.4 Cierre / CTA
- CTA de cotización reforzado (con la configuración/color ya seleccionada si aplica)
- Bloque de "También te puede interesar" (productos relacionados)

---

## 5. Página Nosotros

Expande el contenido de "¿Quiénes somos?" del home.

1. **Header de página** — título + texto ampliado (fabricación, reparación y venta, servicio personalizado y de calidad)
2. **Historia / años de experiencia** — `[PENDIENTE: año de fundación / años de experiencia — confirmar con cliente]`
3. **Instalaciones / planta** — fotos reales de la planta (Cadereyta Jiménez, N.L.) — `[PENDIENTE: capacidad de producción, m² de planta, maquinaria destacada]`
4. **Proceso expandido** — mismos 7 pasos que el home, pero en formato lista/grid (no carrusel), cada uno con foto + título + descripción de 1-2 líneas — `[PENDIENTE: redactar descripción de cada paso — se puede proponer copy y validar con cliente]`
5. **Atributos de calidad** — mismos 3 del home, con más contexto — `[PENDIENTE: contexto adicional por atributo]`
6. **Cobertura + Clientes** — reutilizar contenido del home
7. **CTA de cierre**

---

## 6. Página Cotizar

Formulario único por pasos (no dos formularios separados).

**Paso 1 — Selección de perfil**
- "¿Cómo describirías tu operación?" → **Operación propia** | **Flotilla o empresa**

**Paso 2 — Selección de remolque**
- El usuario elige la línea de producto dentro del formulario (sin preselección, incluso si llega desde una ficha de producto — el flujo es consistente siempre)

**Paso 3 — Datos según perfil**
- *Operación propia:* nombre, teléfono/WhatsApp, ciudad, uso previsto
- *Flotilla o empresa:* nombre, empresa, teléfono, correo, volumen estimado, plazo de entrega deseado

**Paso 4 — Confirmación**
- Mensaje de confirmación + siguiente paso — `[PENDIENTE: tiempo de respuesta real a comunicar]`

### Regla importante — WhatsApp y CRM
El cliente va a implementar un CRM para dar seguimiento a leads. Un botón de WhatsApp directo (`wa.me`) **bypasea el CRM** porque esa conversación no pasa por ningún formulario.

**Regla definida:** el formulario se llena primero (mínimo nombre y teléfono). Solo **después** de enviarlo, se le ofrece al usuario continuar la conversación por WhatsApp, con los datos ya precargados en el mensaje. Esto garantiza que el 100% de los leads queden registrados antes de mover la conversación a WhatsApp.

`[PENDIENTE: confirmar con cliente qué CRM van a usar — si soporta integración nativa con WhatsApp Business API, se puede evaluar a futuro una integración más directa que resuelva esto de raíz]`

---

## 7. Página Contacto

1. **Header** — título + mensaje corto de invitación
2. **Datos directos** — teléfono (81 1636 5258), dirección de planta — `[PENDIENTE: correo de contacto, WhatsApp Business]`
3. **Mapa de ubicación** — Google Maps embebido con la ubicación de planta
4. **Formulario de contacto simple** — nombre, correo, mensaje (sin lógica de calificación de lead, es para consultas generales)
5. **CTA cruzado** — "¿Buscas cotizar un remolque?" → link a Cotizar

Aplica la misma regla de WhatsApp-después-del-formulario definida en la sección 6.

---

## 8. Página Proyectos especiales

Enfoque consultivo, no catálogo — vende capacidad de fabricación a medida, no una línea fija.

1. **Header / propuesta de valor** — "¿Necesitas algo fuera de catálogo?" + mensaje reforzando la ingeniería propia (diseño 3D, acero G50/G100)
2. **Ejemplos de trabajo previo** — `[PENDIENTE: confirmar con cliente si hay fotos/casos de proyectos especiales anteriores]`
3. **Cómo funciona el proceso** — pasos simplificados: 1) Cuéntanos tu necesidad → 2) Nuestro equipo de ingeniería evalúa → 3) Te presentamos una propuesta de diseño → 4) Fabricación a medida
4. **Formulario consultivo** — nombre, empresa (opcional), teléfono/correo, campo de descripción libre ("Cuéntanos qué necesitas"), opción de adjuntar archivo (plano, referencia, foto). Misma regla de WhatsApp-después-del-formulario.
5. **CTA de refuerzo** — invitar a explorar el catálogo estándar por si la necesidad ya está cubierta ahí

---

## 9. Lista de pendientes (confirmar con cliente antes o durante desarrollo)

- [ ] Año de fundación / años de experiencia de Chief Trailers
- [ ] Capacidad de producción, m² de planta, maquinaria destacada
- [ ] Descripciones de 1-2 líneas para cada uno de los 7 pasos del proceso (página Nosotros)
- [ ] Contexto adicional para cada atributo de calidad (Diseño 3D / Acero / Pruebas)
- [ ] Correo de contacto oficial
- [ ] Número de WhatsApp Business
- [ ] Tiempo de respuesta real a comunicar tras cotización
- [ ] CRM que se va a usar (para evaluar integración con WhatsApp Business API)
- [ ] Fotos/casos de proyectos especiales anteriores
- [ ] Confirmar materiales (fotos, specs) faltantes por línea, especialmente Camas bajas (sin modelo 3D ni fotos aún)
- [ ] Validar que los archivos de SolidWorks permitan separación de materiales por mesh para el selector de color libre

---

## 10. Referencia de specs técnicas por línea (para acordeón de ficha de producto)

*(Extraído de las fichas técnicas y tríptico actuales del cliente — usar tal cual, ya está validado por ellos)*

**Plataforma High Cube 40' (2 y 3 ejes)**
- Ancho: 2.60 m · Alto: 1.35 m · Longitud: 12.19 m
- Estructura: vigas principales tipo "I" en acero G50/Strenx, doble cuello con vigas A36/Strenx, corazas ¼" grado 50, piso de madera de pino traslapada 1½"
- Capacidad: 30 toneladas (2 ejes) / 40 toneladas (3 ejes)
- Patines: Holland Marck V / Ampro / Jost
- Suspensión: Sampa / Chief / Hendrickson HT-300 / Gabriel
- Opcionales: sistema de autoinflado, logotipo de empresa

**Portacontenedor Fijo 40' / Fijo 40-20 FT**
- Alma ¼" G50 con patines de solera ½" x 4" A36
- Capacidad: 30 toneladas
- 4 candados (Fijo 40') / 6 candados (Fijo 40-20 FT)
- Mismas opciones de patines y suspensión que Plataforma High Cube

**Portacontenedor Extendible 40'/20'**
- Ancho: 2.44 m · Alto: 1.35 m · Longitud: 12.90 m
- Diseño adaptable para contenedores de 20 y 40 pies, 6 candados
- Gancho de arrastre Wallace Force 50-10 o Premier 2400 A

**Dolly Convertidor Tipo A**
- Ancho: 2.60 m · Alto: 1.45 m · Longitud: 3.66 m
- Retráctil tipo UBL, quinta rueda Holland, eje Propar 30,000 lbs
- Opcionales: sistema de autoinflado, llantas y rines unimount 22.5 o 24.5

*(Specs completas de accesorios y sistema de arrastre disponibles en los PDFs de referencia originales del cliente — compartir con Memo/David como anexo)*
