import * as vscode from "vscode";
import type { ExtensionsProps } from "../../diagnostics.js";
import {
  isExtensionsEmpty,
  prepareExtensionChoices,
} from "../../core/extensions/types.js";

/**
 * VS Code-specific wrapper that handles UI interactions for extension selection
 */
export async function pickExtension(
  extensions: ExtensionsProps["extensions"]
): Promise<string | undefined> {
  if (isExtensionsEmpty(extensions)) {
    vscode.window.showInformationMessage("No extensions available.");
    return undefined;
  }

  const choices = prepareExtensionChoices(extensions);

  return vscode.window.showQuickPick(choices, {
    placeHolder: "Select an Azure extension to learn more",
  });
}
