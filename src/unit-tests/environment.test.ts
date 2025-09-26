import { describe, it, expect } from "vitest";
import {
  AzureEnvironment,
  type AzureEnvironments,
} from "../core/diagnostics/environment.js";

describe("Azure Environment Configuration", () => {
  describe("AzureEnvironment", () => {
    it("should contain all expected environments", () => {
      expect(AzureEnvironment).toHaveProperty("Public");
      expect(AzureEnvironment).toHaveProperty("Fairfax");
      expect(AzureEnvironment).toHaveProperty("Mooncake");
    });

    it("should have correct URL for Public environment", () => {
      expect(AzureEnvironment.Public).toBe(
        "https://hosting.portal.azure.net/api/diagnostics"
      );
    });

    it("should have correct URL for Fairfax environment", () => {
      expect(AzureEnvironment.Fairfax).toBe(
        "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics"
      );
    });

    it("should have correct URL for Mooncake environment", () => {
      expect(AzureEnvironment.Mooncake).toBe(
        "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics"
      );
    });

    it("should have exactly 3 environments", () => {
      const environmentCount = Object.keys(AzureEnvironment).length;
      expect(environmentCount).toBe(3);
    });

    it("should have all URLs using HTTPS", () => {
      Object.values(AzureEnvironment).forEach((url) => {
        expect(url).toMatch(/^https:\/\//);
      });
    });

    it("should have all URLs ending with the diagnostics endpoint", () => {
      Object.values(AzureEnvironment).forEach((url) => {
        expect(url).toMatch(/\/api\/diagnostics$/);
      });
    });

    it("should allow environment keys to be used as type", () => {
      // This is a compile-time test that the type works correctly
      const environments: AzureEnvironments = ["Public", "Fairfax", "Mooncake"];

      environments.forEach((env) => {
        expect(AzureEnvironment[env]).toBeDefined();
        expect(typeof AzureEnvironment[env]).toBe("string");
      });
    });
  });

  describe("Environment URL validation", () => {
    it("should have valid hostnames for all environments", () => {
      const publicHostname = new URL(AzureEnvironment.Public).hostname;
      const fairfaxHostname = new URL(AzureEnvironment.Fairfax).hostname;
      const mooncakeHostname = new URL(AzureEnvironment.Mooncake).hostname;

      expect(publicHostname).toBe("hosting.portal.azure.net");
      expect(fairfaxHostname).toBe("hosting.azureportal.usgovcloudapi.net");
      expect(mooncakeHostname).toBe("hosting.azureportal.chinacloudapi.cn");
    });

    it("should have valid URL objects for all environments", () => {
      Object.values(AzureEnvironment).forEach((url) => {
        expect(() => new URL(url)).not.toThrow();
      });
    });

    it("should have consistent path structure", () => {
      Object.values(AzureEnvironment).forEach((url) => {
        const urlObj = new URL(url);
        expect(urlObj.pathname).toBe("/api/diagnostics");
      });
    });
  });
});
