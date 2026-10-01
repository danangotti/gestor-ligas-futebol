-- 1. Ligas
CREATE TABLE liga (
    id_liga SERIAL PRIMARY KEY,
    nome_liga VARCHAR(100) NOT NULL,
    formato VARCHAR(50) NOT NULL, -- 'Pontos Corridos', 'Mata-Mata', 'Fase de Grupos + Mata-Mata'
    quantidade_times INT NOT NULL,
    status_competicao VARCHAR(30) DEFAULT 'Não iniciada',
    -- Campos específicos para formatos com grupos (podem ser nulos se for mata-mata puro ou pontos corridos)
    qtd_grupos INT,
    classificados_por_grupo INT,
    turno_grupos VARCHAR(30)
);

-- 2. Times
CREATE TABLE time (
    id_time SERIAL PRIMARY KEY,
    nome_time VARCHAR(100) NOT NULL,
    sigla VARCHAR(5),
    cor VARCHAR(20),
    cidade VARCHAR(100),
    grupo VARCHAR(2), 
    id_liga INT NOT NULL,
    CONSTRAINT fk_time_liga FOREIGN KEY (id_liga) REFERENCES liga(id_liga) ON DELETE CASCADE
);

-- 3. Jogadores
CREATE TABLE jogador (
    id_jogador SERIAL PRIMARY KEY,
    nome_jogador VARCHAR(100) NOT NULL,
    posicao VARCHAR(30) NOT NULL,
    numero_camisa INT,
    id_time INT NOT NULL,
    CONSTRAINT fk_jogador_time FOREIGN KEY (id_time) REFERENCES time(id_time) ON DELETE CASCADE
);

-- 4. Partidas
CREATE TABLE partida (
    id_partida SERIAL PRIMARY KEY,
    id_liga INT NOT NULL,
    fase VARCHAR(50) NOT NULL, -- 'Rodada', 'Grupo A', 'Semifinal', 'Final', etc.
    rodada INT,
    id_mandante INT,
    id_visitante INT,
    gols_mandante INT DEFAULT 0,
    gols_visitante INT DEFAULT 0,
    penaltis_mandante INT,
    penaltis_visitante INT,
    finalizada BOOLEAN DEFAULT FALSE,
    vencedor_id INT,
    proximo_jogo_id INT,
    posicao_proximo_jogo VARCHAR(20), -- 'mandante' ou 'visitante'
    
    CONSTRAINT fk_partida_liga FOREIGN KEY (id_liga) REFERENCES liga(id_liga) ON DELETE CASCADE,
    CONSTRAINT fk_partida_mandante FOREIGN KEY (id_mandante) REFERENCES time(id_time) ON DELETE SET NULL,
    CONSTRAINT fk_partida_visitante FOREIGN KEY (id_visitante) REFERENCES time(id_time) ON DELETE SET NULL,
    CONSTRAINT fk_partida_vencedor FOREIGN KEY (vencedor_id) REFERENCES time(id_time) ON DELETE SET NULL,
    CONSTRAINT fk_partida_proximo_jogo FOREIGN KEY (proximo_jogo_id) REFERENCES partida(id_partida) ON DELETE SET NULL
);

-- 5. Registro de Gols da Partida (Artilharia detalhada)
CREATE TABLE gol_partida (
    id_gol SERIAL PRIMARY KEY,
    id_partida INT NOT NULL,
    id_jogador INT NOT NULL,
    id_time INT NOT NULL,
    CONSTRAINT fk_gol_partida FOREIGN KEY (id_partida) REFERENCES partida(id_partida) ON DELETE CASCADE,
    CONSTRAINT fk_gol_jogador FOREIGN KEY (id_jogador) REFERENCES jogador(id_jogador) ON DELETE CASCADE,
    CONSTRAINT fk_gol_time FOREIGN KEY (id_time) REFERENCES time(id_time) ON DELETE CASCADE
);