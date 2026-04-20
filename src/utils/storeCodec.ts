// utils/storeCodec.ts

/**
 * Generate a shareable store code
 * Format: "STORE-" + base64url(storeId + "|" + storeName + "|" + timestamp)
 * The resulting code is ~ 16-20 characters (excluding prefix)
 */
export function encodeStoreCode(storeId: string, storeName: string): string {
    const timestamp = Date.now();
    const payload = `${storeId}|${storeName}|${timestamp}`;
    // Use btoa (base64) then make it URL-safe
    let base64 = btoa(payload);
    base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return `STORE-${base64}`;
  }
  
  /**
   * Decode a store code and return the store ID and name (and optionally timestamp)
   * Returns null if invalid
   */
  export function decodeStoreCode(code: string): { storeId: string; storeName: string; timestamp: number } | null {
    if (!code.startsWith('STORE-')) return null;
    const base64 = code.slice(6).replace(/-/g, '+').replace(/_/g, '/');
    try {
      const decoded = atob(base64);
      const parts = decoded.split('|');
      if (parts.length !== 3) return null;
      const [storeId, storeName, timestampStr] = parts;
      const timestamp = parseInt(timestampStr, 10);
      if (isNaN(timestamp)) return null;
      return { storeId, storeName, timestamp };
    } catch {
      return null;
    }
  }