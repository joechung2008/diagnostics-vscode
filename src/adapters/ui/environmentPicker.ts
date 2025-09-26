import * as vscode from "vscode";
import {
  AzureEnvironment,
  type AzureEnvironments,
} from "../../core/diagnostics/environment.js";

export async function pickEnvironment(): Promise<
  keyof typeof AzureEnvironment | undefined
> {
  return (await vscode.window.showQuickPick(
    Object.keys(AzureEnvironment) as AzureEnvironments,
    {
      placeHolder: "Select an Azure environment to load extensions from",
    }
  )) as keyof typeof AzureEnvironment;
}
