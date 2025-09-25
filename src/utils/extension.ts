import type {
  Extension,
  ExtensionError,
  ExtensionInfo,
  ExtensionsProps,
} from "../diagnostics.js";

export function isExtensionError(
  value: Extension | undefined
): value is ExtensionError {
  return value !== undefined && "lastError" in value;
}

export function isExtensionInfo(
  value: Extension | undefined
): value is ExtensionInfo {
  return value !== undefined && "extensionName" in value;
}

export function sortExtensionsByName(
  extensions: ExtensionsProps["extensions"]
): string[] {
  return Object.keys(extensions).toSorted((a, b) => {
    const extA = extensions[a];
    const extB = extensions[b];

    if (isExtensionInfo(extA) && isExtensionInfo(extB)) {
      return extA.extensionName.localeCompare(extB.extensionName);
    }

    return 0;
  });
}
