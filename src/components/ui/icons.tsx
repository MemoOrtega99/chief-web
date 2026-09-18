type IconProps = { className?: string };

const base = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'square' as const,
    'aria-hidden': true,
};

export function ArrowIcon({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M4 12h15M13 6l6 6-6 6" />
        </svg>
    );
}

export function RotateIcon({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5" />
        </svg>
    );
}

export function ExpandIcon({ className }: IconProps) {
    return (
        <svg {...base} className={className}>
            <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
        </svg>
    );
}

export function CheckIcon({ className }: IconProps) {
    return (
        <svg {...base} strokeWidth={2.4} className={className}>
            <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
    );
}
