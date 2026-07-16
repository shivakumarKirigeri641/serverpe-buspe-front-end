const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5009";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.error || `Request failed (${response.status})`);
  }

  return body;
}

export function fetchQueryTypes() {
  return request("/query-types", { method: "GET" }).then((body) => body.queryTypes);
}

export function submitContactMe({ queryTypeId, name, mobile, email, message }) {
  return request("/contact-me", {
    method: "POST",
    body: JSON.stringify({ queryTypeId, name, mobile, email, message }),
  });
}
