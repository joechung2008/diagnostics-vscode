import * as vscode from "vscode";
import { outputChannel } from "../../extension.js";
import { displayExtension } from "../webview/extensionDisplay.js";
import { AzureEnvironment } from "../../core/diagnostics/environment.js";
import { fetchExtensions } from "../ui/extensionsFetcher.js";
import { pickEnvironment } from "../ui/environmentPicker.js";
import { pickExtension } from "../ui/extensionPicker.js";

export async function showAzureExtensions(context: vscode.ExtensionContext) {
  outputChannel.appendLine("Starting showAzureExtensions...");

  const environment = await pickEnvironment();
  if (!environment) {
    return;
  }

  const url = AzureEnvironment[environment];
  const extensions = await fetchExtensions(url, environment);
  const selectedKey = await pickExtension(extensions);
  if (selectedKey) {
    const extensionUri = context.extensionUri;
    outputChannel.appendLine(`Using extension URI: ${extensionUri}`);

    const tailwindPath = vscode.Uri.joinPath(
      extensionUri,
      "dist",
      "tailwind.css"
    );
    outputChannel.appendLine(`Checking Tailwind CSS file at: ${tailwindPath}`);

    try {
      await vscode.workspace.fs.stat(tailwindPath);
      outputChannel.appendLine(`Tailwind CSS file found at: ${tailwindPath}`);
    } catch {
      outputChannel.appendLine(
        `Tailwind CSS file not found at: ${tailwindPath}`
      );
      vscode.window.showErrorMessage("An unexpected error has occurred.");
      return;
    }

    await displayExtension(
      selectedKey,
      extensions,
      extensionUri,
      outputChannel
    );
  }
}
