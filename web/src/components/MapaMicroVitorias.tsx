import { useMemo } from 'react'
import { Topico, MicroVitoria } from '../types'

interface MapaMicroVitoriasProps {
  microVitorias: MicroVitoria[]
  topicos: Topico[]
  onDeletarMicroVitoria: (id: number) => void
}

export default function MapaMicroVitorias({
  microVitorias,
  topicos,
  onDeletarMicroVitoria,
}: MapaMicroVitoriasProps) {
  // Agrupar microvitórias por tópico
  const gruposTopicos = useMemo(() => {
    const grupos = new Map<number, MicroVitoria[]>()

    microVitorias.forEach((mv) => {
      const grupo = grupos.get(mv.topicoId) ?? []
      grupo.push(mv)
      grupos.set(mv.topicoId, grupo)
    })

    return grupos
  }, [topicos, microVitorias])

  // Buscar nome do tópico
  const buscarNomeTopico = (id: number): string => {
    return topicos.find((t) => t.id === id)?.nome || 'Tópico removido'
  }

  // Formatar data
  const formatarData = (data: string): string => {
    return new Date(data).toLocaleDateString('pt-BR')
  }

  // Filtrar apenas tópicos que têm microvitórias
  const topicosComMicroVitorias = Array.from(gruposTopicos.entries()).filter(
    ([_, mvs]) => mvs.length > 0
  )

  if (microVitorias.length === 0) {
    return (
      <p className="text-slate-400 italic">
        Nenhuma microvitória registrada ainda. Crie uma acima!
      </p>
    )
  }

  if (topicosComMicroVitorias.length === 0) {
    return (
      <p className="text-slate-400 italic">
        Nenhuma microvitória registrada ainda.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      {topicosComMicroVitorias.map(([topicoId, mvs]) => {
        return (
          <div key={topicoId} className="space-y-3">
            {/* Cabeçalho do Tópico */}
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-white">{buscarNomeTopico(topicoId)}</h3>
              <span className="text-sm text-slate-400">({mvs.length})</span>
            </div>

            {/* Lista de Microvitórias do Tópico */}
            <ul className="space-y-2 pl-4 border-l-2 border-slate-600">
              {mvs.map((mv) => (
                <li
                  key={mv.id}
                  className="bg-slate-800 rounded-lg shadow-md p-3 border border-slate-700 flex items-start justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm">{mv.descricao}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {formatarData(mv.data)}
                    </p>
                  </div>
                  <button
                    onClick={() => onDeletarMicroVitoria(mv.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 shrink-0"
                  >
                    Deletar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
