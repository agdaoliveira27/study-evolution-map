import { useMemo } from 'react'
import { Topico, MicroVitoria } from '../types'

interface InsightsProps {
  topicos: Topico[]
  microVitorias: MicroVitoria[]
}

export default function Insights({ topicos, microVitorias }: InsightsProps) {
  const insights = useMemo<{
    topicoDominado: Topico | null
    topicoMenorProgresso: Topico | null
    progressoMedio: number
    contagemPorTopico: Map<number, number>
  } | null>(() => {
    if (topicos.length === 0) return null

    // Contar microvitórias por tópico
    const contagemPorTopico = new Map<number, number>()
    topicos.forEach((t) => {
      contagemPorTopico.set(t.id, 0)
    })
    microVitorias.forEach((mv) => {
      contagemPorTopico.set(
        mv.topicoId,
        (contagemPorTopico.get(mv.topicoId) || 0) + 1
      )
    })

    // Achar tópico com mais microvitórias
    let topicoDominado: Topico | null = null
    let maxMicroVitorias = -1
    topicos.forEach((t) => {
      const count = contagemPorTopico.get(t.id) || 0
      if (count > maxMicroVitorias) {
        maxMicroVitorias = count
        topicoDominado = t
      }
    })

    // Achar tópico com menor progresso
    let topicoMenorProgresso: Topico | null = null
    let menorNivel = 4
    topicos.forEach((t) => {
      if (t.nivel < menorNivel) {
        menorNivel = t.nivel
        topicoMenorProgresso = t
      }
    })

    // Calcular progresso geral
    const progressoMedio = topicos.length > 0
      ? Math.round(
          (topicos.reduce((sum, t) => sum + t.nivel, 0) / (topicos.length * 3)) * 100
        )
      : 0

    return {
      topicoDominado,
      topicoMenorProgresso,
      progressoMedio,
      contagemPorTopico,
    }
  }, [topicos, microVitorias])

  if (!insights) return null

  return (
    <div className="space-y-3">
      {/* Insight 1: Tópico Dominado */}
      {insights.topicoDominado && (
        <div className="bg-green-900/30 rounded-lg p-4 border-l-4 border-green-500">
          <p className="text-sm text-slate-300">
            Você está dominando{' '}
            <span className="font-bold text-green-400">
              {insights.topicoDominado.nome}
            </span>{' '}
            com {insights.contagemPorTopico.get(insights.topicoDominado.id) || 0}{' '}
            microvitórias registradas!
          </p>
        </div>
      )}

      {/* Insight 2: Tópico com Menor Progresso */}
      {insights.topicoMenorProgresso && (
        <div className="bg-amber-900/30 rounded-lg p-4 border-l-4 border-amber-500">
          <p className="text-sm text-slate-300">
            <span className="font-bold text-amber-400">
              {insights.topicoMenorProgresso.nome}
            </span>{' '}
            ainda está com progresso baixo. Que tal registrar uma microvitória?
          </p>
        </div>
      )}

      {/* Insight 3: Progresso Geral */}
      <div className="bg-blue-900/30 rounded-lg p-4 border-l-4 border-blue-500">
        <p className="text-sm text-slate-300">
          Seu progresso geral é de{' '}
          <span className="font-bold text-blue-400">{insights.progressoMedio}%</span>
        </p>
      </div>
    </div>
  )
}
