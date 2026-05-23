# Integracao do mural com Notion

Este projeto pode continuar publicado no GitHub Pages e usar uma funcao Vercel como backend seguro para gravar ideias no Notion.

## Fluxo

1. O visitante preenche o formulario "Mural de ideias" no site.
2. O site envia a ideia para `https://cocriacao-assincrona-extensao.vercel.app/api/ideas`.
3. A funcao Vercel usa o token secreto do Notion.
4. A ideia vira um cartao no banco "Cartoes do mural".

Se a funcao ainda nao estiver publicada, o site salva a ideia apenas no navegador e exibe um aviso.

## Variaveis de ambiente na Vercel

Configure no painel do projeto Vercel:

```text
NOTION_TOKEN=secret_xxx
NOTION_DATA_SOURCE_ID=ac2e5776-fd2f-42ef-a119-47f681e1a6b4
```

Opcional:

```text
NOTION_VERSION=2026-03-11
```

## Permissao no Notion

A integracao do Notion precisa ter acesso ao banco "Cartoes do mural". No Notion:

1. Abra o mural.
2. Abra o menu de compartilhamento/conexoes.
3. Convide a integracao criada em <https://www.notion.so/my-integrations>.
4. Confirme que ela pode editar o banco.

## Deploy

Depois de conectar o repositorio na Vercel, use este diretorio como projeto:

```text
cocriacao-assincrona
```

O dominio esperado pelo site e:

```text
https://cocriacao-assincrona-extensao.vercel.app
```

Se a Vercel gerar outro dominio, atualize `onlineSubmitEndpoint` em `index.html`.
