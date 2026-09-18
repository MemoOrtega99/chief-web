export type BlueprintKind = 'platform' | 'container' | 'extendable' | 'dolly';

/** Alzado lateral esquemático, estilo plano técnico, para líneas sin modelo 3D. */
export default function Blueprint({ kind, className }: { kind: BlueprintKind; className?: string }) {
    const wheels = kind === 'dolly' ? [260, 330] : [470, 520];

    return (
        <svg
            viewBox="0 0 640 240"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            className={className}
            aria-hidden="true"
        >
            {/* Retícula */}
            <g opacity="0.18" strokeWidth="0.6">
                {Array.from({ length: 13 }, (_, i) => (
                    <path key={`v${i}`} d={`M${20 + i * 50} 16V206`} />
                ))}
                {Array.from({ length: 5 }, (_, i) => (
                    <path key={`h${i}`} d={`M20 ${16 + i * 47.5}H620`} />
                ))}
            </g>

            {kind === 'dolly' ? (
                <g>
                    <path d="M200 150h180v-16H200z" />
                    <path d="M120 142h80" />
                    <path d="M112 138h8v8h-8z" />
                    <path d="M240 134v-18h100v18" />
                    <circle cx="290" cy="112" r="14" />
                </g>
            ) : (
                <g>
                    <path d="M40 132h86l14-20h460v22H148l-14 18H40z" />
                    <path d="M140 112v40" />
                    <path d="M200 134v34M192 168h16" />
                    {kind !== 'platform' && (
                        <g strokeDasharray="5 5">
                            <path d="M170 112V52h410v60" />
                            {kind === 'extendable' && <path d="M372 52v60" />}
                        </g>
                    )}
                    {kind === 'extendable' && (
                        <g>
                            <path d="M330 30h84M330 30l8-5M330 30l8 5M414 30l-8-5M414 30l-8 5" />
                        </g>
                    )}
                    <path d="M440 134v10h110v-10" />
                </g>
            )}

            {wheels.map((x) => (
                <g key={x}>
                    <circle cx={x} cy={kind === 'dolly' ? 168 : 168} r="22" />
                    <circle cx={x} cy={168} r="9" />
                </g>
            ))}

            {/* Cotas */}
            <g strokeWidth="0.8">
                <path d="M40 214h560M40 208v12M600 208v12" />
                <path d="M624 112v56M618 112h12M618 168h12" />
            </g>
        </svg>
    );
}
