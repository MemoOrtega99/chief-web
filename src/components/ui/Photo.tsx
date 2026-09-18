import photos from '@/data/photos.generated.json';

export type PhotoName = keyof typeof photos;

type PhotoProps = {
    name: PhotoName;
    alt: string;
    /** Ancho con que se muestra, para que el navegador elija la versión adecuada. */
    sizes?: string;
    /** Encuadre dentro del contenedor (object-position). */
    position?: string;
    priority?: boolean;
    className?: string;
};

/** Foto real optimizada (ver scripts/optimize-photos.mjs). */
export default function Photo({ name, alt, sizes = '100vw', position, priority = false, className }: PhotoProps) {
    const photo = photos[name];
    const widths = photo.widths;
    const largest = widths[widths.length - 1];

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={`/fotos/${name}-${largest}.webp`}
            srcSet={widths.map((w) => `/fotos/${name}-${w}.webp ${w}w`).join(', ')}
            sizes={sizes}
            alt={alt}
            width={photo.width}
            height={photo.height}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            decoding="async"
            className={className}
            style={position ? { objectPosition: position } : undefined}
        />
    );
}
