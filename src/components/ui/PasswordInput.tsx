'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    wrapperClassName?: string;
}

export default function PasswordInput({ className = '', wrapperClassName = '', ...props }: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`relative ${wrapperClassName}`}>
            <input
                {...props}
                type={showPassword ? 'text' : 'password'}
                className={`${className} pr-12`}
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full transition-colors hover:bg-gray-100"
                tabIndex={-1}
                title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
        </div>
    );
}
