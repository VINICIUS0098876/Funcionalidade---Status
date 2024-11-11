create database empresa;
use empresa;


CREATE TABLE departamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE cargos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    id_departamento INT,
    id_cargo INT,
    status ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
    data_admissao DATE NOT NULL,
    data_demissao DATE,
    FOREIGN KEY (id_departamento) REFERENCES departamentos(id),
    FOREIGN KEY (id_cargo) REFERENCES cargos(id)
);


CREATE TABLE presencas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_funcionario INT,
    data_presenca DATE NOT NULL,
    presente BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id)
);


CREATE TABLE salarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_funcionario INT,
    salario DECIMAL(10, 2) NOT NULL,
    data_pagamento DATE NOT NULL,
    FOREIGN KEY (id_funcionario) REFERENCES funcionarios(id)
);


-- Inserindo departamentos
INSERT INTO departamentos (nome) VALUES
('Recursos Humanos'),
('TI'),
('Financeiro');

-- Inserindo cargos
INSERT INTO cargos (nome) VALUES
('Desenvolvedor'),
('Analista de Sistemas'),
('Gerente de RH');

-- Inserindo funcionários
INSERT INTO funcionarios (nome, id_departamento, id_cargo, status, data_admissao, data_demissao) VALUES
('João Silva', 1, 3, 'ativo', '2022-01-15', NULL),
('Maria Oliveira', 2, 1, 'ativo', '2020-03-10', NULL),
('Carlos Souza', 1, 3, 'inativo', '2019-07-05', '2023-05-20'),
('Ana Costa', 2, 2, 'ativo', '2021-08-23', NULL);

-- Inserindo presenças
INSERT INTO presencas (id_funcionario, data_presenca, presente) VALUES
(1, '2024-11-01', TRUE),
(2, '2024-11-01', TRUE),
(3, '2024-11-01', FALSE),
(4, '2024-11-01', TRUE);

-- Inserindo salários
INSERT INTO salarios (id_funcionario, salario, data_pagamento) VALUES
(1, 3000.00, '2024-11-01'),
(2, 4500.00, '2024-11-01'),
(3, 5000.00, '2024-11-01'),
(4, 4000.00, '2024-11-01');



SELECT f.id, f.nome, d.nome AS departamento, c.nome AS cargo, f.data_admissao
FROM funcionarios f
JOIN departamentos d ON f.id_departamento = d.id
JOIN cargos c ON f.id_cargo = c.id
WHERE f.status = 'ativo';

SELECT f.id, f.nome, d.nome AS departamento, c.nome AS cargo, f.data_admissao, f.data_demissao
FROM funcionarios f
JOIN departamentos d ON f.id_departamento = d.id
JOIN cargos c ON f.id_cargo = c.id
WHERE f.status = 'inativo';

SELECT f.nome, p.data_presenca, p.presente
FROM funcionarios f
JOIN presencas p ON f.id = p.id_funcionario
WHERE f.status = 'ativo' AND p.data_presenca = '2024-11-01';

SELECT f.nome, s.salario, s.data_pagamento
FROM funcionarios f
JOIN salarios s ON f.id = s.id_funcionario;

UPDATE funcionarios
SET status = 'inativo', data_demissao = CURDATE() -- Definindo a data de demissão como a data atual
WHERE id = 1;  -- Substitua pelo ID do funcionário que você deseja tornar inativo


