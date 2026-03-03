// Simple obfuscation to prevent automated scraping of the API key
// NOTE: This is NOT true security. The key will still be visible in the network tab.
// For real security, use a backend proxy.

export const decryptKey = (encrypted: string): string => {
  try {
    // 1. Reverse the string
    const reversed = encrypted.split('').reverse().join('');
    // 2. Base64 decode
    const decoded = atob(reversed);
    // 3. Remove salt (if any) - keeping it simple for now
    return decoded;
  } catch (e) {
    console.error('Failed to decrypt key', e);
    return '';
  }
};

export const encryptKey = (key: string): string => {
  // 1. Base64 encode
  const encoded = btoa(key);
  // 2. Reverse the string
  return encoded.split('').reverse().join('');
};
