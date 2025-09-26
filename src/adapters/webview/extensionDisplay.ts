import * as path from "path";
import * as vscode from "vscode";
import type { ExtensionsProps } from "../../diagnostics.js";
import {
  renderExtensionContent,
  renderFullHtml,
} from "../../core/rendering/html.js";

export async function displayExtension(
  selectedKey: string,
  extensions: ExtensionsProps["extensions"],
  extensionUri: vscode.Uri,
  outputChannel: vscode.OutputChannel
): Promise<void> {
  const selectedExtension = extensions[selectedKey];

  if (!selectedExtension) {
    vscode.window.showErrorMessage("Extension not found.");
    return;
  }

  const panel = vscode.window.createWebviewPanel(
    "extensionDetails",
    "Extension Details",
    vscode.ViewColumn.One
  );

  const tailwindUri = panel.webview.asWebviewUri(
    vscode.Uri.file(path.join(extensionUri.fsPath, "dist", "tailwind.css"))
  );

  outputChannel.appendLine(`Selected extension key: ${selectedKey}`);
  outputChannel.appendLine(
    `Selected extension: ${JSON.stringify(selectedExtension, null, 2)}`
  );
  outputChannel.appendLine(`Tailwind CSS URI: ${tailwindUri.toString()}`);

  const content = renderExtensionContent(selectedExtension);
  const htmlContent = renderFullHtml(content, tailwindUri.toString());

  panel.webview.html = htmlContent;
  panel.reveal(vscode.ViewColumn.One);
}
