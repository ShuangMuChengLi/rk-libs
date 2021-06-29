import { createHash } from 'crypto';

function rkEncrypt(message, algorithm = 'md5'){
  const hash = createHash(algorithm);
  hash.update(message);
  return hash.digest('hex');
}
export default rkEncrypt;
