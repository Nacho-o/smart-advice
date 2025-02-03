-- Main table for forms
CREATE TABLE forms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- Table for sections/tabs
CREATE TABLE sections (
    id SERIAL PRIMARY KEY,
    form_id INT REFERENCES forms(id),
    name VARCHAR(50) NOT NULL,
    order_number INT NOT NULL
);

-- Table for questions (with future conditional logic)
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    section_id INT REFERENCES sections(id),
    text TEXT NOT NULL,
    response_type VARCHAR(20) NOT NULL, -- 'text', 'number', 'dropdown', 'yes_no'
    options JSONB, -- For dropdowns/multiple choices
    is_required BOOLEAN DEFAULT false,
    order_number INT NOT NULL
);

-- Table for answers (to store per session/user)
CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id INT REFERENCES questions(id),
    value TEXT,
    session_id UUID NOT NULL, -- Unique identifier per submission
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO forms (name) VALUES ('Seguro de daños') RETURNING id; 
-- Save this ID for future references (e.g., id=1)

-- Insert form
INSERT INTO forms (name) 
VALUES ('Seguro de responsabilidad civil general') 
RETURNING id; -- Assume it returns id=2

-- Insert sections (tabs)
INSERT INTO sections (form_id, name, order_number) 
VALUES 
  (2, 'Actividad y Facturación', 1),
  (2, 'Actividad', 2),
  (2, 'Empresa de Servicios', 3);

-- Section ID=1 (assuming it's the first section of form 2)
INSERT INTO questions (section_id, text, response_type, options, order_number) 
VALUES
  (1, 'Nº CNAE', 'text', null, 1),
  (1, 'Facturación a terceros (€)', 'number', null, 2),
  (1, 'Número de empleados', 'number', null, 3),
  (1, 'Facturación en línea', 'yes_no', null, 4),
  (1, '% de facturación en línea', 'number', null, 5),
  (1, 'Tipo de instalaciones', 'dropdown', '["Propietario", "Inquilino", "Otro"]', 6),
  (1, 'Metros cuadrados', 'number', null, 7),
  (1, '¿Almacena bienes de terceros?', 'yes_no', null, 8),
  (1, '¿Vehículos de terceros en instalaciones?', 'yes_no', null, 9);

-- Section ID=2
INSERT INTO questions (section_id, text, response_type, options, order_number) 
VALUES
  (2, '¿Es una empresa de manufacturas?', 'yes_no', null, 1),
  (2, '¿Producto para consumo humano?', 'yes_no', null, 2),
  (2, '¿Empleados técnicos en plantilla?', 'yes_no', null, 3),
  (2, 'Tipo de producto', 'dropdown', '["Final", "Intermedio"]', 4),
  (2, 'Área de distribución', 'dropdown', '["España y Andorra", "Unión Europea", "Mundo excepto EE.UU./Canadá", "Todo el mundo"]', 5),
  (2, '¿Matriz en España?', 'yes_no', null, 6),
  (2, 'Filiales en:', 'dropdown', '["Unión Europea", "Resto del mundo", "EE.UU. y Canadá"]', 7);  

-- Section ID=3
INSERT INTO questions (section_id, text, response_type, options, order_number) 
VALUES
  (3, '¿Trabajos fuera de instalaciones?', 'yes_no', null, 1),
  (3, '¿Realiza corte y soldadura?', 'yes_no', null, 2),
  (3, '¿Trabaja en equipos electrónicos?', 'yes_no', null, 3),
  (3, '¿Empleados técnicos/profesionales?', 'yes_no', null, 4);  