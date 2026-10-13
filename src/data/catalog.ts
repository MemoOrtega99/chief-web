import type { BlueprintKind } from '@/components/ui/Blueprint';
import type { PhotoName } from '@/components/ui/Photo';

export type SpecGroup = {
    title: string;
    items: string[];
};

export type ProductModel = {
    path: string;
    defaultColor: string;
    animation?: {
        initial: 'closed' | 'open';
    };
};

export type ProductAvailability = 'Entrega inmediata' | 'Catálogo' | 'Información técnica por confirmar';

export type CatalogProduct = {
    slug: string;
    blueprint: BlueprintKind;
    /** Foto real (ver assets-src/fotos) y su encuadre en las tarjetas. */
    photo?: { name: PhotoName; position?: string };
    line: string;
    name: string;
    code?: string;
    summary: string;
    model?: ProductModel;
    modelYear?: string;
    availability: ProductAvailability;
    dimensions: { width: string; height: string; length: string };
    capacity: string;
    weight?: string;
    specs: SpecGroup[];
};

const highCubeSpecs = (axles: string): SpecGroup[] => [
    {
        title: 'Configuración de ejes',
        items: [`${axles}.`],
    },
    {
        title: 'Estructura',
        items: [
            'Viga principal tipo I con alma calibre 1/4" en acero de alta resistencia.',
            'Patines calibre 1/2" x 6" en acero A-36.',
            'Doble cuello con almas de 1/4" en acero de alta resistencia y solera de 1/2" x 4" en acero A-36.',
            'Corazas de 1/4" en acero grado 50.',
            'Omegas en C-12, placa tirón de 5/8" en A-36 y borda lateral con canal estructural de 6".',
            'Solera lateral de 3/8", puentes transversales con viga I de 4" x 2" y 80,000 lb de capacidad.',
            'Planchuela de 3/8" grado 50 y buchacas de 1/4" en acero A-36.',
            'Diez ganchos loneros por lado y piso de madera de pino traslapada de 1 1/2".',
        ],
    },
    {
        title: 'Sistema de arrastre',
        items: [
            'Suspensión neumática de 30,000 lb, con altura de trabajo de 15" a 17".',
            'Eje tipo Propar de 30,000 lb con cámaras de aire dobles T30-30 y matracas autoajustables.',
            'Perno rey de 3/8" por 2".',
            'Gancho de arrastre Wallace Force R50-10 de 50 toneladas y 10 barrenos.',
            'Patín Ampro de 2 velocidades y 61,600 lb.',
            'Defensa PTR perforada conforme a NOM-014-SCT-2-2021.',
        ],
    },
    {
        title: 'Accesorios y acabados',
        items: [
            'Protección lateral reglamentaria NMX-D-318-IMNC-2017.',
            'Caja de herramientas, luces y arnés Grote.',
            'Rines de acero o aluminio 11R, 22.5" x 8.25" con 10 birlos.',
            'Llantas toda posición 11R, 22.5.',
            'Piso Apitong, piso de madera de pino o piso antiderrapante.',
            'Pintura a elección del cliente.',
        ],
    },
    {
        title: 'Configuración',
        items: ['Suspensiones, ejes y accesorios pueden ajustarse a las necesidades de cada operación y a las mejores marcas disponibles.'],
    },
];

const dryBoxSpecs = (): SpecGroup[] => [
    {
        title: 'Configuración interior',
        items: ['Ancho interior: 101" (2.56 m).'],
    },
    {
        title: 'Características técnicas',
        items: [
            'Estructura de panel compuesto de aluminio con postes de acero galvanizado.',
            'Techo de lámina de aluminio sellado de una sola pieza.',
            'Piso de madera laminada para uso marino con recubrimiento antiderrapante.',
            'Puertas traseras tipo libro en panel compuesto, con 5 bisagras y 4 barras de cierre.',
            'Sellado hermético con sellos de hule en puertas y perímetro.',
            'Arnés eléctrico Grote con sellado hermético y cinta reflejante DOT en laterales y perímetro trasero.',
            'Suspensión de aire Hendrickson HT300.',
            'Dos ejes Meritor de 30,000 lb con sistema de ajuste.',
            'Frenos de aire con cámaras de doble diafragma y sistema ABS Bendix 2S/1M.',
        ],
    },
    {
        title: 'Accesorios y sistemas',
        items: [
            'Loderas marca Chief.',
            'Protector lateral reglamentario (underride guard).',
            'Piso reforzado para montacargas.',
            'Cinta reflejante DOT.',
            'Soporte de llanta de refacción.',
            'Toma de aire y conexiones en parte frontal.',
            'Paro de seguridad (spring brake).',
        ],
    },
    {
        title: 'Configuración',
        items: ['La configuración de la suspensión puede variar según las necesidades del cliente. La distancia entre paneles puede ajustarse según los requerimientos de cada operación.'],
    },
];

const extendableSpecs: SpecGroup[] = [
    {
        title: 'Configuración',
        items: ['Diseñado para operación logística de alta resistencia.'],
    },
    {
        title: 'Estructura',
        items: [
            'Vigas principales formadas en acero de alta resistencia.',
            'Patines calibre 5/8" x 6" en acero A-36.',
            'Cargadores de 1/4" tipo viga con alma de 1/4" en acero de alta resistencia.',
            'Corazas de 3/8" en cuello y cajón.',
            'Placa tirón de 5/8" en A-36 y planchuela de 3/8" grado 50.',
        ],
    },
    {
        title: 'Sistema de arrastre',
        items: [
            'Suspensión neumática de 30,000 lb, con altura de trabajo de 15" a 17".',
            'Eje tipo Propar de 30,000 lb con cámaras de aire dobles T30-30 y matracas autoajustables.',
            'Perno rey de 3/8" por 2".',
            'Gancho de arrastre Wallace Force R50-10 de 50 toneladas y 10 barrenos.',
            'Patín Ampro de 2 velocidades y 61,600 lb.',
            'Defensa PTR perforada conforme a NOM-014-SCT-2-2021.',
        ],
    },
    {
        title: 'Accesorios y opciones',
        items: [
            'Luces y arnés Grote.',
            'Sistema ABS Bendix con 2 o 4 sensores.',
            'Rines de acero o aluminio 11R, 22.5" x 8.25" con 10 birlos.',
            'Llantas toda posición 11R, 22.5.',
            'Pintura a elección del cliente.',
            'Opcionales: sistema de autoinflado y sistema de levante retráctil.',
            'Luces y cinta reflejante conforme al reglamento de tránsito en carreteras federales.',
        ],
    },
];

const dollySpecs: SpecGroup[] = [
    {
        title: 'Estructura',
        items: [
            'Fabricado con viga formada en acero de alta resistencia.',
            'Patines calibre 5/8" x 6" en acero A-36.',
            'Cargadores tipo viga con alma de 1/4" en acero de alta resistencia.',
            'Resistencia y patines en solera de 1/4" x 4".',
        ],
    },
    {
        title: 'Sistema de arrastre',
        items: [
            'Suspensión neumática de 30,000 lb, con altura de trabajo de 15" a 17".',
            'Eje tipo Propar de 30,000 lb con cámaras de aire dobles T30-30 y matracas autoajustables.',
            'Quinta rueda Holland FW35.',
            'Argolla de arrastre PRE245DB.',
        ],
    },
    {
        title: 'Accesorios y opciones',
        items: [
            'Luces y arnés Grote.',
            'Sistema ABS Bendix con 2 o 4 sensores.',
            'Rines de acero o aluminio 11R, 22.5" x 8.25" con 10 birlos.',
            'Llantas toda posición 11R, 22.5.',
            'Pintura a elección del cliente.',
            'Opcionales: sistema de autoinflado y sistema de levante retráctil.',
            'Luces y cinta reflejante conforme al reglamento de tránsito en carreteras federales.',
        ],
    },
];

export const catalogProducts: CatalogProduct[] = [
    {
        slug: 'plataforma-high-cube-40-2-ejes',
        blueprint: 'platform',
        photo: { name: 'chief-plataforma-y-dollies-cenital', position: '50% 22%' },
        line: 'Plataforma',
        name: "High Cube 40'",
        code: 'PHC-40FT-2EJES',
        summary: 'Plataforma High Cube de 40 FT para carga general, con configuración de 2 ejes y pisos adaptables a la operación.',
        model: {
            path: '/models/plataforma-high-cube-40-2ejes.glb',
            defaultColor: '#E31E24',
        },
        availability: 'Entrega inmediata',
        dimensions: { width: '2.60 m', height: '1.35 m', length: '12.19 m' },
        capacity: 'Por confirmar',
        specs: highCubeSpecs('2 ejes'),
    },
    {
        slug: 'plataforma-high-cube-40-3-ejes',
        blueprint: 'platform',
        photo: { name: 'chief-plataformas-y-dollies-cenital', position: '50% 24%' },
        line: 'Plataforma',
        name: "High Cube 40' · 3 ejes",
        code: 'PHC-40FT-3EJES',
        summary: 'Plataforma High Cube de 40 FT para carga general, con configuración de 3 ejes y pisos adaptables a la operación.',
        model: {
            path: '/models/plataforma-high-cube-40-3-ejes.glb',
            defaultColor: '#E31E24',
        },
        availability: 'Entrega inmediata',
        dimensions: { width: '2.60 m', height: '1.35 m', length: '12.19 m' },
        capacity: 'Por confirmar',
        specs: highCubeSpecs('3 ejes'),
    },
    {
        slug: 'portacontenedor-fijo-40',
        blueprint: 'container',
        line: 'Portacontenedor',
        name: "Fijo 40'",
        code: 'PC-F40',
        summary: 'Portacontenedor fijo de 40 FT para operaciones de carga especializada. La configuración técnica se confirma según la operación.',
        availability: 'Información técnica por confirmar',
        capacity: 'Por confirmar',
        dimensions: { width: 'Por confirmar', height: 'Por confirmar', length: "40'" },
        specs: [{ title: 'Estado de la ficha', items: ['La presentación técnica recibida no incluye este modelo. Solicita la configuración específica a nuestro equipo comercial.'] }],
    },
    {
        slug: 'portacontenedor-fijo-40-20',
        blueprint: 'container',
        line: 'Portacontenedor',
        name: 'Fijo 40-20 FT',
        code: 'PC-F4020',
        summary: 'Portacontenedor fijo para configuraciones de 40 y 20 FT. La ficha técnica se confirma según la operación.',
        availability: 'Información técnica por confirmar',
        capacity: 'Por confirmar',
        dimensions: { width: 'Por confirmar', height: 'Por confirmar', length: '40–20 FT' },
        specs: [{ title: 'Estado de la ficha', items: ['La presentación técnica recibida no incluye este modelo. Solicita la configuración específica a nuestro equipo comercial.'] }],
    },
    {
        slug: 'portacontenedor-extendible-40-20',
        blueprint: 'extendable',
        photo: { name: 'chief-plataforma-extendible', position: '55% 50%' },
        line: 'Portacontenedor',
        name: "Extendible 40'-20'",
        code: 'PC-E4020',
        summary: 'Portacontenedor extendible 40-20 FT para operación logística de alta resistencia, con configuración ajustable y opciones de personalización.',
        model: {
            path: '/models/portacontenedor-extendible-40-20.glb',
            defaultColor: '#E31E24',
        },
        availability: 'Entrega inmediata',
        dimensions: { width: '2.44 m', height: '1.35 m', length: '12.90 m' },
        capacity: 'Por confirmar',
        specs: extendableSpecs,
    },
    {
        slug: 'cama-baja-3-ejes',
        blueprint: 'platform',
        photo: { name: 'chief-cama-baja-3-ejes-perspectiva', position: '50% 58%' },
        line: 'Cama baja',
        name: '53 FT · 3 ejes',
        code: 'CB-3EJES',
        modelYear: '2026',
        summary: 'Cama baja de 53 FT para carga pesada, con capacidad de 40 toneladas distribuidas uniformemente.',
        model: {
            path: '/models/cama-baja-53-3-ejes.glb',
            defaultColor: '#E31E24',
            animation: { initial: 'closed' },
        },
        availability: 'Catálogo',
        dimensions: { width: '102" (2.60 m)', height: '51" (1.295 m) quinta rueda', length: '53 FT (16.18 m)' },
        capacity: '40 toneladas',
        weight: '7,000 kg',
        specs: [
            {
                title: 'Referencia técnica',
                items: [
                    'Referencia normativa indicada en la ficha: NOM-035-CST.',
                ],
            },
            {
                title: 'Estructura',
                items: [
                    'Vigas principales con almas fabricadas en acero de alta resistencia A-572 grado 50 de 1/4" y patines en acero A-514 grado 100 de 1/2".',
                    'Placa de enganche de 3/8" en acero grado 50 con perno rey Wallace.',
                    'Corazas de 5/16" en acero de alta resistencia A-572 grado 50.',
                    'Cargadores tipo I de 80,000 lb.',
                    'Puentes tipo C fabricados en acero grado 50.',
                    'Bastidor con canal de 6", buchacas laterales, solera de 3/8" x 2 1/2" y ganchos loneros.',
                ],
            },
            {
                title: 'Seguridad y rodaje',
                items: [
                    'Defensa amortiguadora de impacto certificada conforme a NOM-035-SCT-2022 y DOT, con capacidad de 80,000 lb y diseño bumper tube de 4" x 4".',
                    'Protectores laterales normativos en cumplimiento con DOT.',
                    'Piso de madera de pino nacional de 1 1/2" de espesor.',
                    'Suspensión HT-300 HJ Rockwell de 30,000 lb y perfil bajo.',
                    'Tres ejes importados de 30,000 lb, track 77.5, booster doble y matracas autoajustables.',
                    'Frenos de aire con cámaras de doble diafragma y ABS Bendix con 2 sensores y 1 modulador.',
                ],
            },
            {
                title: 'Accesorios y sistemas',
                items: [
                    'Quince ganchos loneros por lado.',
                    'Loderas marca Chief y fondo epóxico para uretano.',
                    'Arnés eléctrico Grote y luces Grote reglamentarias.',
                    'Cuatro topes de hule y alineación con láser.',
                ],
            },
        ],
    },
    {
        slug: 'dolly-convertidor-tipo-a',
        blueprint: 'dolly',
        photo: { name: 'chief-plataforma-y-dollies-cenital', position: '50% 100%' },
        line: 'Convertidor',
        name: 'Dolly Tipo A',
        code: 'DC-A',
        summary: 'Convertidor Dolly para acoplar remolques en operaciones de transporte pesado, con configuración ajustable y opciones de personalización.',
        model: {
            path: '/models/dolly-convertidor-tipo-a.glb',
            defaultColor: '#E31E24',
        },
        availability: 'Entrega inmediata',
        dimensions: { width: '2.60 m', height: '1.45 m', length: '3.66 m' },
        capacity: 'Por confirmar',
        specs: dollySpecs,
    },
    {
        slug: 'caja-seca-40',
        blueprint: 'container',
        line: 'Caja seca',
        name: '40 FT · Borda alta',
        modelYear: '2026',
        summary: 'Caja seca de 40 FT para carga general, con estructura de panel compuesto de aluminio y capacidad de 30 toneladas.',
        availability: 'Catálogo',
        dimensions: { width: '102.3" (2.60 m)', height: '110" (2.79 m) interior', length: "40' (12.19 m)" },
        capacity: '30 toneladas',
        weight: '6,500 kg aprox.',
        specs: dryBoxSpecs(),
    },
    {
        slug: 'caja-seca-53',
        blueprint: 'container',
        line: 'Caja seca',
        name: '53 FT · Borda alta',
        modelYear: '2026',
        summary: 'Caja seca de 53 FT para carga general, con estructura de panel compuesto de aluminio y capacidad de 30 toneladas.',
        availability: 'Catálogo',
        dimensions: { width: '102.3" (2.60 m)', height: '110" (2.79 m) interior', length: "53' (16.18 m)" },
        capacity: '30 toneladas',
        weight: '6,500 kg aprox.',
        specs: dryBoxSpecs(),
    },
];

export const paintColors = [
    { name: 'Rojo Chief', value: '#E31E24' },
    { name: 'Negro', value: '#18191B' },
    { name: 'Azul industrial', value: '#1F4E9C' },
    { name: 'Gris acero', value: '#6B7078' },
    { name: 'Blanco', value: '#EDEDEA' },
    { name: 'Amarillo', value: '#F2B705' },
    { name: 'Verde', value: '#1E6B3A' },
];

export const contact = {
    phoneDisplay: '81 1636 5258',
    phoneHref: 'tel:+528116365258',
    addressLines: ['Carretera Monterrey–Reynosa Km. 40.5', 'Ejido La Fragua, C.P. 67450', 'Cadereyta Jiménez, N.L.'],
};

export const processSteps = [
    { number: '01', title: 'Corte con plasma mecanizado', tag: 'Fabricación', image: '/fotos/chief-cama-baja-3-ejes-cenital-1200.webp' },
    { number: '02', title: 'Oxicorte y doblez', tag: 'Fabricación', image: '/fotos/chief-cama-baja-trasera-taller-1200.webp' },
    { number: '03', title: 'Soldadura', tag: 'Fabricación', image: '/fotos/chief-plataformas-y-dollies-patio-1200.webp' },
    { number: '04', title: 'Sandblast', tag: 'Acabado', image: '/fotos/chief-plataforma-y-dollies-cenital-1200.webp' },
    { number: '05', title: 'Pintura', tag: 'Acabado', image: '/hero-background-v2.jpg' },
    { number: '06', title: 'Personalización', tag: 'Entrega', image: '/fotos/chief-plataforma-extendible-1200.webp' },
    { number: '07', title: 'Logística de entrega', tag: 'Entrega', image: '/hero-background-user.png' },
];

export const clientNames = [
    'TLE',
    'TWTSA',
    'SMD Picazo',
    'TLM',
    'Cisneros Autotransportes',
    'ALSA',
    'TQ',
    'TMP',
    '3T',
    'Buznav Logística',
    'Servitrans',
    'TEA',
    'Polanco Transportes',
    'PHES',
];
