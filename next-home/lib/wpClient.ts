// Cliente WordPress (headless) — usado quando NEXT_PUBLIC_CMS=wordpress.
// Consome a API REST custom rdc/v1 documentada em Integracao-WordPress-Headless-RDC.md.
const WP_API = process.env.NEXT_PUBLIC_WP_API_URL || "";

async function wpGet<T>(path: string, fallback: T): Promise<T> {
  if (!WP_API) return fallback;
  try {
    const res = await fetch(`${WP_API}/rdc/v1/${path}`, { next: { revalidate: 30 } });
    if (!res.ok) return fallback;
    const data = (await res.json()) as T | null;
    return (data ?? fallback) as T;
  } catch {
    return fallback;
  }
}

export const wpPage = <T>(slug: string, fallback: T) => wpGet<T>(`page/${slug}`, fallback);
export const wpCollection = <T>(type: string) => wpGet<T[]>(`collection/${type}`, [] as T[]);
