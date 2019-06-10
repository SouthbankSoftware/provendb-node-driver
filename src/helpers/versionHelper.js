module.exports = {
  setVersion: (dbObject, date) =>
    new Promise((resolve, reject) => {
      dbObject.command({ setVersion: date }, (setVersionErr, setVersionRes) => {
        if (setVersionErr) {
          reject(setVersionErr);
        } else {
          resolve(setVersionRes);
        }
      });
    }),
  getVersion: dbObject =>
    new Promise((resolve, reject) => {
      dbObject.command({ getVersion: 1 }, (getVersionErr, getVersionRes) => {
        if (getVersionErr) {
          reject(getVersionErr);
        } else {
          resolve(getVersionRes);
        }
      });
    }),
  listVersions: (dbObject, params) =>
    new Promise((resolve, reject) => {
      dbObject.command(
        { listVersions: params },
        (listVersionsErr, listVersionsRes) => {
          if (listVersionsErr) {
            reject(listVersionsErr);
          } else {
            resolve(listVersionsRes);
          }
        }
      );
    }),
  docHistory: (dbObject, collection, filter, projection) =>
    new Promise((resolve, reject) => {
      dbObject.command(
        {
          docHistory: {
            collection,
            filter,
            projection
          }
        },
        (docHistoryErr, docHistoryRes) => {
          if (docHistoryErr) {
            reject(docHistoryErr);
          } else {
            resolve(docHistoryRes);
          }
        }
      );
    })
};
