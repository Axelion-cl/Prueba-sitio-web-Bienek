"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, Globe, Truck, Clock, Phone, ChevronDown, Menu, X } from "lucide-react";
import { SearchBar } from "./SearchBar";

export function Header() {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState("Español");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLanguageSelect = (lang: string) => {
        setSelectedLang(lang);
        setIsLangOpen(false);
    };

    // Close mobile menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="w-full flex flex-col sticky top-0 z-[100] shadow-md" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
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
                            <Link href="#" className="hover:text-primary transition-colors">Empresa</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Bolsa de Trabajo</Link>
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
                            <Link href="#" className="hover:text-primary transition-colors">Soluciones</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Catálogo</Link>
                            <Link href="#" className="hover:text-primary transition-colors">Promociones</Link>
                        </nav>
                    </div>

                    {/* Right Side: Actions */}
                    <div className="flex items-center gap-8">
                        <Link href="#" className="hidden lg:block text-sm font-medium hover:text-primary transition-colors">
                            Blog Técnico
                        </Link>

                        <div className="hidden lg:flex items-center gap-2 text-sm font-medium cursor-pointer hover:text-primary transition-colors group">
                            <Image src="/assets/icons/acceso-clientes.svg" alt="Login" width={20} height={20} className="group-hover:opacity-80" />
                            <span>Acceso Clientes</span>
                        </div>

                        <Button className="hidden lg:flex bg-primary hover:bg-primary/90 text-black font-medium text-base rounded-full px-8 py-6 shadow-none">
                            CONTACTENOS
                        </Button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Panel - OUTSIDE Main Menu section */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
                    <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                        {/* Primary Links */}
                        <Link href="/" className="text-gray-700 font-medium hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Inicio</Link>
                        <Link href="#" className="text-gray-700 font-medium hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Soluciones</Link>
                        <Link href="#" className="text-gray-700 font-medium hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Catálogo</Link>
                        <Link href="#" className="text-gray-700 font-medium hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Promociones</Link>

                        <div className="h-px bg-gray-200 my-2" />

                        {/* Secondary Links */}
                        <Link href="#" className="text-gray-600 hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Blog Técnico</Link>
                        <Link href="#" className="text-gray-600 hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Empresa</Link>
                        <Link href="#" className="text-gray-600 hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Bolsa de Trabajo</Link>

                        <div className="h-px bg-gray-200 my-2" />

                        {/* Actions */}
                        <div className="flex items-center gap-2 text-gray-700 font-medium py-2">
                            <Image src="/assets/icons/acceso-clientes.svg" alt="Login" width={20} height={20} />
                            <span>Acceso Clientes</span>
                        </div>

                        <Button className="w-full bg-primary hover:bg-primary/90 text-black font-medium text-base rounded-full px-8 py-4 shadow-none">
                            CONTACTENOS
                        </Button>
                    </nav>
                </div>
            )}

            {/* 3. Brand Description Bar */}
            <div className="bg-white hidden lg:flex items-center" style={{ height: '60px' }}>
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
                    <div className="flex items-center justify-between w-full lg:w-1/3">
                        <span className="font-outfit font-normal text-lg hidden md:block tracking-wide">
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
