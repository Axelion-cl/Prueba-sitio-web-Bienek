import { mockClients } from '@/data/mockCRM';
import ClientOrdersView from '@/components/admin/clients/ClientOrdersView';

export async function generateStaticParams() {
    return mockClients.map((client) => ({
        id: client.id,
    }));
}

export const dynamicParams = false; // Required for static export

export default async function ClientOrdersPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <ClientOrdersView clientId={id} />;
}
