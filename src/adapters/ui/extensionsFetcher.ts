import * as vscode from "vscode";
import type { ExtensionsProps } from "../../diagnostics.js";
import {
  fetchDiagnosticsData,
  extractExtensions,
} from "../../core/diagnostics/fetch.js";

/**
 * VS Code-specific wrapper that handles errors with UI notifications
 */
export async function fetchExtensions(
  url: string,
  environment: string
): Promise<ExtensionsProps["extensions"]> {
  try {
    const data = await fetchDiagnosticsData(url);
    return extractExtensions(data);
  } catch (error) {
    vscode.window.showErrorMessage(
      `Error fetching from ${environment}: ${(error as Error).message}`
    );
    return {};
  }
}
