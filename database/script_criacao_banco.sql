-- 1. Limpeza preventiva (ordem inversa de dependência)
DROP TABLE IF EXISTS gol_partida CASCADE;
DROP TABLE IF EXISTS partida CASCADE;
DROP TABLE IF EXISTS jogador CASCADE;
DROP TABLE IF EXISTS time CASCADE;
DROP TABLE IF EXISTS liga CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;

-- 2. Tabela de Usuários (Dono da conta)
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome_usuario VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela de Ligas
CREATE TABLE liga (
    id_liga SERIAL PRIMARY KEY,
    nome_liga VARCHAR(100) NOT NULL,
    formato VARCHAR(50) NOT NULL, -- 'Pontos Corridos', 'Mata-Mata', 'Fase de Grupos + Mata-Mata'
    quantidade_times INT NOT NULL,
    status_competicao VARCHAR(30) DEFAULT 'Não iniciada',
    id_usuario INT NOT NULL,
    CONSTRAINT fk_liga_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- 4. Tabela de Times
CREATE TABLE time (
    id_time SERIAL PRIMARY KEY,
    nome_time VARCHAR(100) NOT NULL,
    cidade VARCHAR(100),
    id_liga INT NOT NULL,
    CONSTRAINT fk_time_liga FOREIGN KEY (id_liga) REFERENCES liga(id_liga) ON DELETE CASCADE
);

-- 5. Tabela de Jogadores
CREATE TABLE jogador (
    id_jogador SERIAL PRIMARY KEY,
    nome_jogador VARCHAR(100) NOT NULL,
    posicao VARCHAR(30) NOT NULL,
    numero_camisa INT,
    id_time INT NOT NULL,
    CONSTRAINT fk_jogador_time FOREIGN KEY (id_time) REFERENCES time(id_time) ON DELETE CASCADE
);

-- 6. Tabela de Partidas (Confrontos do campeonato)
CREATE TABLE partida (
    id_partida SERIAL PRIMARY KEY,
    id_liga INT NOT NULL,
    fase VARCHAR(50) NOT NULL, -- 'Rodada 1', 'Quartas de Final', 'Final', etc.
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

-- 7. Tabela de Gols da Partida (Artilharia do campeonato)
CREATE TABLE gol_partida (
    id_gol SERIAL PRIMARY KEY,
    id_partida INT NOT NULL,
    id_jogador INT NOT NULL,
    id_time INT NOT NULL,
    
    CONSTRAINT fk_gol_partida FOREIGN KEY (id_partida) REFERENCES partida(id_partida) ON DELETE CASCADE,
    CONSTRAINT fk_gol_jogador FOREIGN KEY (id_jogador) REFERENCES jogador(id_jogador) ON DELETE CASCADE,
    CONSTRAINT fk_gol_time FOREIGN KEY (id_time) REFERENCES time(id_time) ON DELETE CASCADE
);