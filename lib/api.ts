const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  "http://localhost:3000";

/* Client-side requests */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof document !== "undefined"
      ? document.cookie
          .split("; ")
          .find((row) => row.startsWith("admin_token="))
          ?.split("=")[1]
      : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "Request failed",
    }));
    throw new Error(error.error || "Request failed");
  }

  return response.json();
}

/* Server-side requests (for public pages) */
export async function serverApiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "Request failed",
    }));
    throw new Error(error.error || "Request failed");
  }

  return response.json();
}
