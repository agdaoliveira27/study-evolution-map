# PRD — Mapa de Evolução de Estudos

## Problema
Quem estuda de forma contínua (cursos, faculdade, autodidata) geralmente tem duas dores específicas:

- Não consegue visualizar com clareza **o que já evoluiu** em cada assunto (sensação de “não saí do lugar”).
- Perde o histórico de avanços pequenos (ex.: “entendi useEffect”, “fiz um componente”), que são importantes para manter motivação e direcionar os próximos passos.

**Usuário-alvo (específico):** pessoas que estudam desenvolvimento web (ex.: React/TypeScript) e precisam acompanhar progresso por assunto ao longo de semanas, com registros curtos e rápidos.

## Solução (essencial)
A solução é um “mapa” simples, com dois registros principais:

1) **Tópicos de estudo**
- O usuário cadastra tópicos (ex.: React, TypeScript).
- Cada tópico tem um **nível (0 a 3)** para indicar maturidade.
- O usuário consegue **aumentar/diminuir o nível** conforme evolui.

2) **Microvitórias**
- O usuário registra pequenas conquistas (texto curto) vinculadas a um tópico.
- As microvitórias aparecem em lista ordenada por data.
- O usuário pode **filtrar** microvitórias por tópico selecionado.

Critério de essencialidade:
- Sem tópicos e seus níveis → perde o mapa de evolução.
- Sem microvitórias → perde histórico motivacional e rastreabilidade do avanço.
- Sem atualização de nível (PATCH) → não existe “evolução”, só cadastro.
- Sem remoção → o mapa fica “poluído” e o usuário perde controle do próprio sistema.

## Requisitos funcionais (mínimos)
- **Leitura (GET):** buscar e exibir tópicos e microvitórias; mostrar estado de carregamento e estado vazio.
- **Criação (POST):** formulário para criar tópico e microvitória; refletir na UI sem reload.
- **Atualização (PATCH):** alterar nível do tópico e refletir imediatamente.
- **Remoção (DELETE):** remover tópico e microvitória; refletir imediatamente; pedir confirmação para evitar exclusões acidentais.

## Decisões técnicas

### Front-end
- React com componentes funcionais + TypeScript.
- Vite para desenvolvimento/build.
- Tailwind CSS para estilos.
- Um hook: **`useMemo`** para filtrar microvitórias por tópico selecionado sem recalcular desnecessariamente.
- Camada de API isolada em `web/src/services/api.ts` para manter UI mais limpa.

### API
- API REST com **json-server**.
- Entidades expostas:
  - `Topico`: `{ id, nome, nivel }`
  - `MicroVitoria`: `{ id, topicoId, descricao, data }`
- Operações utilizadas e por quê:
  - `GET /topicos` e `GET /microvitorias`: carregar dashboard.
  - `POST /topicos` e `POST /microvitorias`: criar registros via formulário.
  - `PATCH /topicos/:id`: atualizar `nivel` sem sobrescrever o recurso inteiro.
  - `DELETE /topicos/:id` e `DELETE /microvitorias/:id`: remover itens que não fazem mais sentido.
