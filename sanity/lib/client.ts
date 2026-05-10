import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  stega: { studioUrl: "/studio" },
});

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60,
}: {
  query: string;
  params?: Record<string, string | number | boolean | null>;
  revalidate?: number;
}) {
  if (!projectId) {
    return null;
  }

  return client.fetch<QueryResponse>(query, params, {
    next: { revalidate },
  });
}
