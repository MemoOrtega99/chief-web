export type SpecGroup = {
    title: string;
    items: string[];
};

export type ProductModel = {
    path: string;
    defaultColor: string;
};

export type CatalogProduct = {
    slug: string;
    line: string;
    name: string;
    code: string;
    summary: string;
    model?: ProductModel;
    dimensions?: { width: string; height: string; length: string };
    capacity?: string;
    specs: SpecGroup[];
};

const sharedRunningGear: SpecGroup[] = [
    {
        title: 'Patines',
        items: ['Holland Mark V, Ampro o Jost', 'Patín de dos velocidades'],
    },
    {
        title: 'Suspensión',
        items: ['Neumática Sampa, Chief, Hendrickson HT-300 o Gabriel', 'Ejes con capacidad de 30,000 lbs'],
    },
];

export const catalogProducts: CatalogProduct[] = [
    {
        slug: 'plataforma-high-cube-40-2-ejes',
        line: 'Plataforma',
        name: "High Cube 40'",
        code: 'PHC-40FT-2EJES',
        summary:
            'Plataforma de 40 pies y 2 ejes para carga general y contenedor. Doble cuello, vigas tipo I y piso de pino traslapado.',
        model: {
            path: '/models/plataforma-high-cube-40-2ejes.glb',
            defaultColor: '#E31E24',
        },
        dimensions: { width: '2.60 m', height: '1.35 m', length: '12.19 m' },
        capacity: '30 t',
        specs: [
            {
                title: 'Estructura',
                items: [
                    'Vigas principales tipo I en acero G50 o Strenx',
                    'Doble cuello con vigas A36 o Strenx',
                    'Corazas de ¼" grado 50',
                    'Piso de madera de pino traslapada de 1½"',
                ],
            },
            ...sharedRunningGear,
            {
                title: 'Sistema de arrastre',
                items: ['Gancho de arrastre Wallace Force R50-10', 'Perno rey y placa de arrastre para trabajo pesado'],
            },
            {
                title: 'Accesorios y opcionales',
                items: [
                    'Sistema ABS Bendix de 2 o 4 sensores',
                    'Luces y arnés Grote',
                    'Rines de acero o aluminio de 22.5"',
                    'Sistema de autoinflado',
                    'Logotipo de la empresa',
                ],
            },
        ],
    },
    {
        slug: 'plataforma-high-cube-40-3-ejes',
        line: 'Plataforma',
        name: "High Cube 40' · 3 ejes",
        code: 'PHC-40FT-3EJES',
        summary: 'La misma plataforma High Cube con un tercer eje para operaciones de hasta 40 toneladas.',
        dimensions: { width: '2.60 m', height: '1.35 m', length: '12.19 m' },
        capacity: '40 t',
        specs: sharedRunningGear,
    },
    {
        slug: 'portacontenedor-fijo-40',
        line: 'Portacontenedor',
        name: "Fijo 40'",
        code: 'PC-F40',
        summary: 'Portacontenedor fijo con alma de ¼" G50 y 4 candados.',
        capacity: '30 t',
        specs: [
            { title: 'Estructura', items: ['Alma ¼" G50 con patines de solera ½" × 4" A36', '4 candados'] },
            ...sharedRunningGear,
        ],
    },
    {
        slug: 'portacontenedor-fijo-40-20',
        line: 'Portacontenedor',
        name: 'Fijo 40-20 FT',
        code: 'PC-F4020',
        summary: 'Portacontenedor fijo para contenedores de 20 y 40 pies, con 6 candados.',
        capacity: '30 t',
        specs: [
            { title: 'Estructura', items: ['Alma ¼" G50 con patines de solera ½" × 4" A36', '6 candados'] },
            ...sharedRunningGear,
        ],
    },
    {
        slug: 'portacontenedor-extendible-40-20',
        line: 'Portacontenedor',
        name: "Extendible 40'-20'",
        code: 'PC-E4020',
        summary: 'Diseño adaptable para contenedores de 20 y 40 pies, 6 candados.',
        dimensions: { width: '2.44 m', height: '1.35 m', length: '12.90 m' },
        specs: [
            { title: 'Sistema de arrastre', items: ['Gancho Wallace Force 50-10 o Premier 2400 A'] },
            ...sharedRunningGear,
        ],
    },
    {
        slug: 'dolly-convertidor-tipo-a',
        line: 'Convertidor',
        name: 'Dolly Tipo A',
        code: 'DC-A',
        summary: 'Dolly convertidor con retráctil tipo UBL, quinta rueda Holland y eje Propar.',
        dimensions: { width: '2.60 m', height: '1.45 m', length: '3.66 m' },
        specs: [
            {
                title: 'Componentes',
                items: ['Retráctil tipo UBL', 'Quinta rueda Holland', 'Eje Propar 30,000 lbs'],
            },
            {
                title: 'Opcionales',
                items: ['Sistema de autoinflado', 'Llantas y rines unimount 22.5" o 24.5"'],
            },
        ],
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
    { number: '01', title: 'Corte con plasma mecanizado', tag: 'Fabricación', image: '/hero-background-v2.jpg' },
    { number: '02', title: 'Oxicorte y doblez', tag: 'Fabricación', image: '/hero-background-v3.jpg' },
    { number: '03', title: 'Soldadura', tag: 'Fabricación', image: '/trailer-day.png' },
    { number: '04', title: 'Sandblast', tag: 'Acabado', image: '/hero-background.jpg' },
    { number: '05', title: 'Pintura', tag: 'Acabado', image: '/hero-background-user.png' },
    { number: '06', title: 'Personalización', tag: 'Entrega', image: '/trailer-day.png' },
    { number: '07', title: 'Logística de entrega', tag: 'Entrega', image: '/hero-background-v2.jpg' },
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
