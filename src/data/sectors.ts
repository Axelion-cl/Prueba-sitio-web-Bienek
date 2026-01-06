export interface Sector {
    id: string;
    slug: string;
    title: string;
    description: string;
    fullDescription: string;
    icon: string; // Placeholder for now
    image: string;
}

export const sectors: Sector[] = [
    {
        id: "higiene",
        slug: "soluciones-generales-de-higiene",
        title: "Soluciones Generales de Higiene",
        description: "Productos esenciales para la limpieza diaria.",
        fullDescription: "En Bienek entendemos que la higiene fundamental es la base de cualquier operación segura y eficiente. Nuestra línea de soluciones generales abarca desde detergentes de alto rendimiento hasta implementos de limpieza ergonómicos, diseñados para maximizar la productividad y garantizar espacios impecables.",
        icon: "/assets/icons/higiene.svg",
        image: "/assets/images/solutions/jardines.png", // Using existing images as placeholders
    },
    {
        id: "industrial",
        slug: "soluciones-especializadas-sector-industrial-y-almacenaje",
        title: "Soluciones Especializadas sector Industrial y Almacenaje",
        description: "Limpieza profunda para entornos exigentes.",
        fullDescription: "El sector industrial requiere soluciones robustas que puedan enfrentar grasa, aceites y suciedad pesada. Ofrecemos productos químicos especializados y maquinaria de última generación para mantener sus plantas y almacenes operativos y seguros.",
        icon: "/assets/icons/industrial.svg",
        image: "/assets/images/solutions/industria.png",
    },
    {
        id: "salud",
        slug: "soluciones-especializadas-sector-salud",
        title: "Soluciones Especializadas sector Salud",
        description: "Higiene crítica para clínicas y hospitales.",
        fullDescription: "En el sector salud, la limpieza salva vidas. Nuestras soluciones cumplen con los más altos estándares de desinfección y esterilización, ayudando a prevenir infecciones asociadas a la atención de salud (IAAS) y protegiendo tanto a pacientes como a personal médico.",
        icon: "/assets/icons/salud.svg",
        image: "/assets/images/solutions/salud.png",
    },
    {
        id: "institucional",
        slug: "soluciones-especializadas-sector-institucional",
        title: "Soluciones Especializadas sector Institucional",
        description: "Limpieza para oficinas y edificios públicos.",
        fullDescription: "Mantenemos la imagen corporativa y el bienestar de los empleados con soluciones discretas y efectivas para oficinas, bancos y edificios gubernamentales. Aromatización, limpieza de alfombras y gestión de residuos.",
        icon: "/assets/icons/institucional.svg",
        image: "/assets/images/solutions/oficinas.png",
    },
    {
        id: "educacion",
        slug: "soluciones-especializadas-sector-educacion",
        title: "Soluciones Especializadas sector Educación",
        description: "Ambientes seguros para el aprendizaje.",
        fullDescription: "Desde jardines infantiles hasta universidades, garantizamos espacios limpios que promueven la salud y reducen el ausentismo. Productos seguros, no tóxicos y sistemas de higiene para baños de alto tráfico.",
        icon: "/assets/icons/educacion.svg",
        image: "/assets/images/solutions/educacion.png",
    },
    {
        id: "adulto-mayor",
        slug: "soluciones-para-centros-adulto-mayor",
        title: "Soluciones para Centros Adulto Mayor",
        description: "Cuidado delicado para espacios residenciales.",
        fullDescription: "Soluciones enfocadas en la desinfección suave pero efectiva, control de olores y productos para el cuidado personal, creando un ambiente digno, limpio y acogedor para los residentes.",
        icon: "/assets/icons/adulto-mayor.svg",
        image: "/assets/images/solutions/adulto-mayor.png",
    },
    {
        id: "horeca",
        slug: "soluciones-especializadas-sector-horeca",
        title: "Soluciones Especializadas sector HORECA",
        description: "Impecabilidad para Hoteles, Restaurantes y Catering.",
        fullDescription: "La limpieza es la carta de presentación en la hospitalidad. Ofrecemos soluciones integrales para cocina, housekeeping y lavandería, garantizando la seguridad alimentaria y la satisfacción total del huésped.",
        icon: "/assets/icons/horeca.svg",
        image: "/assets/images/solutions/horeca.png",
    },
    {
        id: "veterinario",
        slug: "soluciones-especializadas-sector-veterinario",
        title: "Soluciones Especializadas sector Veterinario",
        description: "Desinfección segura para clínicas veterinarias.",
        fullDescription: "Productos específicos que eliminan patógenos animales (parvovirus, distemper) sin dañar a las mascotas. Control de olores potente y desinfección de quirófanos y caniles.",
        icon: "/assets/icons/veterinario.svg",
        image: "/assets/images/solutions/veterinaria.png",
    },
    {
        id: "accesorios",
        slug: "equipamiento-accesorios",
        title: "Equipamiento Accesorios",
        description: "Herramientas manuales de alto rendimiento.",
        fullDescription: "Desde carros de limpieza ergonómicos hasta paños de microfibra de última tecnología. Proveemos todas las herramientas necesarias para facilitar el trabajo del personal de limpieza.",
        icon: "/assets/icons/accesorios.svg",
        image: "/assets/images/solutions/limpieza-general.png",
    },
    {
        id: "maquinaria",
        slug: "equipamientos-de-maquinaria",
        title: "Equipamientos de Maquinaria",
        description: "Tecnología para grandes superficies.",
        fullDescription: "Venta y arriendo de aspiradoras industriales, restregadoras, barredoras e hidrolavadoras top de línea para maximizar la eficiencia en grandes áreas.",
        icon: "/assets/icons/maquinaria.svg",
        image: "/assets/images/solutions/maquinaria.png",
    },
    {
        id: "aguas",
        slug: "tratamiento-de-agua",
        title: "Tratamiento de Agua",
        description: "Soluciones químicas para calidad del agua.",
        fullDescription: "Polímeros, coagulantes y desinfectantes para el tratamiento de aguas industriales y potables, asegurando el cumplimiento normativo y la sostenibilidad.",
        icon: "/assets/icons/aguas.svg",
        image: "/assets/images/solutions/aguas.png",
    },
    {
        id: "embarcaciones",
        slug: "soluciones-para-embarcaciones",
        title: "Soluciones para Embarcaciones",
        description: "Limpieza especializada marítima.",
        fullDescription: "Productos biodegradables certificados para uso marítimo. Limpieza de sentinas, cubiertas y camarotes, cumpliendo con las estrictas normas ambientales del sector.",
        icon: "/assets/icons/embarcaciones.svg",
        image: "/assets/images/solutions/embarcaciones.png",
    },
];

export function getSectorBySlug(slug: string): Sector | undefined {
    return sectors.find(s => s.slug === slug);
}
