'use client';

import { useState } from 'react';
import { sectors } from '@/data/sectors';
import { families, Family } from '@/data/families';
import { brands, Brand } from '@/data/brands';
import { Edit, Trash2, Plus, Tag, Layers, Star } from 'lucide-react';
import Image from 'next/image';

type Tab = 'sectors' | 'families' | 'brands';

export default function TagsPage() {
    const [activeTab, setActiveTab] = useState<Tab>('sectors');

    // Mock Delete Handlers
    const handleDelete = (id: string, type: string) => {
        if (confirm(`¿Estás seguro de eliminar este elemento de ${type}?`)) {
            alert('Eliminación simulada (Frontend Only)');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Etiquetas</h1>
                <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                    <Plus className="w-4 h-4" /> Nuevo {activeTab === 'sectors' ? 'Sector' : activeTab === 'families' ? 'Familia' : 'Marca'}
                </button>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 flex gap-2 w-fit">
                <TabButton
                    active={activeTab === 'sectors'}
                    onClick={() => setActiveTab('sectors')}
                    icon={Layers}
                    label="Sectores"
                />
                <TabButton
                    active={activeTab === 'families'}
                    onClick={() => setActiveTab('families')}
                    icon={Tag}
                    label="Familias"
                />
                <TabButton
                    active={activeTab === 'brands'}
                    onClick={() => setActiveTab('brands')}
                    icon={Star}
                    label="Marcas"
                />
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {activeTab === 'sectors' && (
                    <Table
                        headers={['Icono', 'Nombre', 'Slug', 'Acciones']}
                        rows={sectors.map(s => (
                            <tr key={s.id} className="hover:bg-gray-50 bg-white border-b border-gray-100 last:border-0">
                                <td className="px-6 py-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                                        {/* Mock Icon handling */}
                                        <span className="text-xs text-gray-500">Icon</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{s.title}</td>
                                <td className="px-6 py-4 text-gray-500">{s.slug}</td>
                                <td className="px-6 py-4">
                                    <Actions onDelete={() => handleDelete(s.id, 'Sectores')} />
                                </td>
                            </tr>
                        ))}
                    />
                )}

                {activeTab === 'families' && (
                    <Table
                        headers={['Nombre', 'Sector Asociado', 'Acciones']}
                        rows={families.map(f => {
                            const sector = sectors.find(s => s.id === f.sectorId);
                            return (
                                <tr key={f.id} className="hover:bg-gray-50 bg-white border-b border-gray-100 last:border-0">
                                    <td className="px-6 py-4 font-medium text-gray-900">{f.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                            {sector?.title || 'Sector Desconocido'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Actions onDelete={() => handleDelete(f.id, 'Familias')} />
                                    </td>
                                </tr>
                            );
                        })}
                    />
                )}

                {activeTab === 'brands' && (
                    <Table
                        headers={['Logo', 'Nombre', 'Acciones']}
                        rows={brands.map((b, i) => (
                            <tr key={i} className="hover:bg-gray-50 bg-white border-b border-gray-100 last:border-0">
                                <td className="px-6 py-4">
                                    <div className="relative w-12 h-12 bg-white rounded border border-gray-200 overflow-hidden flex items-center justify-center p-1">
                                        <Image src={b.logo} alt={b.name} fill className="object-contain" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{b.name}</td>
                                <td className="px-6 py-4">
                                    <Actions onDelete={() => handleDelete(b.name, 'Marcas')} />
                                </td>
                            </tr>
                        ))}
                    />
                )}
            </div>
        </div>
    );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium text-sm ${active ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    );
}

function Table({ headers, rows }: any) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                    <tr>
                        {headers.map((h: string) => (
                            <th key={h} className="px-6 py-3 font-semibold">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}

function Actions({ onDelete }: { onDelete: () => void }) {
    return (
        <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-200 rounded-lg text-blue-600 transition-colors">
                <Edit className="w-4 h-4" />
            </button>
            <button
                onClick={onDelete}
                className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
