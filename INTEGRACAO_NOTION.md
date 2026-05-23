# Integracao do mural com Notion

Este projeto pode continuar publicado no GitHub Pages e usar uma funcao Vercel como backend seguro para gravar ideias no Notion.

## Estado atual deste repositorio

Este repositorio esta configurado para:

- Site publico: `https://caetanoronan.github.io/cocriacao-assincrona-extensao/`
- Backend Vercel: `https://cocriacao-assincrona-extensao.vercel.app/api/ideas`
- Mural Notion: `https://www.notion.so/369d14c78a5681d7a249cbf518075897`
- Data source do banco "Cartoes do mural": `ac2e5776-fd2f-42ef-a119-47f681e1a6b4`

## Fluxo

1. O visitante preenche o formulario "Mural de ideias" no site.
2. O site envia a ideia para `https://cocriacao-assincrona-extensao.vercel.app/api/ideas`.
3. A funcao Vercel usa o token secreto do Notion.
4. A ideia vira um cartao no banco "Cartoes do mural".

Se a funcao ainda nao estiver publicada, o site salva a ideia apenas no navegador e exibe um aviso.

## Como clonar esta ideia

1. Crie ou clone um repositorio com estes arquivos.
2. Publique `index.html` no GitHub Pages.
3. Crie um mural no Notion com um banco de dados de cartoes.
4. Crie uma conexao interna do Notion.
5. De acesso dessa conexao ao mural ou ao banco de dados.
6. Importe o repositorio na Vercel.
7. Configure as variaveis de ambiente da Vercel.
8. Atualize o endpoint no `index.html`, se o dominio Vercel for diferente.

## Estrutura esperada no Notion

A funcao `api/ideas.js` deste projeto espera um banco com estas propriedades:

```text
Cartão      title
Status      status com opcoes: Not started, In progress, Done
Tipo        select com opcoes: Ideia, Pergunta, Decisão, Ação, Insight
Prioridade  select com opcoes: Alta, Média, Baixa
Notas       rich text
```

Se voce preferir criar propriedades sem acento, atualize os nomes e opcoes em `api/ideas.js`.

O Notion exige que os nomes das propriedades e das opcoes batam exatamente com o que a API envia.

## Criar a conexao no Notion

1. Acesse <https://www.notion.so/my-integrations>.
2. Crie uma nova conexao ou integracao interna.
3. Nome sugerido: `Mural Co-criacao Extensao`.
4. Copie o token de acesso da integracao.
5. Habilite capacidades de conteudo:
   - Read content
   - Insert content
   - Update content

Importante: o token deve ficar apenas na Vercel. Nunca coloque esse valor em `index.html`, commits, issues ou documentos publicos.

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

Se a API responder `Could not find data_source`, quase sempre significa que esta permissao ainda nao foi dada para a pagina ou banco correto.

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

## Testes rapidos

Verificar se a funcao existe:

```powershell
curl.exe -i https://cocriacao-assincrona-extensao.vercel.app/api/ideas
```

Resposta esperada para GET:

```text
405 Method Not Allowed
```

Isso e normal, porque a funcao aceita apenas `POST` e `OPTIONS`.

Testar CORS para o GitHub Pages:

```powershell
curl.exe -i -X OPTIONS https://cocriacao-assincrona-extensao.vercel.app/api/ideas -H "Origin: https://caetanoronan.github.io" -H "Access-Control-Request-Method: POST"
```

Resposta esperada:

```text
204 No Content
Access-Control-Allow-Origin: https://caetanoronan.github.io
```

Testar envio real:

```powershell
$body = @{
  title='Teste de integracao'
  column='livres'
  author='Teste'
  description='Teste tecnico de envio para o Notion.'
} | ConvertTo-Json

Invoke-WebRequest -Uri 'https://cocriacao-assincrona-extensao.vercel.app/api/ideas' -Method POST -Headers @{ Origin='https://caetanoronan.github.io' } -ContentType 'application/json' -Body $body
```

Resposta esperada:

```json
{"ok":true,"status":201,"pageUrl":"https://www.notion.so/..."}
```

## Diagnostico comum

- `API token is invalid.`: `NOTION_TOKEN` esta errado ou pertence a outro servico.
- `Could not find data_source`: a conexao do Notion nao foi adicionada ao mural/banco, ou `NOTION_DATA_SOURCE_ID` esta errado.
- Erro de CORS no navegador: confira se o dominio do site esta em `allowedOrigins` dentro de `api/ideas.js`.
- O site salva localmente, mas nao envia: confira o dominio em `onlineSubmitEndpoint` no `index.html`.
