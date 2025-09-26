import type { Diagnostics, ExtensionsProps } from "../../diagnostics.js";

/**
 * Pure function to fetch and parse diagnostics data from a URL
 * Throws errors instead of handling them, making it unit testable
 */
export async function fetchDiagnosticsData(url: string): Promise<Diagnostics> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<Diagnostics>;
}

/**
 * Pure function to extract extensions from diagnostics data
 */
export function extractExtensions(
  data: Diagnostics
): ExtensionsProps["extensions"] {
  return data.extensions;
}
