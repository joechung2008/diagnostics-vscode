import { describe, it, expect } from "vitest";
import {
  isExtensionError,
  isExtensionInfo,
  sortExtensionsByName,
} from "../core/extensions/types.js";
import type {
  ExtensionError,
  ExtensionInfo,
  ExtensionsProps,
} from "../diagnostics.js";

describe("Extension Utilities", () => {
  describe("isExtensionError", () => {
    it("should return true for extension error objects", () => {
      const error: ExtensionError = {
        lastError: {
          errorMessage: "Test error",
          time: "2023-01-01T00:00:00Z",
        },
      };

      expect(isExtensionError(error)).toBe(true);
    });

    it("should return false for extension info objects", () => {
      const info: ExtensionInfo = {
        extensionName: "Test Extension",
        manageSdpEnabled: true,
      };

      expect(isExtensionError(info)).toBe(false);
    });

    it("should return false for undefined", () => {
      expect(isExtensionError(undefined)).toBe(false);
    });
  });

  describe("isExtensionInfo", () => {
    it("should return true for extension info objects", () => {
      const info: ExtensionInfo = {
        extensionName: "Test Extension",
        manageSdpEnabled: false,
        config: { key: "value" },
        stageDefinition: { stage: ["value1", "value2"] },
      };

      expect(isExtensionInfo(info)).toBe(true);
    });

    it("should return false for extension error objects", () => {
      const error: ExtensionError = {
        lastError: {
          errorMessage: "Test error",
          time: "2023-01-01T00:00:00Z",
        },
      };

      expect(isExtensionInfo(error)).toBe(false);
    });

    it("should return false for undefined", () => {
      expect(isExtensionInfo(undefined)).toBe(false);
    });
  });

  describe("sortExtensionsByName", () => {
    it("should sort extensions alphabetically by name", () => {
      const extensions: ExtensionsProps["extensions"] = {
        "ext-1": {
          extensionName: "Zebra Extension",
          manageSdpEnabled: true,
        },
        "ext-2": {
          extensionName: "Alpha Extension",
          manageSdpEnabled: false,
        },
        "ext-3": {
          extensionName: "Beta Extension",
          manageSdpEnabled: true,
        },
      };

      const sorted = sortExtensionsByName(extensions);

      expect(sorted).toEqual(["ext-2", "ext-3", "ext-1"]);
    });

    it("should handle extensions with error objects", () => {
      const extensions: ExtensionsProps["extensions"] = {
        "ext-1": {
          extensionName: "Test Extension",
          manageSdpEnabled: true,
        },
        "ext-2": {
          lastError: {
            errorMessage: "Error",
            time: "2023-01-01T00:00:00Z",
          },
        },
      };

      const sorted = sortExtensionsByName(extensions);

      // Should include both keys, but order may vary since error objects don't sort
      expect(sorted).toHaveLength(2);
      expect(sorted).toContain("ext-1");
      expect(sorted).toContain("ext-2");
    });

    it("should handle empty extensions object", () => {
      const extensions: ExtensionsProps["extensions"] = {};

      const sorted = sortExtensionsByName(extensions);

      expect(sorted).toEqual([]);
    });
  });
});
