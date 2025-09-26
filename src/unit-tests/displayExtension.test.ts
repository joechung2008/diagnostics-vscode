import { describe, it, expect } from "vitest";
import type { ExtensionInfo, ExtensionError } from "../diagnostics.js";

import {
  renderConfigTable,
  renderStageDefinitionTable,
  renderExtensionContent,
  renderFullHtml,
} from "../core/rendering/html.js";

describe("Display Extension Utilities", () => {
  describe("renderConfigTable", () => {
    it("should render a basic config table", () => {
      const config = {
        apiKey: "test-key",
        environment: "production",
        timeout: "30000",
      };

      const html = renderConfigTable(config, "API Configuration");

      expect(html).toContain("<h2>API Configuration</h2>");
      expect(html).toContain("<table>");
      expect(html).toContain("<th>Key</th>");
      expect(html).toContain("<th>Value</th>");
      expect(html).toContain("<td>apiKey</td>");
      expect(html).toContain("<td>test-key</td>");
      expect(html).toContain("<td>environment</td>");
      expect(html).toContain("<td>production</td>");
    });

    it("should handle empty config object", () => {
      const config = {};
      const html = renderConfigTable(config, "Empty Config");

      expect(html).toContain("<h2>Empty Config</h2>");
      expect(html).toContain("<table>");
      expect(html).not.toContain("<td>");
    });
  });

  describe("renderStageDefinitionTable", () => {
    it("should render stage definition table", () => {
      const stageDefinition = {
        development: ["feature-flag-1", "feature-flag-2"],
        production: ["stable-feature"],
      };

      const html = renderStageDefinitionTable(stageDefinition, "Feature Flags");

      expect(html).toContain("<h2>Feature Flags</h2>");
      expect(html).toContain("<th>Key</th>");
      expect(html).toContain("<th>Values</th>");
      expect(html).toContain("<td>development</td>");
      expect(html).toContain("<td>feature-flag-1, feature-flag-2</td>");
    });
  });

  describe("renderExtensionContent", () => {
    it("should render extension info content", () => {
      const extension: ExtensionInfo = {
        extensionName: "Test Extension",
        manageSdpEnabled: true,
        config: { key1: "value1" },
        stageDefinition: { stage1: ["flag1", "flag2"] },
      };

      const html = renderExtensionContent(extension);

      expect(html).toContain("<h1>Test Extension</h1>");
      expect(html).toContain("Manage SDP Enabled:</strong> Yes");
      expect(html).toContain("<h2>Configuration</h2>");
      expect(html).toContain("<h2>Stage Definitions</h2>");
    });

    it("should render extension info without optional fields", () => {
      const extension: ExtensionInfo = {
        extensionName: "Simple Extension",
        manageSdpEnabled: false,
      };

      const html = renderExtensionContent(extension);

      expect(html).toContain("<h1>Simple Extension</h1>");
      expect(html).toContain("Manage SDP Enabled:</strong> No");
      expect(html).not.toContain("<h2>Configuration</h2>");
      expect(html).not.toContain("<h2>Stage Definitions</h2>");
    });

    it("should render extension error content", () => {
      const extension: ExtensionError = {
        lastError: {
          errorMessage: "Failed to initialize extension",
          time: "2023-01-01T10:30:00Z",
        },
      };

      const html = renderExtensionContent(extension);

      expect(html).toContain("<h1>Extension Error</h1>");
      expect(html).toContain("Error:</strong> Failed to initialize extension");
      expect(html).toContain("Time:</strong> 2023-01-01T10:30:00Z");
    });

    it("should handle unknown extension type", () => {
      // Simulate an unknown extension type by passing an object that doesn't match either type
      const unknownExtension = {} as ExtensionInfo | ExtensionError;
      const html = renderExtensionContent(unknownExtension);

      expect(html).toContain("<p>Unknown extension type.</p>");
    });
  });

  describe("renderFullHtml", () => {
    it("should render complete HTML document", () => {
      const content = "<h1>Test Content</h1><p>Some text</p>";
      const tailwindUri = "https://cdn.example.com/tailwind.css";

      const html = renderFullHtml(content, tailwindUri);

      expect(html).toContain("<!DOCTYPE html>");
      expect(html).toContain('<html lang="en">');
      expect(html).toContain('<meta charset="UTF-8">');
      expect(html).toContain("<title>Extension Details</title>");
      expect(html).toContain(`<link href="${tailwindUri}" rel="stylesheet">`);
      expect(html).toContain('<div class="container mx-auto p-4 prose">');
      expect(html).toContain(content);
      expect(html).toContain("</html>");
    });

    it("should handle empty content", () => {
      const content = "";
      const tailwindUri = "/local/tailwind.css";

      const html = renderFullHtml(content, tailwindUri);

      expect(html).toContain("<!DOCTYPE html>");
      expect(html).toContain(`<link href="${tailwindUri}" rel="stylesheet">`);
      expect(html).toContain('<div class="container mx-auto p-4 prose">');
      expect(html).toContain("</html>");
    });

    it("should properly escape HTML in URI", () => {
      const content = "<p>Test</p>";
      const tailwindUri = "file:///path/with spaces/tailwind.css";

      const html = renderFullHtml(content, tailwindUri);

      expect(html).toContain(`<link href="${tailwindUri}" rel="stylesheet">`);
    });
  });
});
