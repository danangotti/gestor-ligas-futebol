# ⚽ Liggo — Gestor de Ligas de Futebol

Plataforma Web moderna para criação, organização e gerenciamento completo de ligas e campeonatos de futebol. O sistema permite criar ligas, cadastrar equipes e elencos, gerar rodadas de confrontos e acompanhar a tabela de classificação automática e artilharia em tempo real.

---

## 🛠️ Tech Stack & Arquitetura

A aplicação é dividida em três camadas bem separadas (*Monorepo Modular*):

```text
gestor-ligas-futebol/
├── backend/       # Web API RESTful em C# (.NET 8/9) + ASP.NET Core
├── database/      # Scripts DDL/DML para PostgreSQL (Chaves Primárias, Foreign Keys e Triggers)
└── frontend/      # Interface Web em React + Vite + Tailwind CSS v4
