const NOTION_VERSION = process.env.NOTION_VERSION || "2026-03-11";
const DEFAULT_DATA_SOURCE_ID = "ac2e5776-fd2f-42ef-a119-47f681e1a6b4";

const columnMap = {
  temos: { type: "Insight", status: "Done", priority: "Média", label: "O que ja temos" },
  livres: { type: "Ideia", status: "Not started", priority: "Média", label: "Ideias livres" },
  referencias: { type: "Insight", status: "Not started", priority: "Baixa", label: "Referencias e inspiracoes" },
  maturacao: { type: "Ideia", status: "In progress", priority: "Média", label: "Ideias em maturacao" },
  adotadas: { type: "Decisão", status: "Done", priority: "Alta", label: "Ideias adotadas" },
  acoes: { type: "Ação", status: "In progress", priority: "Alta", label: "Proximas acoes" }
};

function setCorsHeaders(req, res) {
  const allowedOrigins = [
    "https://caetanoronan.github.io",
    "https://cocriacao-assincrona-extensao.vercel.app",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:5500"
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function cleanText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function richText(content) {
  return {
    rich_text: [
      {
        type: "text",
        text: { content }
      }
    ]
  };
}

function select(name) {
  return { select: { name } };
}

function status(name) {
  return { status: { name } };
}

function buildContent({ author, columnLabel, description }) {
  return [
    {
      object: "block",
      type: "heading_2",
      heading_2: {
        rich_text: [{ type: "text", text: { content: "Descrição" } }]
      }
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [{ type: "text", text: { content: description } }]
      }
    },
    {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: { content: `Autor ou grupo: ${author || "Sem autor"} | Categoria no site: ${columnLabel}` }
          }
        ]
      }
    }
  ];
}

async function createNotionPage(idea) {
  const token = process.env.NOTION_TOKEN;
  const dataSourceId = process.env.NOTION_DATA_SOURCE_ID || DEFAULT_DATA_SOURCE_ID;

  if (!token) {
    return { ok: false, status: 500, message: "NOTION_TOKEN nao configurado no backend." };
  }

  const column = columnMap[idea.column] || columnMap.livres;
  const title = cleanText(idea.title, 90);
  const author = cleanText(idea.author, 60);
  const description = cleanText(idea.description, 2000);

  if (!title || !description) {
    return { ok: false, status: 400, message: "Titulo e descricao sao obrigatorios." };
  }

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Notion-Version": NOTION_VERSION
    },
    body: JSON.stringify({
      parent: { data_source_id: dataSourceId },
      properties: {
        "Cartão": {
          title: [
            {
              type: "text",
              text: { content: title }
            }
          ]
        },
        Status: status(column.status),
        Tipo: select(column.type),
        Prioridade: select(column.priority),
        Notas: richText(`Enviado pelo site. Autor/grupo: ${author || "Sem autor"}. Categoria: ${column.label}.`)
      },
      children: buildContent({
        author,
        columnLabel: column.label,
        description
      })
    })
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      message: data.message || "Erro ao criar pagina no Notion."
    };
  }

  return { ok: true, status: 201, pageUrl: data.url };
}

function parseBody(body) {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    return JSON.parse(body);
  }

  return body;
}

module.exports = async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, message: "Metodo nao permitido." });
    return;
  }

  try {
    const result = await createNotionPage(parseBody(req.body));
    res.status(result.status).json(result);
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Erro inesperado ao enviar ideia.",
      detail: error instanceof Error ? error.message : String(error)
    });
  }
};
