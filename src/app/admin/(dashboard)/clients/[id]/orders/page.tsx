import { getAllClients } from '@/services/clients';
import ClientOrdersView from '@/components/admin/clients/ClientOrdersView';

export async function generateStaticParams() {
    const clients = await getAllClients();
    return clients.map((client) => ({
        id: client.id,
    }));
}

export const dynamicParams = true; // Allow new clients not in static build

export default async function ClientOrdersPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ClientOrdersView clientId={id} />;
}
