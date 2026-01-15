'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    LayoutDashboard,
    Package,
    Users,
    FileText,
    LogOut,
    Settings,
    ChevronRight,
    Tag
} from 'lucide-react';
import Image from 'next/image';

const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Productos', href: '/admin/products', icon: Package },
    { name: 'Etiquetas', href: '/admin/tags', icon: Tag },
    { name: 'Clientes', href: '/admin/clients', icon: Users },
    { name: 'Cotizaciones', href: '/admin/quotes', icon: FileText },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <aside className="w-64 bg-black text-white flex flex-col h-screen sticky top-0">
            {/* Logo Area */}
            <div className="p-6 border-b border-gray-800">
                <Link href="/admin/dashboard" className="flex items-center gap-2">
                    {/* Using a white placeholder for logo or filter */}
                    <span className="font-bold text-xl text-primary">Bienek</span>
                    <span className="text-sm bg-gray-800 px-2 py-0.5 rounded text-gray-300">Admin</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${isActive
                                ? 'bg-primary text-black font-medium'
                                : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-gray-500 group-hover:text-white'}`} />
                            {item.name}
                            {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile & Logout */}
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}
