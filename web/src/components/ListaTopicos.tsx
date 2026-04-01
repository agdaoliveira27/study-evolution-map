import { useMemo } from 'react'
import { Topico } from '../types'

type Props = {
  topicos: Topico[]
  topicoSelecionadoId: number | null
  onSelecionarTopico: (id: number | null) => void
  onAumentarNivel: (topico: Topico) => void
  onDiminuirNivel: (topico: Topico) => void
  onDeletarTopico: (id: number) => void
}

// Nome, cor e emoji para cada nível (0 a 3)
const nomeNivel = ['Confuso', 'Médio', 'Bom', 'Dominado']
const corNivel = ['bg-red-600', 'bg-yellow-600', 'bg-blue-600', 'bg-green-600']
const emojiNivel = ['🔴', '🟡', '🔵', '🟢']

function ListaTopicos({
  topicos,
  topicoSelecionadoId,
  onSelecionarTopico,
  onAumentarNivel,
  onDiminuirNivel,
  onDeletarTopico,
}: Props) {
  // Agrupar tópicos por nível
  const topicosAgrupados = useMemo(() => {
    const grupos = [[], [], [], []] as Topico[][]
    topicos.forEach((t) => {
      grupos[t.nivel].push(t)
    })
    return grupos
  }, [topicos])

  if (topicos.length === 0) {
    return (
      <p className="text-slate-400 italic">
        Nenhum tópico cadastrado ainda. Crie um acima!
      </p>
    )
  }

  function handleClicarTopico(id: number) {
    if (topicoSelecionadoId === id) {
      onSelecionarTopico(null)
    } else {
      onSelecionarTopico(id)
    }
  }

  return (
    <div className="space-y-6">
      {topicosAgrupados.map((grupo, nivel) =>
        grupo.length > 0 ? (
          <div key={nivel} className="space-y-3">
            {/* Cabeçalho do Nível */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{emojiNivel[nivel]}</span>
              <h3 className="text-lg font-semibold text-white">
                {nomeNivel[nivel]}
              </h3>
              <span className="text-sm text-slate-400">({grupo.length})</span>
            </div>

            {/* Cards de Tópicos do Nível */}
            <ul className="space-y-2 pl-4 border-l-4 border-opacity-30" style={{
              borderColor: corNivel[nivel]
            }}>
              {grupo.map((topico) => (
                <li
                  key={topico.id}
                  className={`bg-slate-800 rounded-lg shadow-md p-4 cursor-pointer border-2 transition-colors border-slate-700 ${
                    topicoSelecionadoId === topico.id
                      ? 'border-blue-500 bg-slate-700'
                      : 'hover:border-slate-600'
                  }`}
                  onClick={() => handleClicarTopico(topico.id)}
                >
                  <span className="font-medium text-white">{topico.nome}</span>

                  <div
                    className="flex flex-wrap gap-2 mt-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onDiminuirNivel(topico)}
                      disabled={topico.nivel === 0}
                      className="bg-slate-700 text-slate-200 px-3 py-1 rounded text-sm hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      ← Voltar
                    </button>
                    <button
                      onClick={() => onAumentarNivel(topico)}
                      disabled={topico.nivel === 3}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Avançar →
                    </button>
                    <button
                      onClick={() => onDeletarTopico(topico.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 ml-auto"
                    >
                      Deletar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null
      )}
    </div>
  )
}

export default ListaTopicos
