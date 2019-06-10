module.exports = {
  listProvenDBCommands: dbObject =>
    new Promise((resolve, reject) => {
      dbObject.command(
        { listProvenDBCommands: 1 },
        (listCommandsErr, listCommandsRes) => {
          if (listCommandsErr) {
            reject(listCommandsErr);
          } else {
            resolve(listCommandsRes);
          }
        }
      );
    }),
  listStorage: dbObject =>
    new Promise((resolve, reject) => {
      dbObject.command({ listStorage: 1 }, (listStorageErr, listStorageRes) => {
        if (listStorageErr) {
          reject(listStorageErr);
        } else {
          resolve(listStorageRes);
        }
      });
    }),
    hideMetadata: dbObject => new Promise((resolve, reject) => {
      dbObject.command({ showMetadata: false }, (hideMDErr, result) => {
        if (hideMDErr || !result || result.ok !== 1) {
          reject({
            hideMDErr,
            errMsg: hideMDErr.message
          });
        } else {
          resolve({
            result,
            err: false
          });
        }
      });
    }),
    showMetadata: dbObject =>
    new Promise((resolve, reject) => {
      dbObject.command({ showMetadata: true }, (showMDErr, result) => {
        if (showMDErr || !result || result.ok !== 1) {
          reject({
            showMDErr,
            errMsg: showMDErr.message
          });
        } else {
          resolve({
            result,
            err: false
          });
        }
      });
    }),
  prepareForget: (dbObject, params) =>
    new Promise((resolve, reject) => {
      dbObject.command(
        {
          forget: {
            prepare: params
          }
        },
        (forgetErr, forgetResult) => {
          if (forgetErr) {
            reject(forgetErr);
          } else {
            resolve(forgetResult);
          }
        }
      );
    }),
  executeForget: (dbObject, forgetId, password) =>
    new Promise((resolve, reject) => {
      dbObject.command(
        {
          forget: {
            execute: {
              forgetId,
              password
            }
          }
        },
        (forgetErr, forgetResult) => {
          if (forgetErr) {
            reject(forgetErr);
          } else {
            resolve(forgetResult);
          }
        }
      );
    }),
  compactVersions: (dbObject, startVersion, endVersion) =>
    new Promise((resolve, reject) => {
      dbObject.command(
        {
          compact: {
            startVersion,
            endVersion
          }
        },
        (compactErr, compactRes) => {
          if (compactErr) {
            reject(compactErr);
          } else {
            resolve(compactRes);
          }
        }
      );
    }),
  rollback: dbObject =>
    new Promise((resolve, reject) => {
      dbObject.command({ rollback: 1 }, (rollbackErr, rollbackRes) => {
        if (rollbackErr) {
          reject(rollbackErr);
        } else {
          resolve(rollbackRes);
        }
      });
    })
};
