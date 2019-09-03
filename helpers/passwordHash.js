const crypto = require('crypto');
const mysalt = "wabi";

module.exports = function(password){
  return crypto.createHash('sha512').update( mysalt + password + mysalt).digest('base64');
};
