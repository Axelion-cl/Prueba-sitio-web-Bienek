-- ==============================================
-- TABLA: leads (Actualización)
-- Agrega columnas faltantes si la tabla ya existe
-- ==============================================

-- Agregar columna 'date' si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'leads' AND column_name = 'date') THEN
        ALTER TABLE leads ADD COLUMN date DATE DEFAULT CURRENT_DATE;
    END IF;
END $$;

-- Agregar columna 'company' si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'leads' AND column_name = 'company') THEN
        ALTER TABLE leads ADD COLUMN company TEXT;
    END IF;
END $$;

-- Agregar columna 'phone' si no existe  
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'leads' AND column_name = 'phone') THEN
        ALTER TABLE leads ADD COLUMN phone TEXT;
    END IF;
END $$;

-- Agregar columna 'message' si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'leads' AND column_name = 'message') THEN
        ALTER TABLE leads ADD COLUMN message TEXT;
    END IF;
END $$;

-- Agregar columna 'status' si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'leads' AND column_name = 'status') THEN
        ALTER TABLE leads ADD COLUMN status TEXT DEFAULT 'new';
    END IF;
END $$;
