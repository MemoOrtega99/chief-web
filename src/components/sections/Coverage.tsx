'use client';

import { motion } from 'framer-motion';

type MapLocation = {
    name: string;
    x: number;
    y: number;
    labelX: number;
    labelY: number;
    lineX: number;
    lineY: number;
    anchor: 'start' | 'end';
};

const locations: MapLocation[] = [
    { name: 'Monterrey', x: 416, y: 200, labelX: 440, labelY: 195, lineX: 434, lineY: 200, anchor: 'start' },
    { name: 'Tampico', x: 470, y: 277, labelX: 494, labelY: 282, lineX: 488, lineY: 277, anchor: 'start' },
    { name: 'CDMX', x: 442, y: 340, labelX: 466, labelY: 345, lineX: 460, lineY: 340, anchor: 'start' },
    { name: 'Manzanillo', x: 329, y: 347, labelX: 303, labelY: 339, lineX: 312, lineY: 344, anchor: 'end' },
    {
        name: 'Lázaro Cárdenas',
        x: 375,
        y: 373,
        labelX: 398,
        labelY: 402,
        lineX: 390,
        lineY: 390,
        anchor: 'start',
    },
];

// Simplified from the Natural Earth 1:110m Mexico outline and projected to this viewBox.
const mexicoOutlinePath =
    'M48 46.2 L72.9 44.4 L100.7 42 L98.7 46.4 L131.7 57.3 L181.7 73.1 L225.3 72.9 L242.6 72.9 L242.7 63.7 L280.6 63.7 L288.6 71.6 L299.8 78.7 L312.8 88.6 L320.1 100.3 L325.5 112.7 L336.8 119.4 L355 126.2 L368.8 108.4 L386.7 108 L402.2 117 L413.2 132.3 L420.7 145.5 L433.7 158.3 L438.5 174 L444.6 184.5 L461.7 191.5 L477.2 196.4 L485.8 195.7 L477.3 215.4 L473.5 231.6 L471.9 261.6 L469.7 272.6 L473.5 284.8 L480.3 295.8 L484.7 313.2 L499.2 329.9 L504.4 342.7 L512.9 353.8 L536.2 359.7 L545.2 369.1 L564.4 362.8 L581.1 360.6 L597.5 356.5 L611.3 352.7 L625.3 343.5 L630.5 330.4 L632.3 311.6 L636.1 305 L650.9 299.1 L674.1 293.9 L693.5 294.7 L706.7 292.8 L712 297.6 L711.3 308.4 L699.5 321.7 L694.3 335.4 L698.3 339.3 L695 349 L689.5 366.5 L684 360.7 L679.4 361.1 L675.2 361.4 L667.4 375 L663.4 372.3 L660.8 373.3 L660.9 376.6 L640.7 376.4 L620.2 376.4 L620.2 389.1 L610.3 389.1 L618.5 396.6 L626.6 401.8 L629 406.6 L632.6 408 L632 415.7 L603.9 415.7 L593.3 434 L596.5 438.2 L593.9 443.5 L593.4 450 L568.6 425.8 L557.3 418.6 L539.4 412.7 L527.2 414.3 L509.6 422.8 L498.5 425 L483.1 419.1 L466.7 414.8 L446.2 404.5 L429.8 401.4 L405 390.9 L386.7 380.2 L381.1 374.2 L368.9 372.9 L346.5 365.8 L337.3 355.5 L313.8 342.8 L302.8 328.6 L297.6 317.7 L304.9 315.5 L302.7 309.1 L307.7 303.3 L307.8 295.5 L300.4 285.5 L298.4 276.5 L291.1 265.2 L271.8 242.9 L249.8 225.4 L239.1 211.4 L220.3 202.2 L216.3 196.7 L219.6 182.9 L208.5 177.6 L195.5 166.7 L190.1 151.1 L178.3 149.3 L165.6 137.4 L155.3 126.5 L154.4 119.5 L142.6 102.6 L134.8 85.4 L135.2 76.8 L119.3 67.9 L112 68.9 L99.5 62.7 L96 71.8 L99.6 82.6 L101.7 99.4 L109.3 108.7 L125.5 124.1 L129.1 129.4 L132.5 131 L135.3 138.7 L139.2 138.4 L143.6 152.9 L150.3 158.6 L154.9 166.5 L168.7 177.9 L176 198.8 L182.5 208.6 L188.6 219.2 L189.8 231 L200.3 231.7 L209.1 241.9 L217.1 252 L216.5 256 L207.3 264.2 L203.4 264.1 L197.7 250.5 L183.3 237.7 L167.5 226.8 L156.3 221.1 L157 204.7 L153.7 192.5 L143.3 185.6 L128.2 175.6 L125.3 178.5 L119.8 172.6 L106.3 167.2 L93.4 154.2 L95 152.5 L104 153.7 L112.1 145.4 L113 135.2 L96.1 119.2 L83.2 113 L75.2 99 L67 84.3 L56.9 66.3 Z';

export default function Coverage() {
    return (
        <section className="ct-section ct-coverage" id="cobertura">
            <div className="ct-shell ct-coverage-grid">
                <motion.div
                    className="ct-coverage-copy"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                >
                    <p className="ct-kicker">Cobertura</p>
                    <h2>
                        Dónde estamos
                        <br />
                        <span>presentes</span>
                    </h2>
                    <p className="ct-lead">
                        Fabricamos y entregamos en las principales plazas industriales y portuarias del país.
                    </p>
                    <ul className="ct-location-list" aria-label="Plazas con cobertura">
                        {locations.map((location) => (
                            <li className="ct-location" key={location.name}>
                                <span aria-hidden="true" />
                                {location.name}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    className="ct-map-wrap"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.75 }}
                >
                    <div className="ct-map-meta">
                        <span>Plazas estratégicas</span>
                        <strong>5 puntos de cobertura</strong>
                    </div>
                    <svg
                        viewBox="0 0 760 500"
                        role="img"
                        aria-labelledby="coverage-map-title coverage-map-description"
                    >
                        <title id="coverage-map-title">Mapa de cobertura de Chief Trailers en México</title>
                        <desc id="coverage-map-description">
                            Monterrey, Tampico, Ciudad de México, Manzanillo y Lázaro Cárdenas son las plazas
                            estratégicas donde Chief Trailers fabrica y entrega.
                        </desc>
                        <defs>
                            <linearGradient id="ct-map-fill" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0" stopColor="#e9e7e3" />
                                <stop offset="1" stopColor="#dcd9d4" />
                            </linearGradient>
                            <pattern id="ct-map-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                                <path d="M28 0H0V28" fill="none" stroke="#bcb8b1" strokeOpacity="0.28" />
                            </pattern>
                        </defs>

                        <rect className="ct-map-backdrop" x="8" y="8" width="744" height="484" rx="4" />
                        <path
                            className="ct-map-grid"
                            d="M26 104H734M26 196H734M26 288H734M26 380H734"
                        />

                        <g className="ct-map-land" aria-hidden="true">
                            <path className="ct-map-shape" d={mexicoOutlinePath} />
                        </g>

                        <path
                            className="ct-map-route"
                            d="M416 200 C440 226 458 252 470 277 C459 302 450 323 442 340 C403 344 360 347 329 347 C342 361 359 369 375 373"
                            aria-hidden="true"
                        />

                        {locations.map((location) => (
                            <g className="ct-map-location" key={location.name}>
                                <line
                                    className="ct-map-callout"
                                    x1={location.x}
                                    y1={location.y}
                                    x2={location.lineX}
                                    y2={location.lineY}
                                />
                                <circle className="ct-map-pulse" cx={location.x} cy={location.y} r="7" />
                                <circle className="ct-map-point" cx={location.x} cy={location.y} r="7" />
                                <text
                                    className="ct-map-label"
                                    x={location.labelX}
                                    y={location.labelY}
                                    textAnchor={location.anchor}
                                >
                                    {location.name}
                                </text>
                            </g>
                        ))}
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}
