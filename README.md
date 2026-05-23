# Co-criacao Assincrona | Etapa 1

Ambiente HTML para apresentar a metodologia de co-criacao assincrona e descentralizada do projeto de extensao "Ciencia Cidada e Ecossistema Digital".

## Objetivo

Organizar a primeira etapa do projeto antes da atualizacao do Hub principal: alinhar equipe, ideias, referencias, recursos existentes, rotina de ciclos e integracao com um mural colaborativo no Notion.

## Arquivos

- `index.html`: pagina publica para GitHub Pages.
- `notion-template.md`: modelo textual para criar o mural no Notion.
- `PUBLICACAO.md`: checklist para publicar como novo repositorio no GitHub Pages.

## Integracao com Notion

A pagina foi pensada para funcionar de forma segura em hospedagem estatica.

- O HTML pode guardar um link do Notion no navegador via `localStorage`.
- A aba `Notion` permite salvar o link do mural e tentar abrir uma previa incorporada.
- O mural real deve viver no Notion, com permissoes controladas para a equipe.
- Tokens da API do Notion nao devem ser colocados no HTML publico.
- Se futuramente houver necessidade de sincronizacao automatica, ela deve passar por um backend ou automacao segura.

## Nome sugerido do repositorio

`cocriacao-assincrona-extensao`

URL esperada no GitHub Pages:

```text
https://caetanoronan.github.io/cocriacao-assincrona-extensao/
```
