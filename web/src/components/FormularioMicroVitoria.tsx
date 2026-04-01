import { useState } from 'react'
import { Topico } from '../types'

type Props = {
  topicos: Topico[]
  onCriarMicroVitoria: (topicoId: number, descricao: string) => Promise<void>
}

function FormularioMicroVitoria({ topicos, onCriarMicroVitoria }: Props) {
  const [topicoId, setTopicoId] = useState('')
  const [descricao, setDescricao] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (topicoId === '') {
      setErro('Selecione um tópico.')
      return
    }
    if (descricao.trim() === '') {
      setErro('A descrição não pode ser vazia.')
      return
    }

    setErro('')
    setCarregando(true)
    await onCriarMicroVitoria(Number(topicoId), descricao.trim())
    setDescricao('')
    setTopicoId('')
    setCarregando(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="mb-3">
        <label
          htmlFor="topicoMicrovitoria"
          className="block text-sm text-slate-200 mb-1 font-medium"
        >
          Tópico relacionado
        </label>
        <select
          id="topicoMicrovitoria"
          value={topicoId}
          onChange={(e) => setTopicoId(e.target.value)}
          className="w-full border border-slate-600 bg-slate-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="" className="bg-slate-700">Selecione um tópico</option>
          {topicos.map((t) => (
            <option key={t.id} value={t.id} className="bg-slate-700">
              {t.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label
          htmlFor="descricaoMicrovitoria"
          className="block text-sm text-slate-200 mb-1 font-medium"
        >
          O que você aprendeu?
        </label>
        <input
          id="descricaoMicrovitoria"
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex: Aprendi a usar o useEffect corretamente..."
          className="w-full border border-slate-600 bg-slate-700 rounded px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        {erro && <p className="text-red-400 text-sm mt-1">{erro}</p>}
      </div>

      <button
        type="submit"
        disabled={carregando || topicos.length === 0}
        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {carregando ? 'Salvando...' : 'Registrar Microvitória'}
      </button>

      {topicos.length === 0 && (
        <p className="text-slate-400 text-sm mt-2">
          Crie um tópico primeiro para registrar uma microvitória.
        </p>
      )}
    </form>
  )
}

export default FormularioMicroVitoria
