/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function(/* env */) {
  return {
    clientAllowedKeys: [],
    fastbootAllowedKeys: ['AWS_ACCESS_KEY_ID','AWS_SECRET_ACCESS_KEY'],
    failOnMissingKey: false,
    path: path.join(path.dirname(__dirname), '.env')
  }
};
