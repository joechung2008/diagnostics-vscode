import * as path from "path";
import * as vscode from "vscode";
import type { ExtensionsProps } from "../diagnostics.js";
import { isExtensionError, isExtensionInfo } from "../lib/extension.js";

function renderConfigTable(
  config: Record<string, string>,
  title: string
): string {
  return `
    <h2>${title}</h2>
    <table>
      <thead>
        <tr style="background-color: var(--vscode-settings-headerBackground);">
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(config)
          .map(
            ([key, value]) => `
          <tr>
            <td>${key}</td>
            <td>${value}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderStageDefinitionTable(
  stageDefinition: Record<string, string[]>,
  title: string
): string {
  return `
    <h2>${title}</h2>
    <table>
      <thead>
        <tr style="background-color: var(--vscode-settings-headerBackground);">
          <th>Key</th>
          <th>Values</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(stageDefinition)
          .map(
            ([key, values]) => `
          <tr>
            <td>${key}</td>
            <td>${values.join(", ")}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

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

  let content = "";

  if (isExtensionInfo(selectedExtension)) {
    content = `
  <h1>${selectedExtension.extensionName}</h1>
  <p><strong>Manage SDP Enabled:</strong> ${selectedExtension.manageSdpEnabled ? "Yes" : "No"}</p>
`;

    if (selectedExtension.config) {
      content += renderConfigTable(selectedExtension.config, "Configuration");
    }
    if (selectedExtension.stageDefinition) {
      content += renderStageDefinitionTable(
        selectedExtension.stageDefinition,
        "Stage Definitions"
      );
    }
  } else if (isExtensionError(selectedExtension)) {
    content = `
    <h1>Extension Error</h1>
    <p><strong>Error:</strong> ${selectedExtension.lastError.errorMessage}</p>
    <p><strong>Time:</strong> ${selectedExtension.lastError.time}</p>
  `;
  } else {
    content = `<p>Unknown extension type.</p>`;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="${tailwindUri}" rel="stylesheet">
  <title>Extension Details</title>
</head>
<body>
  <div class="container mx-auto p-4 prose">
    ${content}
  </div>
</body>
</html>`;

  panel.webview.html = htmlContent;

  panel.reveal(vscode.ViewColumn.One);
}
