import { NextResponse } from 'next/server';

const MAX_LENGTH = 2000;

const clean = (value: unknown) => (typeof value === 'string' ? value.trim().slice(0, MAX_LENGTH) : '');

export async function POST(request: Request) {
    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
    }

    const lead = {
        nombre: clean(body.nombre),
        telefono: clean(body.telefono),
        empresa: clean(body.empresa),
        correo: clean(body.correo),
        remolque: clean(body.remolque),
        mensaje: clean(body.mensaje),
        recibido: new Date().toISOString(),
    };

    if (!lead.nombre || !lead.telefono) {
        return NextResponse.json({ error: 'Nombre y teléfono son obligatorios' }, { status: 422 });
    }

    // TODO: enviar al CRM / correo cuando el cliente lo defina. Por ahora solo queda en el log del servidor.
    console.info('[contacto] nueva solicitud', lead);

    return NextResponse.json({ ok: true });
}
