# Editor de emendas

Editor web standalone de edição de emendas a MPV.

A aplicação Javascript fica em /jsapp

Aplicação em produção: https://www.congressonacional.leg.br/editor-emendas

**Restrições**
- Apenas emendas ao texto principal da MPV. Não contempla emenda a anexos.
- Não contempla proposição de novos agrupadores de artigo.
- Não integra com nenhuma outra aplicação (SEDOL, Autenticador etc.)
- Não tem autenticação.
- Não armazena emenda em servidor de banco de dados ou outro tipo de repositório.

**Requisitos funcionais:**

Essencial
- Criar nova emenda
  - Selecionar MP para emendamento.
  - Selecionar tipo de emenda (emenda padrão ou artigo onde couber)
- Nomear e renomear a emenda em edição (nome do arquivo)
- Exportar/Baixar/Download de emenda em PDF
- Importar/Upload de  emenda em PDF
- Visualizar PDF da emenda
- Tutoriais em vídeo

Desejável
- Salvar e abrir emenda no file system (**avaliar possibilidade**)
- Listar emendas recentes para facilitar abrir
- Ajuda textual

**Requisitos não funcionais**
- Interface responsiva acessível em desktop, tablet e celular
- Utilizar HTTPS
- Domínio do congresso
- Implementar com lit e shoelace
- Utilizar cores do Congresso
- Executar no Chrome, Edge e Safari
