'use strict';

// Constants: For helping.
const Constants = require('./src/constants');
// Core Database Module
const Database = require('./src/services/database/database');

module.exports = {
  Database: Database,
  Constants: Constants
};
