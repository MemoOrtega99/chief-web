#!/usr/bin/env python3
"""Generate the downloadable Chief technical sheets from the catalog copy."""

from __future__ import annotations

import sys
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Flowable,
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
LOGO_PATH = ROOT / 'public/chief-logo-iso.png'
PAPER = colors.HexColor('#F3F2EE')
INK = colors.HexColor('#121314')
MUTED = colors.HexColor('#666A72')
LINE = colors.HexColor('#D3D1CB')
RED = colors.HexColor('#E31E24')
WHITE = colors.white


def register_fonts() -> None:
    fonts = {
        'Inter': ROOT / 'public/fonts/inter-400.ttf',
        'Inter-Medium': ROOT / 'public/fonts/inter-500.ttf',
        'Inter-Semibold': ROOT / 'public/fonts/inter-600.ttf',
        'Montserrat-Bold': ROOT / 'public/fonts/montserrat-700.ttf',
        'Mono': ROOT / 'public/fonts/jetbrains-mono-400.ttf',
    }
    for name, path in fonts.items():
        pdfmetrics.registerFont(TTFont(name, str(path)))


def groups(*items: tuple[str, list[str]]) -> list[dict[str, object]]:
    return [{'title': title, 'items': values} for title, values in items]


PRODUCTS = [
    {
        'slug': 'plataforma-high-cube-40-2-ejes',
        'code': 'PHC-40FT-2EJES',
        'line': 'Plataforma',
        'name': "High Cube 40'",
        'summary': 'Plataforma High Cube de 40 FT para carga general, con configuración de 2 ejes y pisos adaptables a la operación.',
        'dimensions': [('Largo', '12.19 m'), ('Ancho', '2.60 m'), ('Alto', '1.35 m'), ('Capacidad', 'Por confirmar')],
        'specs': groups(
            ('Configuración de ejes', ['2 ejes.']),
            (
                'Estructura',
                [
                    'Viga principal tipo I con alma calibre 1/4" en acero de alta resistencia.',
                    'Patines calibre 1/2" x 6" en acero A-36.',
                    'Doble cuello con almas de 1/4" en acero de alta resistencia y solera de 1/2" x 4" en acero A-36.',
                    'Corazas de 1/4" en acero grado 50.',
                    'Omegas en C-12, placa tirón de 5/8" en A-36 y borda lateral con canal estructural de 6".',
                    'Solera lateral de 3/8", puentes transversales con viga I de 4" x 2" y 80,000 lb de capacidad.',
                    'Planchuela de 3/8" grado 50 y buchacas de 1/4" en acero A-36.',
                    'Diez ganchos loneros por lado y piso de madera de pino traslapada de 1 1/2".',
                ],
            ),
            (
                'Sistema de arrastre',
                [
                    'Suspensión neumática de 30,000 lb, con altura de trabajo de 15" a 17".',
                    'Eje tipo Propar de 30,000 lb con cámaras de aire dobles T30-30 y matracas autoajustables.',
                    'Perno rey de 3/8" por 2".',
                    'Gancho de arrastre Wallace Force R50-10 de 50 toneladas y 10 barrenos.',
                    'Patín Ampro de 2 velocidades y 61,600 lb.',
                    'Defensa PTR perforada conforme a NOM-014-SCT-2-2021.',
                ],
            ),
            (
                'Accesorios y acabados',
                [
                    'Protección lateral reglamentaria NMX-D-318-IMNC-2017.',
                    'Caja de herramientas, luces y arnés Grote.',
                    'Rines de acero o aluminio 11R, 22.5" x 8.25" con 10 birlos.',
                    'Llantas toda posición 11R, 22.5.',
                    'Piso Apitong, piso de madera de pino o piso antiderrapante.',
                    'Pintura a elección del cliente.',
                ],
            ),
            (
                'Configuración',
                ['Suspensiones, ejes y accesorios pueden ajustarse a las necesidades de cada operación y a las mejores marcas disponibles.'],
            ),
        ),
    },
    {
        'slug': 'plataforma-high-cube-40-3-ejes',
        'code': 'PHC-40FT-3EJES',
        'line': 'Plataforma',
        'name': "High Cube 40' · 3 ejes",
        'summary': 'Plataforma High Cube de 40 FT para carga general, con configuración de 3 ejes y pisos adaptables a la operación.',
        'dimensions': [('Largo', '12.19 m'), ('Ancho', '2.60 m'), ('Alto', '1.35 m'), ('Capacidad', 'Por confirmar')],
        'specs': groups(
            ('Configuración de ejes', ['3 ejes.']),
            (
                'Estructura',
                [
                    'Viga principal tipo I con alma calibre 1/4" en acero de alta resistencia.',
                    'Patines calibre 1/2" x 6" en acero A-36.',
                    'Doble cuello con almas de 1/4" en acero de alta resistencia y solera de 1/2" x 4" en acero A-36.',
                    'Corazas de 1/4" en acero grado 50.',
                    'Omegas en C-12, placa tirón de 5/8" en A-36 y borda lateral con canal estructural de 6".',
                    'Solera lateral de 3/8", puentes transversales con viga I de 4" x 2" y 80,000 lb de capacidad.',
                    'Planchuela de 3/8" grado 50 y buchacas de 1/4" en acero A-36.',
                    'Diez ganchos loneros por lado y piso de madera de pino traslapada de 1 1/2".',
                ],
            ),
            (
                'Sistema de arrastre',
                [
                    'Suspensión neumática de 30,000 lb, con altura de trabajo de 15" a 17".',
                    'Eje tipo Propar de 30,000 lb con cámaras de aire dobles T30-30 y matracas autoajustables.',
                    'Perno rey de 3/8" por 2".',
                    'Gancho de arrastre Wallace Force R50-10 de 50 toneladas y 10 barrenos.',
                    'Patín Ampro de 2 velocidades y 61,600 lb.',
                    'Defensa PTR perforada conforme a NOM-014-SCT-2-2021.',
                ],
            ),
            (
                'Accesorios y acabados',
                [
                    'Protección lateral reglamentaria NMX-D-318-IMNC-2017.',
                    'Caja de herramientas, luces y arnés Grote.',
                    'Rines de acero o aluminio 11R, 22.5" x 8.25" con 10 birlos.',
                    'Llantas toda posición 11R, 22.5.',
                    'Piso Apitong, piso de madera de pino o piso antiderrapante.',
                    'Pintura a elección del cliente.',
                ],
            ),
            (
                'Configuración',
                ['Suspensiones, ejes y accesorios pueden ajustarse a las necesidades de cada operación y a las mejores marcas disponibles.'],
            ),
        ),
    },
    {
        'slug': 'portacontenedor-fijo-40',
        'code': 'PC-F40',
        'line': 'Portacontenedor',
        'name': "Fijo 40'",
        'summary': 'Portacontenedor fijo de 40 FT para operaciones de carga especializada. La configuración técnica se confirma según la operación.',
        'dimensions': [('Largo', "40'"), ('Ancho', 'Por confirmar'), ('Alto', 'Por confirmar'), ('Capacidad', 'Por confirmar')],
        'specs': groups(
            ('Estado de la ficha', ['La presentación técnica recibida no incluye este modelo. Solicita la configuración específica a nuestro equipo comercial.']),
        ),
    },
    {
        'slug': 'portacontenedor-fijo-40-20',
        'code': 'PC-F4020',
        'line': 'Portacontenedor',
        'name': 'Fijo 40-20 FT',
        'summary': 'Portacontenedor fijo para configuraciones de 40 y 20 FT. La ficha técnica se confirma según la operación.',
        'dimensions': [('Largo', '40-20 FT'), ('Ancho', 'Por confirmar'), ('Alto', 'Por confirmar'), ('Capacidad', 'Por confirmar')],
        'specs': groups(
            ('Estado de la ficha', ['La presentación técnica recibida no incluye este modelo. Solicita la configuración específica a nuestro equipo comercial.']),
        ),
    },
    {
        'slug': 'portacontenedor-extendible-40-20',
        'code': 'PC-E4020',
        'line': 'Portacontenedor',
        'name': "Extendible 40'-20'",
        'summary': 'Portacontenedor extendible 40-20 FT para operación logística de alta resistencia, con configuración ajustable y opciones de personalización.',
        'dimensions': [('Largo', '12.90 m'), ('Ancho', '2.44 m'), ('Alto', '1.35 m'), ('Capacidad', 'Por confirmar')],
        'specs': groups(
            ('Configuración', ['Diseñado para operación logística de alta resistencia.']),
            (
                'Estructura',
                [
                    'Vigas principales formadas en acero de alta resistencia.',
                    'Patines calibre 5/8" x 6" en acero A-36.',
                    'Cargadores de 1/4" tipo viga con alma de 1/4" en acero de alta resistencia.',
                    'Corazas de 3/8" en cuello y cajón.',
                    'Placa tirón de 5/8" en A-36 y planchuela de 3/8" grado 50.',
                ],
            ),
            (
                'Sistema de arrastre',
                [
                    'Suspensión neumática de 30,000 lb, con altura de trabajo de 15" a 17".',
                    'Eje tipo Propar de 30,000 lb con cámaras de aire dobles T30-30 y matracas autoajustables.',
                    'Perno rey de 3/8" por 2".',
                    'Gancho de arrastre Wallace Force R50-10 de 50 toneladas y 10 barrenos.',
                    'Patín Ampro de 2 velocidades y 61,600 lb.',
                    'Defensa PTR perforada conforme a NOM-014-SCT-2-2021.',
                ],
            ),
            (
                'Accesorios y opciones',
                [
                    'Luces y arnés Grote.',
                    'Sistema ABS Bendix con 2 o 4 sensores.',
                    'Rines de acero o aluminio 11R, 22.5" x 8.25" con 10 birlos.',
                    'Llantas toda posición 11R, 22.5.',
                    'Pintura a elección del cliente.',
                    'Opcionales: sistema de autoinflado y sistema de levante retráctil.',
                    'Luces y cinta reflejante conforme al reglamento de tránsito en carreteras federales.',
                ],
            ),
        ),
    },
    {
        'slug': 'cama-baja-3-ejes',
        'code': 'CB-3EJES',
        'line': 'Cama baja',
        'name': '53 FT · 3 ejes',
        'summary': 'Cama baja de 53 FT para carga pesada, con capacidad de 40 toneladas distribuidas uniformemente.',
        'dimensions': [('Largo', '53 FT (16.18 m)'), ('Ancho', '102" (2.60 m)'), ('Alto', '51" (1.295 m) quinta rueda'), ('Capacidad', '40 toneladas'), ('Peso', '7,000 kg')],
        'specs': groups(
            ('Referencia técnica', ['Referencia normativa indicada en la ficha: NOM-035-CST.']),
            (
                'Estructura',
                [
                    'Vigas principales con almas fabricadas en acero de alta resistencia A-572 grado 50 de 1/4" y patines en acero A-514 grado 100 de 1/2".',
                    'Placa de enganche de 3/8" en acero grado 50 con perno rey Wallace.',
                    'Corazas de 5/16" en acero de alta resistencia A-572 grado 50.',
                    'Cargadores tipo I de 80,000 lb.',
                    'Puentes tipo C fabricados en acero grado 50.',
                    'Bastidor con canal de 6", buchacas laterales, solera de 3/8" x 2 1/2" y ganchos loneros.',
                ],
            ),
            (
                'Seguridad y rodaje',
                [
                    'Defensa amortiguadora de impacto certificada conforme a NOM-035-SCT-2022 y DOT, con capacidad de 80,000 lb y diseño bumper tube de 4" x 4".',
                    'Protectores laterales normativos en cumplimiento con DOT.',
                    'Piso de madera de pino nacional de 1 1/2" de espesor.',
                    'Suspensión HT-300 HJ Rockwell de 30,000 lb y perfil bajo.',
                    'Tres ejes importados de 30,000 lb, track 77.5, booster doble y matracas autoajustables.',
                    'Frenos de aire con cámaras de doble diafragma y ABS Bendix con 2 sensores y 1 modulador.',
                ],
            ),
            (
                'Accesorios y sistemas',
                [
                    'Quince ganchos loneros por lado.',
                    'Loderas marca Chief y fondo epóxico para uretano.',
                    'Arnés eléctrico Grote y luces Grote reglamentarias.',
                    'Cuatro topes de hule y alineación con láser.',
                ],
            ),
        ),
    },
    {
        'slug': 'dolly-convertidor-tipo-a',
        'code': 'DC-A',
        'line': 'Convertidor',
        'name': 'Dolly Tipo A',
        'summary': 'Convertidor Dolly para acoplar remolques en operaciones de transporte pesado, con configuración ajustable y opciones de personalización.',
        'dimensions': [('Largo', '3.66 m'), ('Ancho', '2.60 m'), ('Alto', '1.45 m'), ('Capacidad', 'Por confirmar')],
        'specs': groups(
            (
                'Estructura',
                [
                    'Fabricado con viga formada en acero de alta resistencia.',
                    'Patines calibre 5/8" x 6" en acero A-36.',
                    'Cargadores tipo viga con alma de 1/4" en acero de alta resistencia.',
                    'Resistencia y patines en solera de 1/4" x 4".',
                ],
            ),
            (
                'Sistema de arrastre',
                [
                    'Suspensión neumática de 30,000 lb, con altura de trabajo de 15" a 17".',
                    'Eje tipo Propar de 30,000 lb con cámaras de aire dobles T30-30 y matracas autoajustables.',
                    'Quinta rueda Holland FW35.',
                    'Argolla de arrastre PRE245DB.',
                ],
            ),
            (
                'Accesorios y opciones',
                [
                    'Luces y arnés Grote.',
                    'Sistema ABS Bendix con 2 o 4 sensores.',
                    'Rines de acero o aluminio 11R, 22.5" x 8.25" con 10 birlos.',
                    'Llantas toda posición 11R, 22.5.',
                    'Pintura a elección del cliente.',
                    'Opcionales: sistema de autoinflado y sistema de levante retráctil.',
                    'Luces y cinta reflejante conforme al reglamento de tránsito en carreteras federales.',
                ],
            ),
        ),
    },
]


class SectionRule(Flowable):
    def __init__(self, width: float):
        super().__init__()
        self.width = width
        self.height = 1

    def draw(self) -> None:
        self.canv.setStrokeColor(LINE)
        self.canv.setLineWidth(0.6)
        self.canv.line(0, 0, self.width, 0)


def make_styles():
    base = getSampleStyleSheet()
    return {
        'tag': ParagraphStyle('Tag', parent=base['Normal'], fontName='Mono', fontSize=7.5, leading=10, textColor=RED, tracking=0.6),
        'title': ParagraphStyle('Title', parent=base['Normal'], fontName='Montserrat-Bold', fontSize=27, leading=29, textColor=INK, spaceAfter=8),
        'summary': ParagraphStyle('Summary', parent=base['Normal'], fontName='Inter', fontSize=10.2, leading=15, textColor=MUTED, spaceAfter=18),
        'section': ParagraphStyle('Section', parent=base['Normal'], fontName='Montserrat-Bold', fontSize=13, leading=16, textColor=INK, spaceBefore=15, spaceAfter=8),
        'group': ParagraphStyle('Group', parent=base['Normal'], fontName='Montserrat-Bold', fontSize=10.5, leading=13, textColor=WHITE),
        'section_label': ParagraphStyle('SectionLabel', parent=base['Normal'], fontName='Mono', fontSize=7.2, leading=9, textColor=WHITE, tracking=0.8),
        'item': ParagraphStyle('Item', parent=base['Normal'], fontName='Inter', fontSize=8.8, leading=12.5, textColor=MUTED, leftIndent=0, spaceAfter=5),
        'label': ParagraphStyle('Label', parent=base['Normal'], fontName='Mono', fontSize=6.8, leading=8.5, textColor=MUTED),
        'value': ParagraphStyle('Value', parent=base['Normal'], fontName='Montserrat-Bold', fontSize=10.5, leading=13, textColor=INK),
        'footer': ParagraphStyle('Footer', parent=base['Normal'], fontName='Mono', fontSize=6.8, leading=8, textColor=MUTED),
    }


def page_decor(canvas, doc) -> None:
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(INK)
    canvas.rect(0, height - 24 * mm, width, 24 * mm, stroke=0, fill=1)
    canvas.drawImage(str(LOGO_PATH), 14 * mm, height - 20.2 * mm, width=11 * mm, height=11 * mm, preserveAspectRatio=True, mask='auto')
    canvas.setFillColor(WHITE)
    canvas.setFont('Montserrat-Bold', 10)
    canvas.drawString(29 * mm, height - 15.4 * mm, 'CHIEF')
    canvas.setFont('Inter', 7)
    canvas.setFillColor(colors.HexColor('#D7D7D2'))
    canvas.drawString(29 * mm, height - 19.2 * mm, 'TRAILERS DEL NORTE')
    canvas.setFont('Mono', 6.5)
    canvas.setFillColor(colors.HexColor('#D7D7D2'))
    canvas.drawRightString(width - 14 * mm, height - 15.4 * mm, 'PRODUCT DATA / FICHA TÉCNICA')
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.6)
    canvas.line(14 * mm, 15 * mm, width - 14 * mm, 15 * mm)
    canvas.setFont('Mono', 6.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(14 * mm, 9.5 * mm, 'CHIEF TRAILERS DEL NORTE · 81 1636 5258 · chieftrailers.com.mx')
    canvas.drawRightString(width - 14 * mm, 9.5 * mm, f'{doc.page:02d}')
    canvas.restoreState()


def dimension_table(product: dict, styles: dict, available_width: float) -> Table:
    dims = product['dimensions']
    columns = len(dims)
    cell_width = available_width / columns
    cells = []
    for label, value in dims:
        cells.append([
            Paragraph(escape(label.upper()), styles['label']),
            Paragraph(escape(value), styles['value']),
        ])
    table = Table([cells], colWidths=[cell_width] * columns, rowHeights=[24 * mm])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), WHITE),
        ('BOX', (0, 0), (-1, -1), 0.6, LINE),
        ('INNERGRID', (0, 0), (-1, -1), 0.6, LINE),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 9),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 9),
    ]))
    return table


def group_block(number: int, group: dict[str, object], styles: dict, width: float):
    title = str(group['title'])
    items = group['items']
    header = Table([[
        Paragraph(f'<font color="#E31E24">{number:02d}</font>', styles['label']),
        Paragraph(escape(title), styles['group']),
    ]], colWidths=[12 * mm, width - 12 * mm])
    header.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), INK),
        ('BOX', (0, 0), (-1, -1), 0.6, INK),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (0, 0), 10),
        ('LEFTPADDING', (1, 0), (1, 0), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 9),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 9),
    ]))
    body = []
    for item in items:
        body.append(Paragraph(f'<font color="#E31E24">■</font>&nbsp;&nbsp;{escape(str(item))}', styles['item']))
    return [KeepTogether([header, Spacer(1, 6)]), *body]


def specification_label(styles: dict, width: float) -> Table:
    label = Table([[
        Paragraph('<font color="#E31E24">■</font>', styles['section_label']),
        Paragraph('ESPECIFICACIONES TÉCNICAS / EQUIPAMIENTO', styles['section_label']),
    ]], colWidths=[9 * mm, width - 9 * mm])
    label.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), INK),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (0, 0), 10),
        ('LEFTPADDING', (1, 0), (1, 0), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 9),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 9),
    ]))
    return label


def build_pdf(product: dict, output_path: Path) -> None:
    styles = make_styles()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=31 * mm,
        bottomMargin=22 * mm,
        title=f"Ficha técnica · {product['name']}",
        author='Chief Trailers del Norte',
        subject='Ficha técnica de producto',
    )
    content_width = A4[0] - doc.leftMargin - doc.rightMargin
    story = [
        Paragraph(f"{escape(str(product['line']).upper())} / {escape(str(product['code']))}", styles['tag']),
        Spacer(1, 5),
        Paragraph(escape(str(product['name'])), styles['title']),
        Paragraph(escape(str(product['summary'])), styles['summary']),
        dimension_table(product, styles, content_width),
        Spacer(1, 10),
        HRFlowable(width='100%', thickness=0.6, color=LINE, spaceBefore=0, spaceAfter=7),
        specification_label(styles, content_width),
        Spacer(1, 11),
    ]

    for index, group in enumerate(product['specs'], start=1):
        blocks = group_block(index, group, styles, content_width)
        story.extend(blocks)
        story.append(Spacer(1, 8))
        story.append(SectionRule(content_width))
        story.append(Spacer(1, 2))

    doc.build(story, onFirstPage=page_decor, onLaterPages=page_decor)


def main() -> int:
    register_fonts()
    output_dir = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / 'output/pdf/fichas'
    output_dir = output_dir if output_dir.is_absolute() else ROOT / output_dir
    for product in PRODUCTS:
        build_pdf(product, output_dir / f"{product['slug']}.pdf")
    print(f'Generated {len(PRODUCTS)} technical sheets in {output_dir}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
