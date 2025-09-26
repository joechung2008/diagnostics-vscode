import type { ExtensionsProps } from "../../diagnostics.js";
import { isExtensionError, isExtensionInfo } from "../extensions/types.js";

export function renderConfigTable(
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

export function renderStageDefinitionTable(
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

/**
 * Pure function to render extension content based on its type
 */
export function renderExtensionContent(
  extension: ExtensionsProps["extensions"][string]
): string {
  if (isExtensionInfo(extension)) {
    let content = `
  <h1>${extension.extensionName}</h1>
  <p><strong>Manage SDP Enabled:</strong> ${extension.manageSdpEnabled ? "Yes" : "No"}</p>
`;

    if (extension.config) {
      content += renderConfigTable(extension.config, "Configuration");
    }
    if (extension.stageDefinition) {
      content += renderStageDefinitionTable(
        extension.stageDefinition,
        "Stage Definitions"
      );
    }
    return content;
  } else if (isExtensionError(extension)) {
    return `
    <h1>Extension Error</h1>
    <p><strong>Error:</strong> ${extension.lastError.errorMessage}</p>
    <p><strong>Time:</strong> ${extension.lastError.time}</p>
  `;
  } else {
    return `<p>Unknown extension type.</p>`;
  }
}

/**
 * Pure function to render complete HTML document
 */
export function renderFullHtml(content: string, tailwindUri: string): string {
  return `
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
}
