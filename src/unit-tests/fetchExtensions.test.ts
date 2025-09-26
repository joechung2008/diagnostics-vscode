import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Diagnostics } from "../diagnostics.js";

import {
  fetchDiagnosticsData,
  extractExtensions,
} from "../core/diagnostics/fetch.js";

// Mock fetch globally
global.fetch = vi.fn();

describe("Fetch Extensions Utilities", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("fetchDiagnosticsData", () => {
    it("should fetch and parse JSON successfully", async () => {
      const mockData: Diagnostics = {
        buildInfo: { buildVersion: "1.0.0" },
        extensions: {
          "ext-1": { extensionName: "Test", manageSdpEnabled: true },
        },
        serverInfo: {
          deploymentId: "test-deployment",
          extensionSync: { totalSyncAllCount: 5 },
          hostname: "test-host",
          serverId: "test-server",
        },
      };

      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response);

      const result = await fetchDiagnosticsData("https://example.com/api");

      expect(mockFetch).toHaveBeenCalledWith("https://example.com/api");
      expect(result).toEqual(mockData);
    });

    it("should throw error for HTTP error responses", async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response);

      await expect(
        fetchDiagnosticsData("https://example.com/api")
      ).rejects.toThrow("HTTP 404: Not Found");
    });

    it("should throw error for network failures", async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockRejectedValue(new Error("Network error"));

      await expect(
        fetchDiagnosticsData("https://example.com/api")
      ).rejects.toThrow("Network error");
    });

    it("should handle different HTTP error codes", async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      } as Response);

      await expect(
        fetchDiagnosticsData("https://example.com/api")
      ).rejects.toThrow("HTTP 500: Internal Server Error");
    });
  });

  describe("extractExtensions", () => {
    it("should extract extensions from diagnostics data", () => {
      const diagnosticsData: Diagnostics = {
        buildInfo: { buildVersion: "1.0.0" },
        extensions: {
          "ext-1": { extensionName: "Extension 1", manageSdpEnabled: true },
          "ext-2": { extensionName: "Extension 2", manageSdpEnabled: false },
        },
        serverInfo: {
          deploymentId: "test-deployment",
          extensionSync: { totalSyncAllCount: 10 },
          hostname: "test-host",
          serverId: "test-server",
        },
      };

      const result = extractExtensions(diagnosticsData);

      expect(result).toEqual({
        "ext-1": { extensionName: "Extension 1", manageSdpEnabled: true },
        "ext-2": { extensionName: "Extension 2", manageSdpEnabled: false },
      });
    });

    it("should handle empty extensions", () => {
      const diagnosticsData: Diagnostics = {
        buildInfo: { buildVersion: "1.0.0" },
        extensions: {},
        serverInfo: {
          deploymentId: "test-deployment",
          extensionSync: { totalSyncAllCount: 0 },
          hostname: "test-host",
          serverId: "test-server",
        },
      };

      const result = extractExtensions(diagnosticsData);

      expect(result).toEqual({});
    });

    it("should handle extensions with errors", () => {
      const diagnosticsData: Diagnostics = {
        buildInfo: { buildVersion: "1.0.0" },
        extensions: {
          "ext-1": {
            extensionName: "Working Extension",
            manageSdpEnabled: true,
          },
          "ext-2": {
            lastError: {
              errorMessage: "Extension failed to load",
              time: "2023-01-01T00:00:00Z",
            },
          },
        },
        serverInfo: {
          deploymentId: "test-deployment",
          extensionSync: { totalSyncAllCount: 1 },
          hostname: "test-host",
          serverId: "test-server",
        },
      };

      const result = extractExtensions(diagnosticsData);

      expect(result).toEqual({
        "ext-1": { extensionName: "Working Extension", manageSdpEnabled: true },
        "ext-2": {
          lastError: {
            errorMessage: "Extension failed to load",
            time: "2023-01-01T00:00:00Z",
          },
        },
      });
    });
  });
});
