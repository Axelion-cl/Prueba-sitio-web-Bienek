'use client';

import { useState } from 'react';
import { sectors as initialSectors } from '@/data/sectors';
import { families as initialFamilies } from '@/data/families';
import { brands as initialBrands } from '@/data/brands';
import { badges as initialBadges } from '@/data/badges';
import { Edit, Trash2, Plus, Tag, Layers, Star, X, Save, Award, List } from 'lucide-react';
import Image from 'next/image';
import FeaturedFamiliesSelector from '@/components/admin/tags/FeaturedFamiliesSelector';

type Tab = 'sectors' | 'families' | 'brands' | 'badges';

// Constants
const BADGE_COLORS = [
    { name: 'Rojo', class: 'bg-red-500' },
    { name: 'Azul', class: 'bg-blue-500' },
    { name: 'Verde', class: 'bg-green-500' },
    { name: 'Amarillo', class: 'bg-yellow-500' },
    { name: 'Naranja', class: 'bg-orange-500' },
    { name: 'Morado', class: 'bg-purple-500' },
    { name: 'Rosa', class: 'bg-pink-500' },
    { name: 'Negro', class: 'bg-black' },
    { name: 'Gris', class: 'bg-gray-500' },
];

export default function TagsPage() {
    const [activeTab, setActiveTab] = useState<Tab>('sectors');

    // Mock State
    const [sectors, setSectors] = useState(initialSectors);
    const [families, setFamilies] = useState(initialFamilies);
    const [brands, setBrands] = useState(initialBrands);
    const [badges, setBadges] = useState(initialBadges);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);

    // Featured Families Modal State
    const [isFeaturedModalOpen, setIsFeaturedModalOpen] = useState(false);
    const [featuredSector, setFeaturedSector] = useState<any>(null);
    const [tempFeaturedIds, setTempFeaturedIds] = useState<string[]>([]);

    const openModal = (item?: any) => {
        setEditingItem(item);
        setFormData(item || {});
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({});
    };

    const handleSave = () => {
        if (activeTab === 'sectors') {
            if (editingItem) {
                setSectors(sectors.map(s => s.id === editingItem.id ? { ...s, ...formData } : s));
            } else {
                setSectors([...sectors, { ...formData, id: Date.now().toString(), slug: formData.title?.toLowerCase().replace(/ /g, '-') }]);
            }
        } else if (activeTab === 'families') {
            if (editingItem) {
                setFamilies(families.map(f => f.id === editingItem.id ? { ...f, ...formData } : f));
            } else {
                setFamilies([...families, { ...formData, id: Date.now().toString() }]);
            }
        } else if (activeTab === 'brands') {
            if (editingItem) {
                setBrands(brands.map(b => b.name === editingItem.name ? { ...b, ...formData } : b));
            } else {
                setBrands([...brands, { ...formData, logo: '/assets/images/logos/3M.png' }]);
            }
        } else if (activeTab === 'badges') {
            const finalColor = formData.color || 'bg-black'; // Default to black
            const badgeData = {
                ...formData,
                color: finalColor,
                lastEdited: new Date().toISOString().split('T')[0]
            };

            if (editingItem) {
                setBadges(badges.map(b => b.id === editingItem.id ? { ...b, ...badgeData } : b));
            } else {
                setBadges([...badges, { ...badgeData, id: Date.now().toString() }]);
            }
        }
        closeModal();
    };

    const handleDeleteClick = (item: any) => {
        setItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (!itemToDelete) return;

        const id = activeTab === 'brands' ? itemToDelete.name : itemToDelete.id;

        if (activeTab === 'sectors') setSectors(sectors.filter(s => s.id !== id));
        if (activeTab === 'families') setFamilies(families.filter(f => f.id !== id));
        if (activeTab === 'brands') setBrands(brands.filter(b => b.name !== id));
        if (activeTab === 'badges') setBadges(badges.filter(b => b.id !== id));

        setIsDeleteModalOpen(false);
        setItemToDelete(null);
    };

    const handleFeaturedFamiliesClick = (sector: any) => {
        setFeaturedSector(sector);
        setTempFeaturedIds(sector.featuredFamilies || []);
        setIsFeaturedModalOpen(true);
    };

    const saveFeaturedFamilies = () => {
        setSectors(sectors.map(s => s.id === featuredSector.id ? { ...s, featuredFamilies: tempFeaturedIds } : s));
        setIsFeaturedModalOpen(false);
        setFeaturedSector(null);
        setTempFeaturedIds([]);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Etiquetas</h1>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                    <Plus className="w-4 h-4" /> Nuevo {activeTab === 'sectors' ? 'Sector' : activeTab === 'families' ? 'Familia' : activeTab === 'brands' ? 'Marca' : 'Distintivo'}
                </button>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 flex gap-2 w-fit">
                <TabButton active={activeTab === 'sectors'} onClick={() => setActiveTab('sectors')} icon={Layers} label="Sectores" />
                <TabButton active={activeTab === 'families'} onClick={() => setActiveTab('families')} icon={Tag} label="Familias" />
                <TabButton active={activeTab === 'brands'} onClick={() => setActiveTab('brands')} icon={Star} label="Marcas" />
                <TabButton active={activeTab === 'badges'} onClick={() => setActiveTab('badges')} icon={Award} label="Distintivos" />
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {activeTab === 'sectors' && (
                    <Table
                        headers={['Nombre', 'Slug', 'Descripción', 'Acciones']}
                        rows={sectors.map(s => (
                            <tr key={s.id} className="hover:bg-gray-50 bg-white border-b border-gray-100 last:border-0">
                                <td className="px-6 py-4 font-medium text-gray-900">{s.title}</td>
                                <td className="px-6 py-4 text-gray-500">{s.slug}</td>
                                <td className="px-6 py-4 text-gray-500 text-sm truncate max-w-xs">{s.description}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleFeaturedFamiliesClick(s)}
                                            className="p-2 hover:bg-orange-50 rounded-lg text-orange-600 transition-colors"
                                            title="Gestionar Familias Destacadas"
                                        >
                                            <List className="w-4 h-4" />
                                        </button>
                                        <Actions onEdit={() => openModal(s)} onDelete={() => handleDeleteClick(s)} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    />
                )}

                {activeTab === 'families' && (
                    <Table
                        headers={['Nombre', 'Acciones']}
                        rows={families.map(f => (
                            <tr key={f.id} className="hover:bg-gray-50 bg-white border-b border-gray-100 last:border-0">
                                <td className="px-6 py-4 font-medium text-gray-900">{f.name}</td>
                                <td className="px-6 py-4"><Actions onEdit={() => openModal(f)} onDelete={() => handleDeleteClick(f)} /></td>
                            </tr>
                        ))}
                    />
                )}

                {activeTab === 'brands' && (
                    <Table
                        headers={['Logo', 'Nombre', 'Acciones']}
                        rows={brands.map((b, i) => (
                            <tr key={i} className="hover:bg-gray-50 bg-white border-b border-gray-100 last:border-0">
                                <td className="px-6 py-4">
                                    <div className="relative w-10 h-10 bg-white rounded border border-gray-200 overflow-hidden flex items-center justify-center p-1">
                                        <Image src={b.logo} alt={b.name} fill className="object-contain" />
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{b.name}</td>
                                <td className="px-6 py-4"><Actions onEdit={() => openModal(b)} onDelete={() => handleDeleteClick(b)} /></td>
                            </tr>
                        ))}
                    />
                )}

                {activeTab === 'badges' && (
                    <Table
                        headers={['Distintivo', 'Última Edición', 'Acciones']}
                        rows={badges.map(b => (
                            <tr key={b.id} className="hover:bg-gray-50 bg-white border-b border-gray-100 last:border-0">
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${b.color}`}>
                                        {b.name}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-sm">{b.lastEdited || new Date().toISOString().split('T')[0]}</td>
                                <td className="px-6 py-4"><Actions onEdit={() => openModal(b)} onDelete={() => handleDeleteClick(b)} /></td>
                            </tr>
                        ))}
                    />
                )}
            </div>

            {/* Edit/Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">{editingItem ? 'Editar' : 'Crear'} {activeTab}</h3>
                            <button onClick={closeModal}><X className="w-5 h-5 text-gray-500 hover:text-red-500" /></button>
                        </div>

                        <div className="space-y-3">
                            {activeTab === 'sectors' && (
                                <>
                                    <Input label="Nombre" value={formData.title} onChange={(v: string) => setFormData({ ...formData, title: v })} />
                                    <Input label="Slug" value={formData.slug} onChange={(v: string) => setFormData({ ...formData, slug: v })} />
                                    <Input label="Slug" value={formData.slug} onChange={(v: string) => setFormData({ ...formData, slug: v })} />
                                    <Input label="Descripción" value={formData.description} onChange={(v: string) => setFormData({ ...formData, description: v })} />
                                </>
                            )}
                            {activeTab === 'families' && (
                                <Input label="Nombre" value={formData.name} onChange={(v: string) => setFormData({ ...formData, name: v })} />
                            )}
                            {activeTab === 'brands' && (
                                <Input label="Nombre" value={formData.name} onChange={(v: string) => setFormData({ ...formData, name: v })} />
                            )}
                            {activeTab === 'badges' && (
                                <>
                                    <Input label="Nombre" value={formData.name} onChange={(v: string) => setFormData({ ...formData, name: v })} />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Color del distintivo</label>
                                        <div className="grid grid-cols-5 gap-3">
                                            {BADGE_COLORS.map(color => (
                                                <button
                                                    key={color.class}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, color: color.class })}
                                                    className={`w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-all ${color.class} ${formData.color === color.class ? 'ring-2 ring-offset-2 ring-gray-900 scale-110' : 'hover:scale-105'}`}
                                                    title={color.name}
                                                >
                                                    {formData.color === color.class && <div className="w-2 h-2 bg-white rounded-full" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex justify-end pt-4">
                            <button onClick={handleSave} className="bg-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-primary/90 flex items-center gap-2">
                                <Save className="w-4 h-4" /> Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 space-y-4 text-center">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                            <Trash2 className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">¿Estás seguro?</h3>
                            <p className="text-gray-500 mt-2">
                                Estás por eliminar <b>{itemToDelete?.title || itemToDelete?.name}</b>. Esta acción no se puede deshacer.
                            </p>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Featured Families Modal */}
            {isFeaturedModalOpen && featuredSector && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Familias Destacadas</h3>
                                <p className="text-sm text-gray-500">{featuredSector.title}</p>
                            </div>
                            <button onClick={() => setIsFeaturedModalOpen(false)}>
                                <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
                            </button>
                        </div>

                        <div className="py-2">
                            <FeaturedFamiliesSelector
                                selectedIds={tempFeaturedIds}
                                onSelect={setTempFeaturedIds}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => setIsFeaturedModalOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={saveFeaturedFamilies}
                                className="bg-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-primary/90 flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" /> Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helpers
function Input({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type="text"
                value={value || ''}
                onChange={e => onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
        </div>
    );
}

function TabButton({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
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

function Table({ headers, rows }: { headers: string[], rows: React.ReactNode[] }) {
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

function Actions({ onEdit, onDelete }: { onEdit: () => void, onDelete: () => void }) {
    return (
        <div className="flex gap-2">
            <button onClick={onEdit} className="p-2 hover:bg-gray-200 rounded-lg text-blue-600 transition-colors">
                <Edit className="w-4 h-4" />
            </button>
            <button onClick={onDelete} className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
}
