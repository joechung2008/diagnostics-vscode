import { describe, it, expect } from "vitest";
import type { ExtensionsProps } from "../diagnostics.js";

import {
  isExtensionsEmpty,
  prepareExtensionChoices,
} from "../core/extensions/types.js";

describe("Pick Extension Utilities", () => {
  describe("isExtensionsEmpty", () => {
    it("should return true for empty extensions object", () => {
      const extensions: ExtensionsProps["extensions"] = {};
      expect(isExtensionsEmpty(extensions)).toBe(true);
    });

    it("should return false for non-empty extensions object", () => {
      const extensions: ExtensionsProps["extensions"] = {
        "ext-1": { extensionName: "Test Extension", manageSdpEnabled: true },
      };
      expect(isExtensionsEmpty(extensions)).toBe(false);
    });

    it("should return false for extensions with multiple entries", () => {
      const extensions: ExtensionsProps["extensions"] = {
        "ext-1": { extensionName: "Extension 1", manageSdpEnabled: true },
        "ext-2": { extensionName: "Extension 2", manageSdpEnabled: false },
        "ext-3": {
          lastError: {
            errorMessage: "Failed to load",
            time: "2023-01-01T00:00:00Z",
          },
        },
      };
      expect(isExtensionsEmpty(extensions)).toBe(false);
    });
  });

  describe("prepareExtensionChoices", () => {
    it("should return empty array for empty extensions", () => {
      const extensions: ExtensionsProps["extensions"] = {};
      const result = prepareExtensionChoices(extensions);
      expect(result).toEqual([]);
    });

    it("should return sorted extension keys for valid extensions", () => {
      const extensions: ExtensionsProps["extensions"] = {
        "ext-1": { extensionName: "Zebra Extension", manageSdpEnabled: true },
        "ext-2": { extensionName: "Alpha Extension", manageSdpEnabled: false },
        "ext-3": { extensionName: "Beta Extension", manageSdpEnabled: true },
      };

      const result = prepareExtensionChoices(extensions);

      // Should be sorted alphabetically by extension name
      expect(result).toEqual(["ext-2", "ext-3", "ext-1"]);
    });

    it("should handle extensions with error objects", () => {
      const extensions: ExtensionsProps["extensions"] = {
        "ext-1": { extensionName: "Working Extension", manageSdpEnabled: true },
        "ext-2": {
          lastError: {
            errorMessage: "Extension failed",
            time: "2023-01-01T00:00:00Z",
          },
        },
      };

      const result = prepareExtensionChoices(extensions);

      // Should include both keys (error extensions don't sort, so order may vary)
      expect(result).toHaveLength(2);
      expect(result).toContain("ext-1");
      expect(result).toContain("ext-2");
    });

    it("should handle mixed extension types", () => {
      const extensions: ExtensionsProps["extensions"] = {
        "ext-1": { extensionName: "Charlie Extension", manageSdpEnabled: true },
        "ext-2": { extensionName: "Alpha Extension", manageSdpEnabled: false },
        "ext-3": {
          lastError: {
            errorMessage: "Failed",
            time: "2023-01-01T00:00:00Z",
          },
        },
        "ext-4": { extensionName: "Beta Extension", manageSdpEnabled: true },
      };

      const result = prepareExtensionChoices(extensions);

      expect(result).toHaveLength(4);
      expect(result).toContain("ext-1");
      expect(result).toContain("ext-2");
      expect(result).toContain("ext-3");
      expect(result).toContain("ext-4");
    });

    it("should handle single extension", () => {
      const extensions: ExtensionsProps["extensions"] = {
        "single-ext": {
          extensionName: "Only Extension",
          manageSdpEnabled: true,
        },
      };

      const result = prepareExtensionChoices(extensions);

      expect(result).toEqual(["single-ext"]);
    });
  });
});
