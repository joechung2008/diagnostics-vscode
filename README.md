# Azure Extension Diagnostics

A VS Code extension that provides diagnostic information about Azure portal extensions. This tool allows developers and administrators to view detailed information about extensions deployed in different Azure environments, including configuration settings, stage definitions, and error states.

## Features

This extension provides the following capabilities:

### Environment Selection

- Choose from multiple Azure environments: Public Cloud, US Government Cloud (Fairfax), and China Cloud (Mooncake)
- Connect to the appropriate Azure portal diagnostics API based on your selection

### Extension Diagnostics

- Fetch real-time diagnostic information about Azure portal extensions
- View extension status, configuration, and operational details
- Display extension-specific settings and stage definitions in organized tables

### Error Handling

- Identify extensions with errors and view detailed error messages
- See when errors occurred for troubleshooting purposes

### User-Friendly Interface

- Interactive quick-pick menus for environment and extension selection
- Rich webview display with formatted tables and styling
- Output channel logging for debugging and monitoring

To use the extension:

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Run the command "Diagnostics: Show Azure Extensions"
3. Select your Azure environment
4. Choose an extension to view its diagnostic information

## Requirements

- **VS Code**: Version 1.104.0 or higher
- **Internet Connection**: Required to fetch diagnostic data from Azure portal APIs
- **Azure Access**: Appropriate permissions to access the selected Azure environment's diagnostics endpoints

The extension will automatically handle API connectivity and display appropriate error messages if connections fail.

## Extension Settings

This extension does not currently contribute any VS Code settings. All functionality is accessed through the command palette.

## Known Issues

- **API Connectivity**: If Azure portal diagnostics APIs are unavailable or experiencing issues, the extension may fail to load extension data
- **Network Timeouts**: Slow network connections may cause the extension to timeout when fetching data
- **Authentication**: Some Azure environments may require specific authentication or network access that isn't available in all contexts
- **Data Format Changes**: If Azure changes their diagnostics API response format, the extension may need updates to handle the new format

If you encounter issues, check the "Diagnostics Extension" output channel in VS Code for detailed error messages.

## Release Notes

### 0.0.1

Initial release of Azure Extension Diagnostics extension.

**Features:**

- Support for multiple Azure environments (Public, Fairfax, Mooncake)
- Fetch and display Azure portal extension diagnostics
- Interactive extension selection and detailed information display
- Error handling and status reporting
- Clean webview interface with Tailwind CSS styling

**Known Limitations:**

- Requires internet access to Azure APIs
- No offline caching of diagnostic data
- Limited to extension information available through diagnostics endpoints

## Development

### Setup

Install the recommended extensions for development:

- [TSLint Problem Matcher](https://marketplace.visualstudio.com/items?itemName=amodio.tsl-problem-matcher)
- [Extension Test Runner](https://marketplace.visualstudio.com/items?itemName=ms-vscode.extension-test-runner)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Linux Development Setup

When developing on Linux, you may encounter an issue running tests due to a missing shared library `libasound.so.2`. To fix this, install the required development package:

```bash
sudo apt-get install libasound2-dev
```

### Running and Debugging

- Press `F5` to open a new window with your extension loaded
- Run the command from the command palette by pressing `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) and typing "Diagnostics: Show Azure Extensions"
- Set breakpoints in your code inside `src/` files to debug your extension
- Find output from your extension in the debug console and "Diagnostics Extension" output channel

### Making Changes

- You can relaunch the extension from the debug toolbar after changing code in `src/` files
- You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes

### Running Tests

- Install the [Extension Test Runner](https://marketplace.visualstudio.com/items?itemName=ms-vscode.extension-test-runner)
- Run the "watch" task via the **Tasks: Run Task** command. Make sure this is running, or tests might not be discovered
- Open the Testing view from the activity bar and click the "Run Test" button, or use the hotkey `Ctrl/Cmd + ; A`
- See the output of the test result in the Test Results view
- Make changes to `src/test/extension.test.ts` or create new test files inside the `test` folder
  - The provided test runner will only consider files matching the name pattern `**.test.ts`
  - You can create folders inside the `test` folder to structure your tests any way you want

---

**Enjoy!**
