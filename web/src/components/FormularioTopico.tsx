import { useState } from 'react'

type Props = {
  onCriarTopico: (nome: string) => Promise<void>
}

function FormularioTopico({ onCriarTopico }: Props) {
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (nome.trim() === '') {
      setErro('O nome do tópico não pode ser vazio.')
      return
    }

    setErro('')
    setCarregando(true)
    await onCriarTopico(nome.trim())
    setNome('')
    setCarregando(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="mb-3">
        <label
          htmlFor="nomeTopico"
          className="block text-sm text-slate-200 mb-1 font-medium"
        >
          Nome do tópico
        </label>
        <input
          id="nomeTopico"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: React, Python, SQL..."
          className="w-full border border-slate-600 bg-slate-700 rounded px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        {erro && <p className="text-red-400 text-sm mt-1">{erro}</p>}
      </div>

      <button
        type="submit"
        disabled={carregando}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {carregando ? 'Criando...' : 'Criar Tópico'}
      </button>
    </form>
  )
}

export default FormularioTopico
