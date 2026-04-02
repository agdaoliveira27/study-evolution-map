import { useState, useEffect, useMemo } from 'react'
import Swal from 'sweetalert2'
import { Topico, MicroVitoria } from '../types'
import {
  getTopicos,
  getMicroVitorias,
  criarTopico,
  criarMicroVitoria,
  atualizarTopico,
  deletarTopico,
  deletarMicroVitoria,
} from '../services/api'
import Header from '../components/Header'
import Card from '../components/Card'
import Sidebar from '../components/Sidebar'
import Insights from '../components/Insights'
import ListaTopicos from '../components/ListaTopicos'
import MapaMicroVitorias from '../components/MapaMicroVitorias'
import FormularioTopico from '../components/FormularioTopico'
import FormularioMicroVitoria from '../components/FormularioMicroVitoria'

function Home() {
  const [topicos, setTopicos] = useState<Topico[]>([])
  const [microVitorias, setMicroVitorias] = useState<MicroVitoria[]>([])
  const [carregando, setCarregando] = useState(true)
  const [topicoSelecionadoId, setTopicoSelecionadoId] = useState<number | null>(null)

  // useMemo filtra as microvitórias pelo tópico selecionado
  // Se nenhum tópico estiver selecionado, mostra todas
  const microVitoriasFiltradas = useMemo(() => {
    if (topicoSelecionadoId === null) {
      return microVitorias
    }
    return microVitorias.filter((mv) => mv.topicoId === topicoSelecionadoId)
  }, [microVitorias, topicoSelecionadoId])

  // Carrega os dados ao montar o componente
  useEffect(() => {
    async function carregarDados() {
      setCarregando(true)
      const dadosTopicos = await getTopicos()
      const dadosMicroVitorias = await getMicroVitorias()
      setTopicos(dadosTopicos)
      setMicroVitorias(dadosMicroVitorias)
      setCarregando(false)
    }
    carregarDados()
  }, [])

  async function handleCriarTopico(nome: string) {
    const novoTopico = await criarTopico(nome)
    setTopicos([...topicos, novoTopico])
  }

  async function handleCriarMicroVitoria(topicoId: number, descricao: string) {
    const novaMicroVitoria = await criarMicroVitoria(topicoId, descricao)
    setMicroVitorias([novaMicroVitoria, ...microVitorias])
  }

  async function handleAumentarNivel(topico: Topico) {
    if (topico.nivel >= 3) return
    const topicoAtualizado = await atualizarTopico(topico.id, topico.nivel + 1)
    setTopicos(topicos.map((t) => (t.id === topico.id ? topicoAtualizado : t)))
  }

  async function handleDiminuirNivel(topico: Topico) {
    if (topico.nivel <= 0) return
    const topicoAtualizado = await atualizarTopico(topico.id, topico.nivel - 1)
    setTopicos(topicos.map((t) => (t.id === topico.id ? topicoAtualizado : t)))
  }

  async function handleDeletarTopico(id: number) {
    const result = await Swal.fire({
      title: 'Deletar tópico?',
      text: 'As microvitórias existentes serão mantidas.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
    })

    if (!result.isConfirmed) return

    try {
      await deletarTopico(id)
      setTopicos(topicos.filter((t) => t.id !== id))

      if (topicoSelecionadoId === id) {
        setTopicoSelecionadoId(null)
      }

      await Swal.fire({
        title: 'Tópico deletado',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false,
      })
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : 'Não foi possível deletar o tópico.'
      await Swal.fire({
        title: 'Erro',
        text: mensagem,
        icon: 'error',
      })
    }
  }

  async function handleDeletarMicroVitoria(id: number) {
    const result = await Swal.fire({
      title: 'Deletar microvitória?',
      text: 'Essa ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
    })

    if (!result.isConfirmed) return

    try {
      await deletarMicroVitoria(id)
      setMicroVitorias(microVitorias.filter((mv) => mv.id !== id))

      await Swal.fire({
        title: 'Microvitória deletada',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false,
      })
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : 'Não foi possível deletar a microvitória.'
      await Swal.fire({
        title: 'Erro',
        text: mensagem,
        icon: 'error',
      })
    }
  }

  const topicoSelecionado = topicos.find((t) => t.id === topicoSelecionadoId)

  if (carregando) {
    return (
      <>
        <Header
          title="Mapa de Evolução de Estudos"
          subtitle="Acompanhe seu progresso e registre suas conquistas"
        />
        <main className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-600 border-t-blue-500"></div>
            </div>
            <p className="text-slate-300 text-lg font-medium">Carregando seus estudos...</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header
        title="Mapa de Evolução de Estudos"
        subtitle="Acompanhe seu progresso e registre suas conquistas"
      />
      <main className="min-h-full bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Seção de Formulários */}
          <section aria-labelledby="titulo-formularios" className="mb-8 grid md:grid-cols-2 gap-6">
            <Card title="Novo Tópico" subtitle="Adicione um assunto para estudar">
              <FormularioTopico onCriarTopico={handleCriarTopico} />
            </Card>
            <Card title="Nova Microvitória" subtitle="Registre um pequeno avanço">
              <FormularioMicroVitoria
                topicos={topicos}
                onCriarMicroVitoria={handleCriarMicroVitoria}
              />
            </Card>
          </section>

          {/* Seção Principal: Dashboard com Sidebar */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Sidebar - Insights e Estatísticas */}
            <Sidebar title="Insights e Estatísticas">
              <Insights topicos={topicos} microVitorias={microVitorias} />
              
              <hr className="border-slate-700 my-4" />
              
              <div className="space-y-3">
                <div className="bg-blue-900/30 rounded-lg p-3 border-l-4 border-blue-500">
                  <p className="text-2xl font-bold text-blue-400">{topicos.length}</p>
                  <p className="text-xs text-slate-400">Tópicos cadastrados</p>
                </div>
                <div className="bg-green-900/30 rounded-lg p-3 border-l-4 border-green-500">
                  <p className="text-2xl font-bold text-green-400">{microVitorias.length}</p>
                  <p className="text-xs text-slate-400">Microvitórias registradas</p>
                </div>
                {topicos.length > 0 && (
                  <div className="bg-purple-900/30 rounded-lg p-3 border-l-4 border-purple-500">
                    <p className="text-2xl font-bold text-purple-400">
                      {Math.round((topicos.filter((t) => t.nivel >= 2).length / topicos.length) * 100)}%
                    </p>
                    <p className="text-xs text-slate-400">Tópicos avançados</p>
                  </div>
                )}
                {topicoSelecionadoId !== null && (
                  <div className="bg-amber-900/30 rounded-lg p-3 border-l-4 border-amber-500">
                    <p className="text-xs font-medium text-amber-300">
                      ✓ {topicoSelecionado?.nome} selecionado
                    </p>
                  </div>
                )}
              </div>
            </Sidebar>

            <div className="md:col-span-2 space-y-6">
              {/* Mapa de Tópicos - Agrupado por Nível */}
              {topicos.length > 0 ? (
                <Card
                  title="Mapa de Evolução"
                  subtitle="Sua jornada de aprendizado organizada por nível"
                >
                  <ListaTopicos
                    topicos={topicos}
                    topicoSelecionadoId={topicoSelecionadoId}
                    onSelecionarTopico={setTopicoSelecionadoId}
                    onAumentarNivel={handleAumentarNivel}
                    onDiminuirNivel={handleDiminuirNivel}
                    onDeletarTopico={handleDeletarTopico}
                  />
                </Card>
              ) : (
                <Card title="Mapa de Evolução" subtitle="Sua jornada começa aqui">
                  <div className="text-center py-8">
                    <p className="text-slate-400 mb-2">Nenhum tópico cadastrado ainda</p>
                    <p className="text-sm text-slate-500">Crie seu primeiro tópico no formulário acima para começar!</p>
                  </div>
                </Card>
              )}

              {/* Mapa de Microvitórias - Agrupado por Tópico */}
              {microVitorias.length > 0 ? (
                <Card
                  title="Suas Conquistas"
                  subtitle="Microvitórias registradas organizadas por tópico"
                >
                  <MapaMicroVitorias
                    microVitorias={microVitoriasFiltradas}
                    topicos={topicos}
                    onDeletarMicroVitoria={handleDeletarMicroVitoria}
                  />
                </Card>
              ) : (
                <Card title="Suas Conquistas" subtitle="Registre seus pequenos avanços">
                  <div className="text-center py-8">
                    <p className="text-slate-400 mb-2">Nenhuma microvitória registrada</p>
                    <p className="text-sm text-slate-500">Cada pequena vitória conta! Registre uma acima.</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
