// Encrypt and Decrypt Room IDs
import CryptoJS from 'crypto-js';

const ROOM_SECRET_KEY = 'rubbyroom-secret-room-key';

export const encryptRoomId = (roomId: string): string => {
  return CryptoJS.AES.encrypt(roomId, ROOM_SECRET_KEY).toString();
};

export const decryptRoomId = (encryptedId: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedId, ROOM_SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return '[Invalid Room]';
  }
};
