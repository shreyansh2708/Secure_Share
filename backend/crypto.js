const crypto = require("crypto");

//console.log(crypto.getCiphers());
//console.log(crypto.getHashes());

let iv = crypto.randomBytes(16);// 96-bit IV

function encryptAndHash(data, encryptionKey) {
    // Encrypt the data    
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
    let encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);

    // Return the encrypted data and its hash
    return { encryptedData, iv };
}

function decrypt(data, encryptionKey, IV) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, IV);
    const decryptedData = Buffer.concat([decipher.update(data), decipher.final()]);
  
    return decryptedData;
  }


module.exports = { encryptAndHash, decrypt };