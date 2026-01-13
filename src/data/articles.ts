export interface Article {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    readTime: string;
}

export const articles: Article[] = [
    {
        id: "1",
        title: "Guía de Mantenimiento Industrial",
        excerpt: "Descubre las mejores prácticas para mantener tus equipos de limpieza industrial en óptimas condiciones y extender su vida útil con nuestros consejos expertos.",
        image: "/assets/images/blog-placeholder.png",
        category: "Guías de uso",
        date: "12 Ene, 2026",
        readTime: "5 min"
    },
    {
        id: "2",
        title: "Nuevas Regulaciones de Higiene 2026",
        excerpt: "Análisis detallado de las nuevas normativas sanitarias que afectan al sector hospitalario y cómo nuestros productos cumplen con los más altos estándares.",
        image: "/assets/images/blog-placeholder.png",
        category: "Novedades",
        date: "08 Ene, 2026",
        readTime: "8 min"
    },
    {
        id: "3",
        title: "Optimización de Procesos de Limpieza",
        excerpt: "Estrategias probadas para reducir tiempos y costos en la limpieza de grandes superficies comerciales sin sacrificar la calidad del resultado.",
        image: "/assets/images/blog-placeholder.png",
        category: "Técnico",
        date: "03 Ene, 2026",
        readTime: "6 min"
    },
    {
        id: "4",
        title: "Ficha Técnica: Desengrasante Industrial B-200",
        excerpt: "Todo lo que necesitas saber sobre nuestro producto estrella: composición, modos de uso, precauciones y aplicaciones recomendadas.",
        image: "/assets/images/blog-placeholder.png",
        category: "Fichas técnicas",
        date: "28 Dic, 2025",
        readTime: "4 min"
    },
    {
        id: "5",
        title: "Higienización en la Industria Alimentaria",
        excerpt: "Protocolos esenciales para evitar la contaminación cruzada y asegurar la inocuidad de los alimentos en plantas de procesamiento.",
        image: "/assets/images/blog-placeholder.png",
        category: "Guías de uso",
        date: "20 Dic, 2025",
        readTime: "7 min"
    },
    {
        id: "6",
        title: "Importancia del pH en Productos de Limpieza",
        excerpt: "Entiende cómo influye el pH en la efectividad de los detergentes y desinfectantes y cómo elegir el adecuado para cada superficie.",
        image: "/assets/images/blog-placeholder.png",
        category: "Técnico",
        date: "15 Dic, 2025",
        readTime: "5 min"
    }
];

export const allCategories = ["Todas", ...Array.from(new Set(articles.map(a => a.category)))];
