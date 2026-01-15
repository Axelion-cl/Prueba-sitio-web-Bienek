export interface Lead {
    id: string;
    name: string;
    email: string;
    message: string;
    date: string;
    status: 'new' | 'contacted' | 'converted';
}

export interface Client {
    id: string;
    name: string;
    email: string;
    registrationDate: string;
    status: 'active' | 'inactive';
    phone?: string;
    company?: string;
}

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    clientId: string;
    clientName: string; // Helper for display
    date: string;
    total: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    items: OrderItem[];
}

export const mockLeads: Lead[] = [
    {
        id: 'lead-1',
        name: 'Juan Pérez',
        email: 'juan.perez@empresa.com',
        message: 'Hola, me interesa cotizar 50 dispensadores de toalla.',
        date: '2026-01-14',
        status: 'new'
    },
    {
        id: 'lead-2',
        name: 'Maria Gonzalez',
        email: 'maria.g@clinica.cl',
        message: 'Necesito insumos médicos por mayor. ¿Tienen catálogo?',
        date: '2026-01-13',
        status: 'contacted'
    },
    {
        id: 'lead-3',
        name: 'Carlos Ruiz',
        email: 'cruiz@limpieza.cl',
        message: 'Busco proveedor de químicos industriales.',
        date: '2026-01-10',
        status: 'new'
    }
];

export const mockClients: Client[] = [
    {
        id: 'client-1',
        name: 'Hospital Regional',
        email: 'adquisiciones@hospital.cl',
        registrationDate: '2025-11-20',
        status: 'active',
        phone: '+56 9 1234 5678',
        company: 'Hospital Regional de Concepción'
    },
    {
        id: 'client-2',
        name: 'Limpiezas Industriales BioBio',
        email: 'contacto@limpiezasbio.cl',
        registrationDate: '2025-12-05',
        status: 'active',
        phone: '+56 9 8765 4321',
        company: 'Limpiezas BioBio SpA'
    },
    {
        id: 'client-3',
        name: 'Constructora Valdivia',
        email: 'obras@valdivia.cl',
        registrationDate: '2026-01-02',
        status: 'active',
        company: 'Constructora Valdivia Ltda'
    }
];

export const mockOrders: Order[] = [
    {
        id: 'ORD-001',
        clientId: 'client-1',
        clientName: 'Hospital Regional',
        date: '2026-01-14',
        total: 450000,
        status: 'processing',
        items: [
            { productId: 'prod-1', productName: 'Desinfectante Grado Hospitalario 5L', quantity: 20, price: 15000 },
            { productId: 'prod-2', productName: 'Guantes Nitrilo Caja 100u', quantity: 50, price: 3000 }
        ]
    },
    {
        id: 'ORD-002',
        clientId: 'client-2',
        clientName: 'Limpiezas Industriales BioBio',
        date: '2026-01-12',
        total: 125000,
        status: 'completed',
        items: [
            { productId: 'prod-3', productName: 'Detergente Industrial 20L', quantity: 5, price: 25000 }
        ]
    },
    {
        id: 'ORD-003',
        clientId: 'client-1',
        clientName: 'Hospital Regional',
        date: '2025-12-20',
        total: 890000,
        status: 'completed',
        items: [
            { productId: 'prod-4', productName: 'Papel Higiénico Jumbo', quantity: 100, price: 4500 },
            { productId: 'prod-5', productName: 'Dispensador Toalla', quantity: 10, price: 22000 },
            { productId: 'prod-6', productName: 'Jabón Líquido 5L', quantity: 20, price: 11000 }
        ]
    }
];
