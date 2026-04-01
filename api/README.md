# API — Mapa de Evolução de Estudos

API REST simples feita com **json-server** para ser consumida pelo front-end do projeto.

## Como rodar

1) Instale o json-server (global):

```bash
npm install -g json-server@0.17.4
```

2) Entre na pasta da API:

```bash
cd api
```

3) Suba a API apontando para o arquivo `db.json`:

```bash
json-server --watch db.json --port 3000
```

Pronto. A API vai ficar em:

- `http://localhost:3000`

## Endpoints

### GET

- `GET /topicos`
- `GET /microvitorias`

Extras úteis do json-server:

- Ordenar microvitórias por data (mais novas primeiro):
  - `GET /microvitorias?_sort=data&_order=desc`
- Filtrar por tópico:
  - `GET /microvitorias?topicoId=1`

### POST

- `POST /topicos`
  - body exemplo:

```json
{ "nome": "Node.js", "nivel": 0 }
```

- `POST /microvitorias`
  - body exemplo:

```json
{ "topicoId": 1, "descricao": "Aprendi useEffect", "data": "2024-03-10" }
```

### PATCH

- `PATCH /topicos/:id` (atualizar nível)

Body exemplo:

```json
{ "nivel": 3 }
```

### DELETE

- `DELETE /topicos/:id`
- `DELETE /microvitorias/:id`
