"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, Globe, Truck, Clock, Phone, ChevronDown } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { solutions } from "@/data/solutions";

export function Header() {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState("Español");
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const headerHeight = headerRef.current?.offsetHeight || 200;

            // Only apply hide/show logic after scrolling past the header
            if (currentScrollY > headerHeight) {
                // Scrolling down - hide header
                if (currentScrollY > lastScrollY.current + 10) {
                    setIsVisible(false);
                }
                // Scrolling up - show header
                else if (currentScrollY < lastScrollY.current - 10) {
                    setIsVisible(true);
                }
            } else {
                // At or near top - always show
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLanguageSelect = (lang: string) => {
        setSelectedLang(lang);
        setIsLangOpen(false);
    };

    return (
        <header
            ref={headerRef}
            className={`w-full flex flex-col sticky top-0 z-[100] shadow-md transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
        >
            {/* 1. Utility Bar */}
            <div className="bg-black text-white py-3 hidden lg:block relative" style={{ zIndex: 30 }}>
                <div className="container mx-auto px-4 flex justify-between items-center font-sans">
                    {/* Left: Language & Links */}
                    <div className="flex items-center gap-8">
                        <div className="relative">
                            <div
                                className="flex items-center gap-6 cursor-pointer group"
                                onClick={() => setIsLangOpen(!isLangOpen)}
                            >
                                <Globe className="w-6 h-6 text-white" />
                                <div className="flex flex-col leading-tight">
                                    <span className="text-sm font-medium text-white">Idioma</span>
                                    <span className="text-sm text-white group-hover:text-primary transition-colors flex items-center gap-1">
                                        {selectedLang} <ChevronDown className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                                    </span>
                                </div>
                            </div>
                            {/* Dropdown Menu */}
                            {isLangOpen && (
                                <div
                                    className="absolute top-full left-0 mt-2 bg-black border border-gray-700 rounded-lg py-2 min-w-[140px] shadow-xl"
                                    style={{ zIndex: 50 }}
                                >
                                    <button
                                        onClick={() => handleLanguageSelect("Español")}
                                        className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-gray-800 transition-colors flex items-center justify-between"
                                    >
                                        <span>Español</span>
                                        {selectedLang === "Español" && <span className="text-primary">✓</span>}
                                    </button>
                                    <button
                                        onClick={() => handleLanguageSelect("English")}
                                        className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-gray-800 transition-colors flex items-center justify-between"
                                    >
                                        <span>English</span>
                                        {selectedLang === "English" && <span className="text-primary">✓</span>}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-6 text-sm font-medium text-gray-300">
                            <Link href="/empresa" className="hover:text-primary transition-colors">Empresa</Link>
                            <Link href="/trabaja-con-nosotros" className="hover:text-primary transition-colors">Bolsa de Trabajo</Link>
                        </div>
                    </div>

                    {/* Right: Info Items */}
                    <div className="flex items-center gap-12">
                        {/* Cobertura */}
                        <div className="flex items-center gap-4">
                            <Truck className="w-8 h-8 text-white" />
                            <div className="flex flex-col leading-tight">
                                <span className="text-xs text-gray-300">Cobertura:</span>
                                <span className="text-sm text-white">RM - X Región.</span>
                            </div>
                        </div>

                        {/* Horario */}
                        <div className="flex items-center gap-4">
                            <Clock className="w-8 h-8 text-white" />
                            <div className="flex flex-col leading-tight">
                                <span className="text-xs text-gray-300">Horario de atención:</span>
                                <span className="text-sm text-white">8:00 a 18:00 hrs</span>
                            </div>
                        </div>

                        {/* Contacto */}
                        <div className="flex items-center gap-4">
                            <Phone className="w-8 h-8 text-white" />
                            <div className="flex flex-col leading-tight">
                                <a href="mailto:ventas@bienek.cl" className="text-sm text-white hover:text-primary transition-colors">
                                    ventas@bienek.cl
                                </a>
                                <span className="text-sm text-white">+56 41 - 2635500</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Main Menu */}
            <div className="bg-white py-4 z-20 relative">
                <div className="container mx-auto px-4 flex justify-between items-center">

                    {/* Left Side: Logo + Nav */}
                    <div className="flex items-center gap-12">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0">
                            <Image
                                src="/assets/images/logo.svg"
                                alt="Bienek Logo"
                                width={180}
                                height={60}
                                className="h-12 w-auto object-contain"
                                priority
                            />
                        </Link>

                        {/* Nav Links (Desktop) */}
                        <nav className="hidden lg:flex items-center gap-8 font-sans font-medium text-base text-gray-700">
                            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>

                            {/* Soluciones Dropdown */}
                            <div className="group relative h-full flex items-center">
                                <Link
                                    href="/soluciones/soluciones-generales-de-higiene"
                                    className="flex items-center gap-1 hover:text-primary transition-colors py-4"
                                >
                                    Soluciones
                                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 opacity-70" />
                                </Link>

                                {/* Dropdown Menu */}
                                <div className="absolute top-full -left-20 w-[600px] bg-white rounded-xl shadow-xl border border-gray-100 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                        {solutions.map((bg) => (
                                            <Link
                                                key={bg.slug}
                                                href={`/soluciones/${bg.slug}`}
                                                className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                {/* Dot indicator */}
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/item:bg-primary transition-colors shrink-0" />

                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-700 group-hover/item:text-black transition-colors">
                                                        {bg.title}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Link href="/promociones" className="hover:text-primary transition-colors">Promociones</Link>
                        </nav>
                    </div>

                    {/* Right Side: Actions */}
                    <div className="flex items-center gap-8">
                        <Link href="/blog" className="hidden lg:block text-base font-medium hover:text-primary transition-colors">
                            Blog Técnico
                        </Link>

                        <div className="flex items-center gap-2 text-base font-medium cursor-pointer hover:text-primary transition-colors group">
                            <Image src="/assets/icons/acceso-clientes.svg" alt="Login" width={20} height={20} className="group-hover:opacity-80" />
                            <span>Acceso Clientes</span>
                        </div>

                        <Link href="/contacto" className="cursor-pointer">
                            <Button className="bg-primary hover:bg-primary/90 text-black font-medium text-base rounded-full px-8 py-6 shadow-none cursor-pointer">
                                CONTACTENOS
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* 3. Brand Description Bar */}
            <div className="bg-white hidden lg:flex items-start pt-2" style={{ height: '60px' }}>
                <div className="container mx-auto px-4">
                    <p className="font-sans text-xl text-gray-800 tracking-wide">
                        Soluciones Integrales de Limpieza
                    </p>
                </div>
            </div>

            {/* 4. Search Bar & Statement */}
            <div className="bg-black text-white flex items-center" style={{ height: '60px' }}>
                <div className="container mx-auto px-4 flex justify-between items-center h-full">

                    {/* Search Input */}
                    <SearchBar />

                    {/* Statement & Seal */}
                    <div className="flex items-center gap-6">
                        <span className="font-outfit font-normal text-lg hidden md:block tracking-wide whitespace-nowrap">
                            Líderes en Distribución de productos de Higiene
                        </span>
                        <div className="flex items-center">
                            <Image
                                src="/assets/images/lema-bienek.png"
                                alt="Sello Bienek"
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
}
