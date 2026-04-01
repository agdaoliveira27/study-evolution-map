# Mapa de Evolução de Estudos

Aplicação web para organizar estudos por **tópicos** e registrar **microvitórias** (pequenos avanços), ajudando a visualizar progresso ao longo do tempo.

- PRD: [PRD.md](PRD.md)

## Problema que eu resolvo
Quando estou estudando (ex.: React/TypeScript), é comum:

- Perder noção do que já evoluí em cada assunto
- Não registrar pequenas conquistas que mostram progresso real

Este projeto resolve isso com um mapa simples (níveis por tópico) + histórico de microvitórias.

## Funcionalidades
- Listar tópicos e microvitórias (GET)
- Criar tópico e microvitória por formulários (POST)
- Aumentar/diminuir o nível do tópico (PATCH)
- Deletar tópico e microvitória (DELETE)
- Filtrar microvitórias por tópico selecionado

## Stack
- Front-end: React + TypeScript + Vite + Tailwind CSS
- API: json-server (REST)

## Como rodar localmente

### 1) API

```bash
cd api
npm install
npm run start
```

API em `http://localhost:3000`.

### 2) Front-end

Em outro terminal:

```bash
cd web
npm install
npm run dev
```

O front usa proxy do Vite para a API em dev (`/api` → `http://localhost:3000`).

## Endpoints (API)
- `GET /topicos`
- `POST /topicos` (ex.: `{ "nome": "React", "nivel": 0 }`)
- `PATCH /topicos/:id` (ex.: `{ "nivel": 2 }`)
- `DELETE /topicos/:id`

- `GET /microvitorias?_sort=data&_order=desc`
- `POST /microvitorias` (ex.: `{ "topicoId": 1, "descricao": "Aprendi useEffect", "data": "2024-03-10" }`)
- `DELETE /microvitorias/:id`

## Confirmação ao deletar (por quê?)
Eu uso confirmação (`window.confirm`) antes de remover tópico/microvitória para reduzir exclusões acidentais, como é uma ação destrutiva, prefiro pedir validação explícita do usuário.

## Deploy
- Front-end: **TODO** 
- API: **TODO** 

## Variáveis de ambiente
Se você publicar a API em outra URL, configure no front:

- `VITE_API_URL=https://sua-api.com`

(sem isso, o projeto usa `/api` em dev e faz fallback para `http://localhost:3000`.)
