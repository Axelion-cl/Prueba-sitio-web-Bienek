/**
 * Email Validation Utilities
 * Strict email validation to ensure proper format
 */

/**
 * Validates email format strictly
 * Requirements:
 * - Must have @ symbol
 * - Must have a valid domain
 * - Domain must have at least one dot
 * - TLD must be at least 2 characters
 * 
 * Examples:
 * ✅ user@example.com
 * ✅ name.surname@company.co.uk
 * ❌ user@example (no TLD)
 * ❌ user@localhost (no TLD)
 * ❌ @example.com (no user)
 */
export function isValidEmail(email: string): boolean {
    if (!email || typeof email !== 'string') return false;

    // Trim whitespace
    email = email.trim();

    // Basic format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return false;

    // Split email into parts
    const [localPart, domain] = email.split('@');

    // Validate local part (before @)
    if (!localPart || localPart.length > 64) return false;
    if (localPart.startsWith('.') || localPart.endsWith('.')) return false;
    if (localPart.includes('..')) return false;

    // Validate domain part (after @)
    if (!domain || domain.length > 255) return false;

    // Domain must have at least one dot
    if (!domain.includes('.')) return false;

    // Get TLD (top-level domain)
    const parts = domain.split('.');
    const tld = parts[parts.length - 1];

    // TLD must be at least 2 characters
    if (tld.length < 2) return false;

    // TLD should only contain letters
    if (!/^[a-zA-Z]+$/.test(tld)) return false;

    // More specific regex for overall validation
    const strictEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return strictEmailRegex.test(email);
}

/**
 * Returns an error message if email is invalid, or null if valid
 */
export function getEmailValidationError(email: string): string | null {
    if (!email) {
        return 'El correo electrónico es requerido';
    }

    email = email.trim();

    if (!email.includes('@')) {
        return 'El correo debe contener el símbolo @';
    }

    const [localPart, domain] = email.split('@');

    if (!localPart) {
        return 'Ingresa un usuario antes del @';
    }

    if (!domain) {
        return 'Ingresa un dominio después del @';
    }

    if (!domain.includes('.')) {
        return 'El dominio debe incluir un punto (ej: ejemplo.com)';
    }

    const parts = domain.split('.');
    const tld = parts[parts.length - 1];

    if (tld.length < 2) {
        return 'La extensión del dominio debe tener al menos 2 caracteres (ej: .cl, .com)';
    }

    if (!isValidEmail(email)) {
        return 'El formato del correo no es válido';
    }

    return null;
}

/**
 * Common domain typos - suggest corrections
 */
const COMMON_DOMAIN_TYPOS: Record<string, string[]> = {
    'gmail.com': ['gmai.com', 'gmial.com', 'gmail.co'],
    'hotmail.com': ['hotmai.com', 'hotmail.co'],
    'outlook.com': ['outlok.com', 'outlook.co'],
    'yahoo.com': ['yahoo.co', 'yaho.com'],
};

/**
 * Suggests a correction if a common typo is detected
 */
export function suggestEmailCorrection(email: string): string | null {
    if (!email || !email.includes('@')) return null;

    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return null;

    for (const [correctDomain, typos] of Object.entries(COMMON_DOMAIN_TYPOS)) {
        if (typos.includes(domain)) {
            return email.replace(domain, correctDomain);
        }
    }

    return null;
}

/**
 * Validates Chilean RUT
 * Algoritmo del Módulo 11
 */
export function isValidRut(rut: string): boolean {
    if (!rut || typeof rut !== 'string') return false;

    // Clean RUT: remove dots and dash, convert to uppercase
    const cleanRut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();

    // Basic format: at least 2 characters (e.g., 1-9)
    if (cleanRut.length < 2) return false;

    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);

    // Validate body is numeric
    if (!/^[0-9]+$/.test(body)) return false;

    // Calculate DV
    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i]) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const expectedDv = 11 - (sum % 11);
    let calculatedDv = '';

    if (expectedDv === 11) calculatedDv = '0';
    else if (expectedDv === 10) calculatedDv = 'K';
    else calculatedDv = expectedDv.toString();

    return calculatedDv === dv;
}

/**
 * Formats a raw RUT string into 12.345.678-9 format
 */
export function formatRut(rut: string): string {
    const cleanRut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    if (cleanRut.length < 2) return cleanRut;

    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);

    let formattedBody = '';
    for (let i = body.length - 1, j = 1; i >= 0; i--, j++) {
        formattedBody = body[i] + formattedBody;
        if (j % 3 === 0 && i !== 0) {
            formattedBody = '.' + formattedBody;
        }
    }

    return `${formattedBody}-${dv}`;
}
