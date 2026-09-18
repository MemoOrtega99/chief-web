export type ProductGlyph = 'container' | 'platform' | 'dolly' | 'special';

export type HomeProduct = {
    slug: string;
    family: string;
    name: string;
    glyph: ProductGlyph;
    status?: string;
    available: boolean;
};

export type ViewerModel = {
    id: string;
    name: string;
    modelPath: string;
    specs: Record<string, string>;
    description: string;
    features: string[];
    defaultColor: string;
};

export const homeProducts: HomeProduct[] = [
    {
        slug: 'portacontenedor-fijo-40',
        family: 'Portacontenedor',
        name: "Fijo 40'",
        glyph: 'container',
        available: false,
    },
    {
        slug: 'portacontenedor-fijo-40-20',
        family: 'Portacontenedor',
        name: 'Fijo 40-20 FT',
        glyph: 'container',
        available: false,
    },
    {
        slug: 'portacontenedor-extendible-40-20',
        family: 'Portacontenedor',
        name: "Extendible 40'-20'",
        glyph: 'container',
        available: false,
    },
    {
        slug: 'plataforma-high-cube-2-ejes',
        family: 'Plataforma',
        name: "High Cube 40' · 2 ejes",
        glyph: 'platform',
        available: false,
    },
    {
        slug: 'plataforma-high-cube-3-ejes',
        family: 'Plataforma',
        name: "High Cube 40' · 3 ejes",
        glyph: 'platform',
        available: false,
    },
    {
        slug: 'dolly-convertidor',
        family: 'Convertidor',
        name: 'Dolly Convertidor',
        glyph: 'dolly',
        available: false,
    },
    {
        slug: 'camas-bajas',
        family: 'Línea pendiente',
        name: 'Camas bajas',
        glyph: 'platform',
        status: 'Pendiente 3D',
        available: false,
    },
    {
        slug: 'proyectos-especiales',
        family: 'A medida',
        name: 'Proyectos especiales',
        glyph: 'special',
        available: false,
    },
];

export const viewerModels: ViewerModel[] = [
    {
        id: 'remolque-1',
        name: 'Remolque 40-20 Fijo Molino',
        modelPath: '/models/40-20-fijo-molino-remake.glb',
        specs: {
            Largo: '16.15 m',
            Ancho: '2.60 m',
            Alto: '2.90 m',
            Capacidad: '30,000 kg',
            Volumen: '120 m³',
        },
        description: 'Remolque fijo tipo molino 40-20. Construcción robusta para carga pesada.',
        features: ['Estructura reforzada', 'Piso de acero', 'Alta capacidad de carga', 'Diseño optimizado'],
        defaultColor: '#E31E24',
    },
    {
        id: 'remolque-2',
        name: 'Remolque 40-20 Variante 2',
        modelPath: '/models/40-20-fijo-molino-remake-2.glb',
        specs: {
            Largo: '16.10 m',
            Ancho: '2.55 m',
            Alto: '2.75 m',
            Capacidad: '28,000 kg',
            Tipo: 'Fijo Molino',
        },
        description: 'Segunda variante del remolque 40-20, con configuración adaptada para aplicaciones específicas.',
        features: ['Configuración personalizada', 'Estructura reforzada', 'Versatilidad de uso', 'Diseño industrial'],
        defaultColor: '#2563EB',
    },
    {
        id: 'remolque-3',
        name: 'Remolque 40-20 Variante 3',
        modelPath: '/models/40-20-fijo-molino-remake-3.glb',
        specs: {
            Largo: '14.63 m',
            Ancho: '2.60 m',
            Alto: '1.52 m',
            Capacidad: '35,000 kg',
            Tipo: 'Molino Industrial',
        },
        description: 'Tercera variante optimizada para aplicaciones industriales y de alto rendimiento.',
        features: ['Diseño compacto', 'Alta resistencia', 'Fácil mantenimiento', 'Aplicación industrial'],
        defaultColor: '#16A34A',
    },
];

export const colorOptions = [
    { name: 'Rojo Chief', value: '#E31E24' },
    { name: 'Azul', value: '#2563EB' },
    { name: 'Verde', value: '#16A34A' },
    { name: 'Amarillo', value: '#EAB308' },
    { name: 'Blanco', value: '#F5F5F5' },
    { name: 'Negro', value: '#171717' },
];

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
