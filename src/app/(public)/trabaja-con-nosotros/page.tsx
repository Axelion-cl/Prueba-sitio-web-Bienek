import { JobApplicationForm } from "@/components/contacto/JobApplicationForm";

export default function TrabajaPage() {
    return (
        <main className="min-h-screen bg-white pb-20">
            {/* Header Section */}
            <section className="bg-gray-50 py-16 md:py-24 mb-12 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-sans font-normal text-black text-[2.5rem] md:text-[55px] leading-tight mb-6">
                        Trabaja con Nosotros
                    </h1>
                    <div className="mx-auto bg-[#ecec00] mb-6" style={{ width: '176px', height: '5px' }} />
                    <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                        Únete a un equipo líder en soluciones de higiene industrial y desarrolla tu carrera junto a los mejores profesionales.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto items-start">

                    {/* Left Column: Info & Values */}
                    <div className="w-full lg:w-5/12 space-y-8 lg:sticky lg:top-32">
                        <div className="space-y-6">
                            <h2 className="font-outfit font-normal text-3xl text-black leading-tight">
                                ¿Por qué unirte a Bienek?
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Buscamos personas apasionadas, comprometidas con la excelencia y con ganas de innovar en el sector de la distribución industrial. Ofrecemos un entorno de trabajo dinámico y oportunidades de crecimiento real.
                            </p>
                        </div>

                        {/* Benefits/Values List */}
                        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                            <h3 className="font-semibold text-xl mb-4 text-gray-900">Nuestros Beneficios</h3>
                            <ul className="space-y-4">
                                {[
                                    "Ambiente laboral colaborativo",
                                    "Oportunidades de capacitación continua",
                                    "Beneficios de salud complementarios",
                                    "Crecimiento profesional interno"
                                ].map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-[#ecec00] flex items-center justify-center flex-shrink-0">
                                            <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Application Form */}
                    <div className="w-full lg:w-7/12">
                        <JobApplicationForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
