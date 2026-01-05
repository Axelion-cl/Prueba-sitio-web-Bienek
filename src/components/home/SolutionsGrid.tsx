import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/typography";

const solutions = [
    { title: "Soluciones Generales de Higiene", image: "/assets/images/solutions/jardines.png" },
    { title: "Soluciones Especializadas sector Industrial y Almacenaje", image: "/assets/images/solutions/industria.png" },
    { title: "Soluciones Especializadas sector Institucional", image: "/assets/images/solutions/oficinas.png" },
    { title: "Soluciones Especializadas sector Educación", image: "/assets/images/solutions/educacion.png" },
    { title: "Soluciones Generales para sector Salud", image: "/assets/images/solutions/salud.png" },
    { title: "Soluciones Generales para sector HORECA", image: "/assets/images/solutions/horeca.png" },
    { title: "Soluciones Especializadas sector Veterinario", image: "/assets/images/solutions/veterinaria.png" },
    { title: "Equipamiento Accesorios", image: "/assets/images/solutions/limpieza-general.png" },
    { title: "Soluciones para Centros Adulto Mayor", image: "/assets/images/solutions/adulto-mayor.png" },
    { title: "Equipamientos de Maquinaria", image: "/assets/images/solutions/maquinaria.png" },
    { title: "Tratamiento de Aguas", image: "/assets/images/solutions/aguas.png" },
    { title: "Soluciones para Embarcaciones", image: "/assets/images/solutions/embarcaciones.png" },
];

export function SolutionsGrid() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 space-y-12">
                <div className="text-center">
                    <Heading>Nuestras Soluciones</Heading>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Productos especializados para cada industria y necesidad.
                    </p>
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
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity" />

                            {/* Text Content */}
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h3 className="text-white text-xl font-bold font-sans mb-1 group-hover:translate-y-[-4px] transition-transform">
                                    {item.title}
                                </h3>
                                <div className="h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300" />
                                <p className="text-gray-300 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                                    Ver productos →
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
