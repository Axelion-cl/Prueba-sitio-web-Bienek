import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/typography";

const solutions = [
    {
        title: "Soluciones Generales de Higiene",
        image: "/assets/images/solutions/jardines.png",
        subcategories: ["Limpieza de Pisos", "Desinfección", "Baños", "Aromas"]
    },
    {
        title: "Soluciones Especializadas sector Industrial y Almacenaje",
        image: "/assets/images/solutions/industria.png",
        subcategories: ["Desengrasantes", "Limpiadores Industriales", "Absorbentes", "Protección Personal"]
    },
    {
        title: "Soluciones Especializadas sector Institucional",
        image: "/assets/images/solutions/oficinas.png",
        subcategories: ["Limpieza General", "Papelería", "Baños Públicos", "Alfombras"]
    },
    {
        title: "Soluciones Especializadas sector Educación",
        image: "/assets/images/solutions/educacion.png",
        subcategories: ["Aulas", "Baños y Vestidores", "Patios", "Comedores"]
    },
    {
        title: "Soluciones Generales para sector Salud",
        image: "/assets/images/solutions/salud.png",
        subcategories: ["Desinfección Hospitalaria", "Esterilización", "Cuidado de Pacientes", "Áreas Críticas"]
    },
    {
        title: "Soluciones Generales para sector HORECA",
        image: "/assets/images/solutions/horeca.png",
        subcategories: ["Cocina", "Limpieza de Mesas", "Lavandería", "Baños"]
    },
    {
        title: "Soluciones Especializadas sector Veterinario",
        image: "/assets/images/solutions/veterinaria.png",
        subcategories: ["Desinfección de Jaulas", "Quirófanos", "Salas de Espera", "Control de Olores"]
    },
    {
        title: "Equipamiento Accesorios",
        image: "/assets/images/solutions/limpieza-general.png",
        subcategories: ["Mopas y Carros", "Paños", "Escobas", "Señalética"]
    },
    {
        title: "Soluciones para Centros Adulto Mayor",
        image: "/assets/images/solutions/adulto-mayor.png",
        subcategories: ["Higiene Personal", "Incontinencia", "Desinfección", "Lavandería"]
    },
    {
        title: "Equipamientos de Maquinaria",
        image: "/assets/images/solutions/maquinaria.png",
        subcategories: ["Aspiradoras", "Abrillantadoras", "Barredoras", "Hidrolavadoras"]
    },
    {
        title: "Tratamiento de Aguas",
        image: "/assets/images/solutions/aguas.png",
        subcategories: ["Cloración", "Filtración", "Medición", "Bombas"]
    },
    {
        title: "Soluciones para Embarcaciones",
        image: "/assets/images/solutions/embarcaciones.png",
        subcategories: ["Limpieza de Cascos", "Interiores", "Motores", "Desengrasantes"]
    },
];

export function SolutionsGrid() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 space-y-12">
                <div className="text-center">
                    <Heading>Nuestras Soluciones</Heading>
                    <div className="mx-auto mt-4 bg-[#ecec00] rounded-full" style={{ width: '176px', height: '5px' }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {solutions.map((item, index) => (
                        <Link
                            href="#"
                            key={index}
                            className="group relative h-64 w-full overflow-hidden rounded-2xl shadow-md block"
                        >
                            {/* Background Image */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover blur-on-hover group-hover:scale-110"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity" />

                            {/* Text Content */}
                            <div className="absolute bottom-0 left-0 p-6 w-full transform transition-all duration-300 group-hover:-translate-y-2">
                                <h3 className="text-white text-xl font-bold font-sans mb-1 transition-transform duration-300">
                                    {item.title}
                                </h3>
                                <div className="h-0.5 w-0 bg-primary group-hover:w-16 transition-all duration-300 mb-2" />

                                {/* Dropdown Menu (Internal Hover) */}
                                <ul className="space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 h-0 group-hover:h-auto overflow-hidden">
                                    {item.subcategories.map((sub, i) => (
                                        <li key={i} className="text-gray-200 text-sm hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                                            <span className="w-1 h-1 bg-primary rounded-full" />
                                            {sub}
                                        </li>
                                    ))}
                                    <li className="pt-2 text-primary text-sm font-medium flex items-center gap-1 cursor-pointer hover:underline">
                                        Ver todo el sector
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
