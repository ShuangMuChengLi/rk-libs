let { Buffer } = require('buffer');
const {
  createCipheriv,
  createDecipheriv,
  randomBytes
} = require('crypto');
const fs = require('fs');
const path = require('path');
const key = 'keykeykeykeykeykeykeykey';
const nonce = randomBytes(12);

const aad = Buffer.from('0123456789', 'hex');

const cipher = createCipheriv('aes-192-ccm', key, nonce, {
  authTagLength: 16
});
const plaintext = fs.readFileSync(path.resolve(__dirname, 'chunks-dist.zip'));
cipher.setAAD(aad, {
  plaintextLength: Buffer.byteLength(plaintext)
});
const ciphertext = cipher.update(plaintext);
cipher.final();
const tag = cipher.getAuthTag();

// Now transmit { ciphertext, nonce, tag }.

const decipher = createDecipheriv('aes-192-ccm', key, nonce, {
  authTagLength: 16
});
decipher.setAuthTag(tag);
decipher.setAAD(aad, {
  plaintextLength: ciphertext.length
});
const receivedPlaintext = decipher.update(ciphertext);

try {
  decipher.final();
} catch (err) {
  throw new Error('Authentication failed!', { cause: err });
}
fs.writeFileSync(path.resolve(__dirname, 'chunks-dist2.zip'), receivedPlaintext);
