import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-16 mt-auto">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 font-sans">

                {/* 1. Logo Column - Aligned left */}
                <div className="flex flex-col justify-start">
                    <Link href="/" className="inline-block">
                        <Image
                            src="/assets/images/logo.svg"
                            alt="Bienek Logo"
                            width={180}
                            height={60}
                            className="h-12 w-auto object-contain"
                        />
                    </Link>
                </div>

                {/* 2. Casa Matriz */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-black">
                        <Image src="/assets/icons/casa-matriz.svg" alt="" width={24} height={24} />
                        <h3 className="font-sans font-semibold text-lg leading-6">Casa Matriz</h3>
                    </div>
                    <div className="space-y-1 text-black font-sans font-normal text-base leading-[28px]">
                        <p>Juan Sebastián Elcano 1910,</p>
                        <p>Parque Industrial San Andrés</p>
                        <p>Hualpén / Concepción / Chile</p>
                    </div>
                </div>

                {/* 3. Contacto */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-black">
                        <Image src="/assets/icons/telefono.svg" alt="" width={24} height={24} />
                        <h3 className="font-sans font-semibold text-lg leading-6">Contacto</h3>
                    </div>
                    <div className="space-y-1 text-black font-sans font-normal text-base leading-[28px]">
                        <p>Teléfono: +56 41-2635500</p>
                        <div className="flex flex-col">
                            <p>Horario De Atención:</p>
                            <p>Lunes A Viernes De 8:00 A 18:00.</p>
                        </div>
                        <p>Correo: ventas@bienek.cl</p>
                    </div>
                </div>

                {/* 4. Información Útil */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-black">
                        <Image src="/assets/icons/informacion-util.svg" alt="" width={24} height={24} />
                        <h3 className="font-sans font-semibold text-lg leading-6">Información útil</h3>
                    </div>
                    <nav className="flex flex-col gap-1 text-black font-sans font-normal text-base leading-7">
                        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                        <Link href="/empresa" className="hover:text-primary transition-colors">Empresa</Link>
                        <Link href="/trabaja-con-nosotros" className="hover:text-primary transition-colors">Trabaja Con Nosotros</Link>
                    </nav>
                </div>

            </div>

            {/* Copyright */}
            <div className="container mx-auto px-4 mt-12 pt-6 border-t border-gray-100 text-center text-xs text-gray-400 font-sans">
                © {new Date().getFullYear()} Bienek. Todos los derechos reservados.
            </div>
        </footer>
    );
}
