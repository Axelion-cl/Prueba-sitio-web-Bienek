"use client";

import Image from "next/image";
import { Construction, Clock, Mail, Phone, ChevronRight } from "lucide-react";

export default function ConstructionPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Decorative Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
            />

            <div className="z-10 max-w-2xl w-full text-center space-y-12 transition-all duration-1000 animate-in fade-in slide-in-from-bottom-8">
                {/* Logo Section */}
                <div className="flex flex-col items-center space-y-2">
                    <div className="relative w-56 h-20 md:w-72 md:h-24">
                        <Image
                            src="/assets/images/logo.svg"
                            alt="Bienek Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <p className="text-gray-800 font-medium tracking-[0.2em] text-xs uppercase md:text-sm">
                        Soluciones Integrales de Limpieza
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-14 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-primary/20 relative overflow-hidden group">
                    {/* Animated Accent Bar */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-tertiary" />

                    <div className="inline-flex items-center justify-center p-4 bg-primary/5 rounded-2xl mb-8 group-hover:rotate-12 transition-transform duration-500 ease-out">
                        <Construction className="w-12 h-12 text-primary" />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-black mb-6 tracking-tight leading-none">
                        Sitio en <br className="md:hidden" />
                        <span className="text-primary italic">construcción</span>
                    </h1>

                    <p className="text-gray-600 text-lg md:text-xl max-w-md mx-auto leading-relaxed mb-10">
                        Estamos renovando nuestra plataforma para ofrecerte la mejor experiencia en distribución de productos industriales.
                    </p>

                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium mb-12">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Próximo lanzamiento 2026</span>
                    </div>

                    {/* Contact Methods */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-left">
                        <a href="mailto:ventas@bienek.cl"
                            className="flex items-center p-4 rounded-2xl bg-gray-50 hover:bg-primary/10 transition-colors group/item">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm mr-4">
                                <Mail className="w-5 h-5 text-gray-400 group-hover/item:text-primary transition-colors" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 font-semibold uppercase">Escríbenos</span>
                                <span className="text-sm font-bold text-black group-hover/item:text-primary transition-colors">ventas@bienek.cl</span>
                            </div>
                        </a>

                        <a href="tel:+56412635500"
                            className="flex items-center p-4 rounded-2xl bg-gray-50 hover:bg-primary/10 transition-colors group/item">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm mr-4">
                                <Phone className="w-5 h-5 text-gray-400 group-hover/item:text-primary transition-colors" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 font-semibold uppercase">Llámanos</span>
                                <span className="text-sm font-bold text-black group-hover/item:text-primary transition-colors">+56 41 - 2635500</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm border-t border-gray-100 pt-8 mt-12">
                    <p>&copy; {new Date().getFullYear()} Bienek SpA. Todos los derechos reservados.</p>
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Chile
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
