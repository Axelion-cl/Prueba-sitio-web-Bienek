import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import PasswordResetGuard from "@/components/auth/PasswordResetGuard";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PasswordResetGuard>
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </PasswordResetGuard>
    );
}
