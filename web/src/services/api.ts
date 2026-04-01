import { Topico, MicroVitoria } from '../types'

const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  (import.meta.env.DEV ? '/api' : 'http://localhost:3000')

function hojeISO(): string {
  return new Date().toISOString().split('T')[0]
}

async function request<T>(caminho: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${caminho}`, init)

  if (!res.ok) {
    let detalhe = ''
    try {
      detalhe = await res.text()
    } catch {
    }
    throw new Error(`Erro na API (${res.status}): ${detalhe || res.statusText}`)
  }

  if (res.status === 204) {
    return undefined as T
  }

  return (await res.json()) as T
}

// Busca todos os tópicos (GET)
export async function getTopicos(): Promise<Topico[]> {
  return request<Topico[]>('/topicos')
}

// Cria um novo tópico (POST)
export async function criarTopico(nome: string): Promise<Topico> {
  return request<Topico>('/topicos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, nivel: 0 }),
  })
}

// Atualiza o nível de um tópico (PATCH)
export async function atualizarTopico(id: number, nivel: number): Promise<Topico> {
  return request<Topico>(`/topicos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nivel }),
  })
}

// Deleta um tópico (DELETE)
export async function deletarTopico(id: number): Promise<void> {
  await request<unknown>(`/topicos/${id}`, {
    method: 'DELETE',
  })
}

// Busca todas as microvitórias (GET)
export async function getMicroVitorias(): Promise<MicroVitoria[]> {
  return request<MicroVitoria[]>('/microvitorias?_sort=data&_order=desc')
}

// Cria uma nova microvitória (POST)
export async function criarMicroVitoria(
  topicoId: number,
  descricao: string
): Promise<MicroVitoria> {
  return request<MicroVitoria>('/microvitorias', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topicoId, descricao, data: hojeISO() }),
  })
}

// Deleta uma microvitória (DELETE)
export async function deletarMicroVitoria(id: number): Promise<void> {
  await request<unknown>(`/microvitorias/${id}`, {
    method: 'DELETE',
  })
}
