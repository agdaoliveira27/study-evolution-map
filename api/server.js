import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const jsonServer = require('json-server')

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, 'db.json')

// Importante (Vercel): o filesystem é read-only.
// Por isso carregamos o db.json como seed e usamos um DB em memória.
// Assim POST/PATCH/DELETE funcionam sem tentar escrever em disco.
const db = JSON.parse(readFileSync(dbPath, 'utf-8'))

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(router)

// Vercel (@vercel/node) espera um handler (req, res)
export default function handler(req, res) {
  return server(req, res)
}
