export type Topico = {
  id: number
  nome: string
  nivel: number // 0 a 3
}

export type MicroVitoria = {
  id: number
  topicoId: number
  descricao: string
  data: string
}
