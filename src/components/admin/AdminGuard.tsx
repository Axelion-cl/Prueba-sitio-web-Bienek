'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/admin/login');
        } else if (user?.role !== 'admin') {
            router.push('/');
        }
    }, [isLoggedIn, user, router]);

    // Ideally show a loading spinner while checking
    if (!isLoggedIn || user?.role !== 'admin') {
        return null;
    }

    return <>{children}</>;
}
