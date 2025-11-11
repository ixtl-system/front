# Summary
- Adicionei testes unitários para o `CustomSelect`, `Loader`, hooks de doenças e cirurgias e utilitário de datas de eventos, garantindo cobertura dos comportamentos principais.
- Ajustei `EventContext.fetchEvents` para ordenar os eventos do mais recente para o mais antigo, mantendo a listagem consistente com a expectativa da suíte de testes.

# Motivation
- Cobrir componentes e hooks que ainda não tinham testes automatizados ajuda a evitar regressões ao lidar com formulários, seletores e utilidades usados em múltiplas telas.
- Ordenar os eventos por data assegura que a interface continue destacando as atividades futuras sem depender da ordem do backend e evita falhas intermitentes nos testes.

# Request origin
vscode
