import { ContactForm } from "@/components/contacto/ContactForm";
import { PageTitle } from "@/components/ui/PageTitle";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactoPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* 1. Encabezado */}
            <div className="container mx-auto px-8 lg:px-24 pt-16 pb-12">
                <PageTitle className="mb-6">Contáctenos</PageTitle>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
                    Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos a la brevedad.
                </p>
            </div>

            <div className="container mx-auto px-8 lg:px-24 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* 2. Columna Izquierda: Formulario (ocupa 7 columnas en desktop) */}
                    <div className="lg:col-span-7">
                        <ContactForm />
                    </div>

                    {/* 3. Columna Derecha: Información (ocupa 5 columnas en desktop) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">

                        {/* Info Cards */}
                        <div className="space-y-6">
                            {/* Contact Info Card */}
                            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                    Información de Contacto
                                </h3>
                                <ul className="space-y-6">
                                    <li className="flex items-start gap-4">
                                        <div className="bg-primary/20 p-2.5 rounded-lg shrink-0 text-gray-800">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-bold text-gray-900 mb-1">Dirección</span>
                                            <span className="text-gray-600 leading-relaxed">Juan Sebastián Elcano 1910,<br />Hualpén, Talcahuano, Bío Bío.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="bg-primary/20 p-2.5 rounded-lg shrink-0 text-gray-800">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-bold text-gray-900 mb-1">Teléfono</span>
                                            <span className="text-gray-600">+56 41 - 2635500</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="bg-primary/20 p-2.5 rounded-lg shrink-0 text-gray-800">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-bold text-gray-900 mb-1">Ventas</span>
                                            <a href="mailto:ventas@bienek.cl" className="text-gray-600 hover:text-primary transition-colors">ventas@bienek.cl</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Horario Card */}
                            <div className="bg-gray-900 text-white rounded-xl p-6 shadow-lg">
                                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                    Horarios de Atención
                                </h3>
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 p-2.5 rounded-lg shrink-0">
                                        <Clock className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-gray-300 mb-1">Lunes a Viernes</span>
                                        <span className="text-xl font-medium text-white">8:00 - 18:00 hrs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Mapa - Full width dentro del container */}
            <div className="container mx-auto px-8 lg:px-24 pb-20">
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.8892843738244!2d-73.11547882357868!3d-36.78428997225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9669b5e9b5a76f11%3A0x3e5a8b8d8f0c5e5f!2sJuan%20Sebasti%C3%A1n%20Elcano%201910%2C%20Hualpén%2C%20B%C3%ADo%20B%C3%ADo!5e0!3m2!1ses!2scl!4v1704825091000!5m2!1ses!2scl"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación Casa Matriz Bienek"
                        className="absolute inset-0"
                    />
                </div>
            </div>
        </main>
    );
}
