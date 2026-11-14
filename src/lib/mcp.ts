/**
 * FlytBase Questathon MCP and REST Client
 * Runs on the server side (API routes / server actions).
 * Uses process.env.AQ_TOKEN.
 */

const MCP_ENDPOINT = process.env.MCP_URL || "https://questathon.aihackerscollective.com/api/public/mcp";
const REST_BASE = process.env.API_URL || "https://questathon.aihackerscollective.com/api/public/v1";

export async function callTool<T = any>(name: string, args: Record<string, any> = {}): Promise<T> {
  const token = process.env.AQ_TOKEN;
  if (!token) {
    throw new Error("Missing AQ_TOKEN in environment variables");
  }

  const res = await fetch(MCP_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: { name, arguments: args },
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`MCP fetch error (${res.status}): ${errorBody}`);
  }

  const data = await res.json();
  const { result, error } = data;
  if (error || result?.isError) {
    const msg = error?.message ?? result?.content?.[0]?.text ?? "Unknown MCP error";
    throw new Error(msg);
  }

  const textPayload = result?.content?.[0]?.text;
  if (!textPayload) return result as T;

  try {
    return JSON.parse(textPayload) as T;
  } catch {
    return textPayload as unknown as T;
  }
}

export async function fetchExport(): Promise<any> {
  const token = process.env.AQ_TOKEN;
  if (!token) throw new Error("Missing AQ_TOKEN");

  const res = await fetch(`${REST_BASE}/export`, {
    headers: {
      authorization: `Bearer ${token}`,
      accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Export fetch error (${res.status}): ${await res.text()}`);
  }

  return res.json();
}

export async function postNote(note: { account?: string; kind?: string; title?: string; text: string }) {
  const token = process.env.AQ_TOKEN;
  if (!token) throw new Error("Missing AQ_TOKEN");

  // Can use either MCP write_note or REST POST /api/public/v1/notes
  try {
    return await callTool("write_note", note);
  } catch {
    const res = await fetch(`${REST_BASE}/notes`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(note),
    });
    return res.json();
  }
}
