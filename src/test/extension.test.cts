const assert = require("assert");
const vscode = require("vscode");

suite("Extension Test Suite", () => {
  suiteSetup(async () => {
    // Activate the extension
    const extension = vscode.extensions.getExtension(
      "joechung2008.diagnostics-vscode"
    );
    await extension?.activate();
  });

  test("Extension should be present", () => {
    const ext = vscode.extensions.getExtension(
      "joechung2008.diagnostics-vscode"
    );
    assert.ok(ext);
  });

  test("Command should be registered", async () => {
    const commands = await vscode.commands.getCommands();
    assert.ok(commands.includes("diagnostics-vscode.showAzureExtensions"));
  });
});
