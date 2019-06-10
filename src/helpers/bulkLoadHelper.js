const CONSTANTS = require('../constants/constants');
module.exports = {
  startBulkLoad: dbObject =>
    new Promise((resolve, reject) => {
      dbObject
        .command({ bulkLoad: CONSTANTS.BULKLOAD.START })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    }),
  stopBulkLoad: dbObject =>
    new Promise((resolve, reject) => {
      dbObject
        .command({ bulkLoad: CONSTANTS.BULKLOAD.STOP })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    }),
  killBulkLoad: dbObject =>
    new Promise((resolve, reject) => {
      dbObject
        .command({ bulkLoad: CONSTANTS.BULKLOAD.KILL })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    }),
  bulkLoadStatus: dbObject =>
    new Promise((resolve, reject) => {
      dbObject
        .command({ bulkLoad: CONSTANTS.BULKLOAD.STATUS })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    })
};
