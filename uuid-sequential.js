const jsEnv = require('browser-or-node');
const cryptoRandomString = require('crypto-random-string');

let uuid = require('uuid/v1');

if (jsEnv.isBrowser) {
  const Fingerprint2 = require('fingerprintjs2');
  const objectHash = require('object-hash');
  let browserId = cryptoRandomString({ length: 12, type: 'hex' });

  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      Fingerprint2.get(function (components) {
        browserId = objectHash(components);
      })
    });
  } else {
    setTimeout(function () {
      Fingerprint2.get(function (components) {
        browserId = objectHash(components);
      })
    }, 500);
  }

  const browserRandId = cryptoRandomString({ length: 4, type: 'hex' });

  uuid = function () {
    const arr = [];
    arr.push(browserId.substr(0, 8));
    arr.push(browserId.substr(8, 4));
    arr.push(browserRandId);
    const microtime = (Date.now() * 1000 + new Date().getMilliseconds()).toString(16);
    arr.push(microtime.substr(0, 4));
    const restMtime = microtime.substr(5);
    const rand = cryptoRandomString({ length: 12 - restMtime.length, type: 'hex' });
    arr.push(restMtime + rand);
    return arr.join('-');
  }
}

if (jsEnv.isNode) {
  let nodeMac = cryptoRandomString({ length: 12, type: 'hex' });

  require('macaddress').one((err, mac) => {
    nodeMac = mac.toLowerCase().replace(/[^\w]/g, '');
  });

  const nodeRandId = cryptoRandomString({ length: 4, type: 'hex' });

  uuid = function () {
    const arr = [];
    arr.push(nodeMac.substr(0, 8));
    arr.push(nodeMac.substr(8, 4));
    arr.push(nodeRandId);
    const microtime = process.hrtime.bigint().toString(16);
    arr.push(microtime.substr(0, 4));
    const restMtime = microtime.substr(5);
    const rand = cryptoRandomString({ length: 12 - restMtime.length, type: 'hex' });
    arr.push(restMtime + rand);
    return arr.join('-');
  }
}


module.exports = uuid;
