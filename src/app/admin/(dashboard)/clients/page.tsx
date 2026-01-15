'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Users, UserPlus, Mail, Phone, Calendar,
    MoreHorizontal, FileText, Key, Trash2, Edit, CheckCircle, ArrowRight
} from 'lucide-react';
import { mockLeads, mockClients, Lead, Client } from '@/data/mockCRM';

export default function ClientsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'leads' | 'clients'>('leads');

    // Mock State
    const [leads, setLeads] = useState<Lead[]>(mockLeads);
    const [clients, setClients] = useState<Client[]>(mockClients);

    const handleConvertLead = (lead: Lead) => {
        if (!confirm(`¿Convertir a ${lead.name} en cliente? Se generarán y enviarán credenciales.`)) return;

        // Remove from leads
        setLeads(leads.filter(l => l.id !== lead.id));

        // Add to clients
        const newClient: Client = {
            id: `client-${Date.now()}`,
            name: lead.name,
            email: lead.email,
            registrationDate: new Date().toISOString().split('T')[0],
            status: 'active',
            company: 'Sin empresa'
        };
        setClients([newClient, ...clients]);

        alert(`✅ Cliente creado exitosamente.\n\nCredenciales enviadas a: ${lead.email}\nContraseña temporal: A1b2C3d4`);
    };

    const handleResetPassword = (client: Client) => {
        if (confirm(`¿Resetear contraseña para ${client.email}?`)) {
            alert(`🔑 Nueva contraseña temporal generada y enviada a ${client.email}.`);
        }
    };

    const handleDeleteClient = (id: string) => {
        if (confirm('¿Eliminar cliente? Esta acción no se puede deshacer.')) {
            setClients(clients.filter(c => c.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestión de Clientes (CRM)</h1>
                    <p className="text-gray-500">Administra leads y clientes registrados.</p>
                </div>
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
                                        <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
                                        <td className="px-6 py-4 text-gray-500">
                                            <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> {lead.email}</div>
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
                                                    onClick={() => handleDeleteClient(client.id)}
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
        </div>
    );
}
