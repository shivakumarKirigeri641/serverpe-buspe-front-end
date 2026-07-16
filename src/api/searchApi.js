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

export function submitSearchRequest({ mobile, fromLocation, toLocation, travelDate }) {
  return request("/search-requests", {
    method: "POST",
    body: JSON.stringify({ mobile, fromLocation, toLocation, travelDate }),
  });
}
