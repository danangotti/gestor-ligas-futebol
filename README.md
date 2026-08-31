# ⚽ Liggo — Gestor de Ligas de Futebol

Plataforma Web moderna para criação, organização e gerenciamento completo de ligas e campeonatos de futebol. O sistema permite criar ligas, cadastrar equipes e elencos, gerar rodadas de confrontos e acompanhar a tabela de classificação automática e artilharia em tempo real.

---

## 🎨 Identidade Visual & UI/UX

O **Liggo** foi desenhado seguindo a filosofia de um **software SaaS moderno, limpo, esportivo e tecnológico**, evitando a aparência pesada de sites de clubes ou casas de apostas.

* **Marca & Logo:** Palavra *"Liggo"* com o último "o" representado por uma bola de futebol vetorizada e estilizada.
* **Tipografia:** Manrope (pesos 800 para títulos, 700 para subcabeçalhos e 400/500 para textos gerais).
* **Paleta Oficial de Cores:**
  * **Verde Principal (Ações):** `#16A34A`
  * **Verde Escuro (Hover / Contrastes):** `#166534`
  * **Texto Principal:** `#111827`
  * **Texto Secundário:** `#64748B`
  * **Fundo Principal (Página):** `#F8FAFC`
  * **Fundo Secundário (Seções):** `#F1F5F9`
  * **Bordas:** `#E2E8F0`
  * **Branco:** `#FFFFFF`

---

## 🛠️ Tech Stack & Arquitetura

A aplicação é dividida em três camadas bem separadas (*Monorepo Modular*):

```text
gestor-ligas-futebol/
├── backend/       # Web API RESTful em C# (.NET 8/9) + ASP.NET Core
├── database/      # Scripts DDL/DML para PostgreSQL (Chaves Primárias, Foreign Keys e Triggers)
└── frontend/      # Interface Web em React + Vite + Tailwind CSS v4