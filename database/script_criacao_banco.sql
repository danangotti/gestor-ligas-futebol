-- 1. Criação das Tabelas
CREATE TABLE liga (
    id_liga SERIAL PRIMARY KEY,
    nome_liga VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE time (
    id_time SERIAL PRIMARY KEY,
    nome_time VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    id_liga INT NOT NULL,
    CONSTRAINT fk_time_liga FOREIGN KEY (id_liga) REFERENCES liga(id_liga)
);

CREATE TABLE jogador (
    id_jogador SERIAL PRIMARY KEY,
    nome_jogador VARCHAR(100) NOT NULL,
    posicao VARCHAR(30) NOT NULL,
    numero_camisa INT,
    gols_jogador INT DEFAULT 0,
    ass_jogador INT DEFAULT 0,
    id_time INT NOT NULL,
    CONSTRAINT fk_jogador_time FOREIGN KEY (id_time) REFERENCES time(id_time)
);