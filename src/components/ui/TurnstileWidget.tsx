"use client";

import { Turnstile } from '@marsidev/react-turnstile';

interface TurnstileWidgetProps {
    onVerify: (token: string) => void;
}

export function TurnstileWidget({ onVerify }: TurnstileWidgetProps) {
    const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    if (!SITE_KEY) {
        return (
            <div className="p-4 bg-yellow-50 text-yellow-800 text-sm rounded-lg border border-yellow-200">
                ⚠️ Turnstile Site Key no configurada (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`)
            </div>
        );
    }

    return (
        <div className="my-4 flex justify-center md:justify-start">
            <Turnstile
                siteKey={SITE_KEY}
                onSuccess={(token) => onVerify(token)}
                options={{
                    theme: 'light',
                    size: 'flexible',
                }}
            />
        </div>
    );
}
