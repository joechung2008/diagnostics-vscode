import * as vscode from "vscode";
import { showAzureExtensions } from "./adapters/commands/showAzureExtensions.js";

const extensionCommands = [
  {
    callback: showAzureExtensions,
    command: "diagnostics-vscode.showAzureExtensions",
  },
];

// Create and export the output channel for use across the extension
export let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
  // Create the output channel and add it to subscriptions for proper disposal
  outputChannel = vscode.window.createOutputChannel("Diagnostics Extension");
  context.subscriptions.push(outputChannel);

  for (const { command, callback } of extensionCommands) {
    const disposable = vscode.commands.registerCommand(command, () =>
      callback(context)
    );
    context.subscriptions.push(disposable);
  }
}

export function deactivate() {}
