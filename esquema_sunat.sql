-- Tabla de Usuarios (Módulo de Acceso)
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    ruc VARCHAR(11) NOT NULL,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    perfil VARCHAR(50) NOT NULL
);

-- Insertar usuario administrador por defecto
INSERT INTO usuarios (ruc, usuario, password, perfil) 
VALUES ('20123456789', 'AMBICHO', '1234', 'ADMIN')
ON CONFLICT (usuario) DO NOTHING;

-- Tabla de Recursos Registrados (HU01)
CREATE TABLE IF NOT EXISTS recursos_registrados (
    id SERIAL PRIMARY KEY,
    materia VARCHAR(100),
    tipo_recurso VARCHAR(100),
    acto_impugnado VARCHAR(100),
    sustento TEXT,
    usuario_registro VARCHAR(50),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);