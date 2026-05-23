# Co-criacao Assincrona | Etapa 1

Ambiente HTML para apresentar a metodologia de co-criacao assincrona e descentralizada do projeto de extensao "Ciencia Cidada e Ecossistema Digital".

## Objetivo

Organizar a primeira etapa do projeto antes da atualizacao do Hub principal: alinhar equipe, ideias, referencias, recursos existentes, rotina de ciclos e integracao com um mural colaborativo no Notion.

## Arquivos

- `index.html`: pagina publica para GitHub Pages.
- `api/ideas.js`: funcao serverless para enviar ideias ao Notion via Vercel.
- `vercel.json`: configuracao minima da funcao Vercel.
- `INTEGRACAO_NOTION.md`: passo a passo completo para clonar e publicar a integracao.
- `notion-template.md`: modelo textual para criar o mural no Notion.
- `PUBLICACAO.md`: checklist para publicar como novo repositorio no GitHub Pages.

## Integracao com Notion

A pagina foi pensada para funcionar de forma segura em hospedagem estatica e backend separado.

- O GitHub Pages publica o HTML estatico.
- A Vercel hospeda `/api/ideas`, que recebe as ideias do formulario.
- A funcao Vercel usa `NOTION_TOKEN` e `NOTION_DATA_SOURCE_ID` como variaveis secretas.
- O mural real vive no Notion, com permissoes controladas para a equipe.
- Tokens da API do Notion nao devem ser colocados no HTML publico.
- Se a API estiver indisponivel, o site salva uma copia local no navegador.

Consulte `INTEGRACAO_NOTION.md` para repetir este procedimento em outro workspace ou repositorio.

## Nome sugerido do repositorio

`cocriacao-assincrona-extensao`

URL esperada no GitHub Pages:

```text
https://caetanoronan.github.io/cocriacao-assincrona-extensao/
```
