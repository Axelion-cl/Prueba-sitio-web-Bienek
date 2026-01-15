# Admin CRM Implementation Plan (Phase 8)

## Goal
Implement the Client Management section (CRM) to allow administrators to view registered clients and manually generate credentials for new B2B clients.

## Proposed Changes

### Client List
#### [NEW] [src/app/admin/(dashboard)/clients/page.tsx](file:///d:/2. Otros/Github/Prueba Sitio web Bienek/src/app/admin/(dashboard)/clients/page.tsx)
- **Table View**:
    - Columns: Company Name, Contact Name, Email, Status (Active/Inactive), Last Login.
    - Actions: Edit, Disable, Reset Password.
- **Data Source**: Filter `mockUsers` by `role: client`.

### Credentials Generator ("Convertidor de Leads")
#### [NEW] [src/components/admin/clients/ClientGenerator.tsx](file:///d:/2. Otros/Github/Prueba Sitio web Bienek/src/components/admin/clients/ClientGenerator.tsx)
- Modal or Page for creating a new client.
- **Fields**:
    - Business Name (Razón Social).
    - RUT (Chilean ID).
    - Email (Username).
    - Password (Auto-generate button).
- **Output**:
    - Upon creation, show a "Success Card" with the credentials clearly visible for the Admin to copy/paste into an email/WhatsApp.
    - Button: "Copiar Credenciales".

### Integration
- **Sidebar**: Ensure "Clientes" updates active state correctly.

## Verification Plan
1. Go to `/admin/clients`. Verify list of mock clients.
2. Click "Nuevo Cliente".
3. Fill form: "Empresa Test", "76.123.456-7", "contacto@empresatest.cl".
4. Click "Generar Password" -> `XyZ123`.
5. Click "Crear".
6. Verify "Credential Card" appears.
7. Verify new client appears in the list (local state).
