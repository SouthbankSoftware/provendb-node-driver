module.exports = {
  submitProof: (dbObject, versionNumber, collections) =>
    new Promise((resolve, reject) => {
      let params = {
        submitProof: versionNumber
      };
      if (collections) {
        params.collections = collections;
      }
      dbObject.command(params, (setVersionErr, setVersionRes) => {
        if (setVersionErr) {
          reject(setVersionErr);
        } else {
          resolve(setVersionRes);
        }
      });
    }),
  getProof: (dbObject, versionOrProofId, format, listCollections) =>
    new Promise((resolve, reject) => {
      let params = { getProof: versionOrProofId };
      if (format) {
        params.format = format;
      }
      if (listCollections) {
        params.listCollections = listCollections;
      }
      dbObject.command(params, (setVersionErr, setVersionRes) => {
        if (setVersionErr) {
          reject(setVersionErr);
        } else {
          resolve(setVersionRes);
        }
      });
    }),
  getDocumentProof: (dbObject, collection, filter, version, format) =>
    new Promise((resolve, reject) => {
      dbObject.command(
        { getDocumentProof: { collection, filter, version, format } },
        (setVersionErr, setVersionRes) => {
          if (setVersionErr) {
            reject(setVersionErr);
          } else {
            resolve(setVersionRes);
          }
        }
      );
    }),
  verifyProof: (dbObject, proofId, format) =>
    new Promise((resolve, reject) => {
      dbObject.command(
        { verifyProof: proofId, format },
        (verifyProofErr, verifyProofRes) => {
          if (verifyProofErr) {
            reject(verifyProofErr);
          } else {
            resolve(verifyProofRes);
          }
        }
      );
    })
};
