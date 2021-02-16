const crypto = require('crypto');

exports.createHash = (data, salt = '') => {
  let shasum = crypto.createHash('sha256');
  shasum.update(data + salt);
  return shasum.digest('hex');
};

exports.compareHash = (attempted, stored, salt) => {
  return stored === this.createHash(attempted, salt);
};

exports.createRandom32String = () => {
  return crypto.randomBytes(32).toString('hex');
};