import * as vscode from "vscode";
import type { ExtensionsProps } from "../diagnostics.js";
import { sortExtensionsByName } from "../lib/extension.js";

export async function pickExtension(
  extensions: ExtensionsProps["extensions"]
): Promise<string | undefined> {
  if (Object.keys(extensions).length === 0) {
    vscode.window.showInformationMessage("No extensions available.");
    return undefined;
  }

  const sortedKeys = sortExtensionsByName(extensions);

  return vscode.window.showQuickPick(sortedKeys, {
    placeHolder: "Select an Azure extension to learn more",
  });
}
