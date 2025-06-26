// src/utils/crypto.ts
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'rubbyroom-secret-key';

export const encryptText = (text: string): string => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptText = (cipher: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return '[decryption error]';
  }
};
