const jsEnv = require('browser-or-node');
const cryptoRandomString = require('crypto-random-string');

const nodeRandId = cryptoRandomString({length: 4, type: 'hex'});

let nodeMac = cryptoRandomString({length: 12, type: 'hex'});

if (jsEnv.isBrowser) {
  // do browser only stuff
  // TODO Add browser not random identifier like node mac
}

if (jsEnv.isNode) {
  require('macaddress').one((err, mac) => {
    nodeMac = mac.toLowerCase().replace(/[^\w]/g, '');
  });
}


function uuid() {
  const arr = [];
  arr.push(nodeMac.substr(0, 8));
  arr.push(nodeMac.substr(8));
  arr.push(nodeRandId);
  const microtime = process.hrtime.bigint().toString(16);
  arr.push(microtime.substr(0, 4));
  const restMtime = microtime.substr(5);
  const rand = cryptoRandomString({length: 12 - restMtime.length, type: 'hex'});
  arr.push(restMtime + rand);
  return arr.join('-');
}

module.exports = uuid;



