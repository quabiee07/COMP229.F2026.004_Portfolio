const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function apiRequest(path, options = {}) {
    const { headers, ...rest } = options;
    const response = await fetch(`${BASE_URL}${path}`, {
        ...rest,
        headers: {
            "Content-Type": "application/json", ...headers
        }
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(payload.message || `Request failed (${response.status})`);
    }
    return payload;
}
