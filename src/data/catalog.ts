import type { BlueprintKind } from '@/components/ui/Blueprint';

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
    blueprint: BlueprintKind;
    /** Render estático del modelo 3D, si existe. */
    render?: string;
    line: string;
    name: string;
    code: string;
    summary: string;
    model?: ProductModel;
    dimensions: { width: string; height: string; length: string };
    capacity: string;
    /** Pendiente: el cliente aún no confirma las especificaciones técnicas. */
    specs: SpecGroup[];
};

export const catalogProducts: CatalogProduct[] = [
    {
        slug: 'plataforma-high-cube-40-2-ejes',
        blueprint: 'platform',
        render: '/renders/phc-rojo-34.webp',
        line: 'Plataforma',
        name: "High Cube 40'",
        code: 'PHC-40FT-2EJES',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        model: {
            path: '/models/plataforma-high-cube-40-2ejes.glb',
            defaultColor: '#E31E24',
        },
        dimensions: { width: '— m', height: '— m', length: '— m' },
        capacity: '— t',
        specs: [],
    },
    {
        slug: 'plataforma-high-cube-40-3-ejes',
        blueprint: 'platform',
        line: 'Plataforma',
        name: "High Cube 40' · 3 ejes",
        code: 'PHC-40FT-3EJES',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        dimensions: { width: '— m', height: '— m', length: '— m' },
        capacity: '— t',
        specs: [],
    },
    {
        slug: 'portacontenedor-fijo-40',
        blueprint: 'container',
        line: 'Portacontenedor',
        name: "Fijo 40'",
        code: 'PC-F40',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        capacity: '— t',
        dimensions: { width: '— m', height: '— m', length: '— m' },
        specs: [],
    },
    {
        slug: 'portacontenedor-fijo-40-20',
        blueprint: 'container',
        line: 'Portacontenedor',
        name: 'Fijo 40-20 FT',
        code: 'PC-F4020',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        capacity: '— t',
        dimensions: { width: '— m', height: '— m', length: '— m' },
        specs: [],
    },
    {
        slug: 'portacontenedor-extendible-40-20',
        blueprint: 'extendable',
        line: 'Portacontenedor',
        name: "Extendible 40'-20'",
        code: 'PC-E4020',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        dimensions: { width: '— m', height: '— m', length: '— m' },
        capacity: '— t',
        specs: [],
    },
    {
        slug: 'dolly-convertidor-tipo-a',
        blueprint: 'dolly',
        line: 'Convertidor',
        name: 'Dolly Tipo A',
        code: 'DC-A',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        dimensions: { width: '— m', height: '— m', length: '— m' },
        capacity: '— t',
        specs: [],
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
