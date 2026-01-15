'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Users, UserPlus, Mail, Phone, Plus,
    FileText, Key, Trash2, Copy, Check, X, AlertTriangle, Save
} from 'lucide-react';
import { mockLeads, mockClients, Lead, Client } from '@/data/mockCRM';

export default function ClientsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'leads' | 'clients'>('leads');

    // Mock State
    const [leads, setLeads] = useState<Lead[]>(mockLeads);
    const [clients, setClients] = useState<Client[]>(mockClients);

    // Modal States
    const [passwordModal, setPasswordModal] = useState<{ isOpen: boolean; email: string; password: string }>({
        isOpen: false, email: '', password: ''
    });
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; clientId: string; clientName: string }>({
        isOpen: false, clientId: '', clientName: ''
    });
    const [newLeadModal, setNewLeadModal] = useState(false);
    const [newLeadForm, setNewLeadForm] = useState({ name: '', email: '', message: '', company: '', phone: '' });

    const [adminPassword, setAdminPassword] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [copied, setCopied] = useState(false);

    const generateTempPassword = () => {
        const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
        return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };

    const handleAddLead = () => {
        if (!newLeadForm.name || !newLeadForm.email) {
            alert('Por favor completa al menos el nombre y email.');
            return;
        }

        const newLead: Lead = {
            id: `lead-${Date.now()}`,
            name: newLeadForm.name,
            email: newLeadForm.email,
            message: newLeadForm.message || 'Agregado manualmente por admin',
            date: new Date().toISOString().split('T')[0],
            status: 'new',
            company: newLeadForm.company,
            phone: newLeadForm.phone
        };

        setLeads([newLead, ...leads]);
        setNewLeadModal(false);
        setNewLeadForm({ name: '', email: '', message: '', company: '', phone: '' });
    };

    const handleConvertLead = (lead: Lead) => {
        if (!confirm(`¿Convertir a ${lead.name} en cliente? Se generarán y enviarán credenciales.`)) return;

        setLeads(leads.filter(l => l.id !== lead.id));

        const newClient: Client = {
            id: `client-${Date.now()}`,
            name: lead.name,
            email: lead.email,
            registrationDate: new Date().toISOString().split('T')[0],
            status: 'active',
            company: lead.company || 'Sin empresa',
            phone: lead.phone
        };
        setClients([newClient, ...clients]);

        const tempPass = generateTempPassword();
        setPasswordModal({ isOpen: true, email: lead.email, password: tempPass });
    };

    const handleResetPassword = (client: Client) => {
        const tempPass = generateTempPassword();
        setPasswordModal({ isOpen: true, email: client.email, password: tempPass });
    };

    const handleCopyPassword = async () => {
        await navigator.clipboard.writeText(passwordModal.password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openDeleteModal = (client: Client) => {
        setDeleteModal({ isOpen: true, clientId: client.id, clientName: client.name });
        setAdminPassword('');
        setDeleteError('');
    };

    const handleDeleteConfirm = () => {
        if (adminPassword !== 'admin123') {
            setDeleteError('Contraseña incorrecta. Intenta de nuevo.');
            return;
        }

        setClients(clients.filter(c => c.id !== deleteModal.clientId));
        setDeleteModal({ isOpen: false, clientId: '', clientName: '' });
        setAdminPassword('');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestión de Clientes (CRM)</h1>
                    <p className="text-gray-500">Administra leads y clientes registrados.</p>
                </div>
                {activeTab === 'leads' && (
                    <button
                        onClick={() => setNewLeadModal(true)}
                        className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        <Plus className="w-4 h-4" /> Nuevo Lead
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('leads')}
                    className={`pb-3 px-1 font-medium text-sm transition-colors relative ${activeTab === 'leads' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900'
                        }`}
                >
                    Potenciales Clientes (Leads)
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                        {leads.length}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('clients')}
                    className={`pb-3 px-1 font-medium text-sm transition-colors relative ${activeTab === 'clients' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900'
                        }`}
                >
                    Clientes Actuales
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                        {clients.length}
                    </span>
                </button>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {activeTab === 'leads' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">Nombre / Empresa</th>
                                    <th className="px-6 py-3">Contacto</th>
                                    <th className="px-6 py-3">Mensaje Inicial</th>
                                    <th className="px-6 py-3">Fecha</th>
                                    <th className="px-6 py-3 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.length === 0 ? (
                                    <tr><td colSpan={5} className="text-center py-8 text-gray-500">No hay leads pendientes.</td></tr>
                                ) : leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50 border-b border-gray-100 last:border-0">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{lead.name}</div>
                                            {lead.company && <div className="text-xs text-gray-500">{lead.company}</div>}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 space-y-1">
                                            <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {lead.email}</div>
                                            {lead.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {lead.phone}</div>}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 truncate max-w-xs" title={lead.message}>{lead.message}</td>
                                        <td className="px-6 py-4 text-gray-500">{lead.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleConvertLead(lead)}
                                                className="inline-flex items-center gap-1 bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-green-200"
                                            >
                                                <UserPlus className="w-3 h-3" /> Convertir a Cliente
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'clients' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">Cliente</th>
                                    <th className="px-6 py-3">Contacto</th>
                                    <th className="px-6 py-3">Registro</th>
                                    <th className="px-6 py-3">Estado</th>
                                    <th className="px-6 py-3 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client) => (
                                    <tr key={client.id} className="hover:bg-gray-50 border-b border-gray-100 last:border-0">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{client.name}</div>
                                            {client.company && <div className="text-xs text-gray-500">{client.company}</div>}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 space-y-1">
                                            <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {client.email}</div>
                                            {client.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> {client.phone}</div>}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{client.registrationDate}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${client.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {client.status === 'active' ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => router.push(`/admin/clients/${client.id}/orders`)}
                                                    className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-primary transition-colors"
                                                    title="Ver Órdenes"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleResetPassword(client)}
                                                    className="p-1.5 hover:bg-yellow-50 rounded text-yellow-600 transition-colors"
                                                    title="Resetear Contraseña"
                                                >
                                                    <Key className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(client)}
                                                    className="p-1.5 hover:bg-red-50 rounded text-red-600 transition-colors"
                                                    title="Eliminar Cliente"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* New Lead Modal */}
            {newLeadModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900">Agregar Nuevo Lead</h3>
                            <button onClick={() => setNewLeadModal(false)}>
                                <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                                <input
                                    type="text"
                                    value={newLeadForm.name}
                                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    placeholder="Nombre del potencial cliente"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                                    <input
                                        type="text"
                                        value={newLeadForm.company}
                                        onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="Nombre de empresa"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                    <input
                                        type="tel"
                                        value={newLeadForm.phone}
                                        onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="+56 9 ..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <input
                                    type="email"
                                    value={newLeadForm.email}
                                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                    placeholder="correo@empresa.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje / Nota</label>
                                <textarea
                                    rows={3}
                                    value={newLeadForm.message}
                                    onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                                    placeholder="Notas sobre este lead..."
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => setNewLeadModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAddLead}
                                className="bg-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-primary/90 flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" /> Agregar Lead
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Password Reset Modal */}
            {passwordModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900">Nueva Contraseña Generada</h3>
                            <button onClick={() => setPasswordModal({ isOpen: false, email: '', password: '' })}>
                                <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
                            </button>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-sm text-green-700 mb-2">
                                Contraseña temporal para: <strong>{passwordModal.email}</strong>
                            </p>
                            <div className="flex items-center gap-2">
                                <code className="flex-1 bg-white px-4 py-3 rounded-lg font-mono text-lg text-center border border-green-300 select-all">
                                    {passwordModal.password}
                                </code>
                                <button
                                    onClick={handleCopyPassword}
                                    className={`p-3 rounded-lg transition-colors ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                                        }`}
                                    title="Copiar al portapapeles"
                                >
                                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500">
                            El usuario deberá cambiar esta contraseña en su primer inicio de sesión.
                        </p>

                        <div className="flex justify-end pt-2">
                            <button
                                onClick={() => setPasswordModal({ isOpen: false, email: '', password: '' })}
                                className="bg-primary text-black px-4 py-2 rounded-lg font-medium hover:bg-primary/90"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 space-y-4">
                        <div className="flex items-center gap-3 text-red-600">
                            <div className="p-2 bg-red-100 rounded-full">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold">Confirmar Eliminación</h3>
                        </div>

                        <p className="text-sm text-gray-600">
                            Estás a punto de eliminar a <strong>{deleteModal.clientName}</strong>.
                            Esta acción no se puede deshacer.
                        </p>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ingresa tu contraseña de administrador:
                            </label>
                            <input
                                type="password"
                                value={adminPassword}
                                onChange={(e) => { setAdminPassword(e.target.value); setDeleteError(''); }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                                placeholder="Contraseña admin"
                            />
                            {deleteError && (
                                <p className="text-xs text-red-500 mt-1">{deleteError}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => setDeleteModal({ isOpen: false, clientId: '', clientName: '' })}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700"
                            >
                                Eliminar Cliente
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
