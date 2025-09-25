import * as vscode from "vscode";
import type { Diagnostics, ExtensionsProps } from "../diagnostics.js";

export async function fetchExtensions(
  url: string,
  environment: string
): Promise<ExtensionsProps["extensions"]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch from ${environment}: ${response.statusText}`
      );
    }
    const data = (await response.json()) as Diagnostics;
    return data.extensions;
  } catch (error) {
    vscode.window.showErrorMessage(
      `Error fetching from ${environment}: ${(error as Error).message}`
    );
    return {};
  }
}
