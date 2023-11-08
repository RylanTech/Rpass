import CryptoJS from 'crypto-js'

export function encryptString(text: string | CryptoJS.lib.WordArray, password: string | CryptoJS.lib.WordArray) {
    const ciphertext = CryptoJS.AES.encrypt(text, password).toString();
    return ciphertext;
}

export function decryptString(encryptedText: string | CryptoJS.lib.CipherParams, password: string | CryptoJS.lib.WordArray) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, password);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
}