let { createHash } = require('crypto');
/**
 *
 * @param message String 任意数据
 * @param algorithm String md5 sha1 sha256 sha512
 * @return {string} 十六进制的字符串
 */
function md5Sha(message, algorithm = 'md5'){
  const hash = createHash(algorithm);
  hash.update(message);
  return hash.digest('hex');
}
module.exports = md5Sha;
