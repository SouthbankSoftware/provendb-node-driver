const VersionHelper = require('../../../helpers/versionHelper');
const ProofHelper = require('../../../helpers/proofHelper');
const CONSTANTS = require('../../../constants/constants');
const PROOF_CONSTANTS = require('../../../constants/proof_constants');
const moment = require('moment');

module.exports = {
  submitProof: self =>
    /**
     * Submit a new Proof for anchoring on the blockchain.
     * @param {number} [version=Current Version] - A version number to submit a proof on. Defaults to current version.
     * @param {Array<string>} [collections='All Collections'] - A list of collections to submit the proof for. Defaulst to all collections.
     * @returns {Promise<Object>} - A promise resolving the database result or rejecting an error.
     * @alias module:Database~ProvenDB.submitProof
     **/
    (version, collections) =>
      new Promise((resolve, reject) => {
        if (version && collections) {
          // Submit proof on input version for input collections.
          ProofHelper.submitProof(self.nativeDB, parseInt(version), collections)
            .then(result => {
              resolve(result);
            })
            .catch(err => {
              reject({
                ok: 0,
                err: true,
                errMsg: err.message
              });
            });
        } else if (version && typeof version === CONSTANTS.JS_TYPES.NUMBER) {
          // Submit proof on input version for all collections.
          ProofHelper.submitProof(self.nativeDB, parseInt(version))
            .then(result => {
              resolve(result);
            })
            .catch(err => {
              reject({
                ok: 0,
                err: true,
                errMsg: err.message
              });
            });
        } else if (version && typeof version === CONSTANTS.JS_TYPES.OBJECT) {
          // Submit proof on current version and input collection list.
          VersionHelper.getVersion(self.nativeDB)
            .then(result => {
              ProofHelper.submitProof(self.nativeDB, result.version)
                .then(result => {
                  resolve(result);
                })
                .catch(err => {
                  reject({
                    ok: 0,
                    err: true,
                    errMsg: err.message
                  });
                });
            })
            .catch(err => {
              reject({
                ok: 0,
                err: true,
                errMsg: err.message
              });
            });
        } else if (!version) {
          // Empty params, get current version and submitProof.
          VersionHelper.getVersion(self.nativeDB)
            .then(result => {
              ProofHelper.submitProof(self.nativeDB, result.version)
                .then(result => {
                  resolve(result);
                })
                .catch(err => {
                  reject({
                    ok: 0,
                    err: true,
                    errMsg: err.message
                  });
                });
            })
            .catch(err => {
              reject({
                ok: 0,
                err: true,
                errMsg: err.message
              });
            });
        } else {
          // Parameter types don't match.
          reject({
            ok: 1,
            err: `First parameter in submitProof should be: empty, a version (type number) or a list of collections (type array). Actual type was ${typeof version}`
          });
        }
      }),
  getProof: self =>
    /**
     * Retrieve an existing proof from the database.
     * @param {number|string} [versionOrProofId='Current Version'] - A version number or proofId.
     * @param {string} [format='json'] - Proof format for return.
     * @param {boolean} [listCollections='false'] - List collections in the proof.
     * @returns {Promise<Object>} - A promise resolving the database result or rejecting an error.
     * @alias module:Database~ProvenDB.getProof
     **/
    (
      versionOrProofId,
      format = PROOF_CONSTANTS.FORMAT.JSON,
      listCollections = false
    ) =>
      new Promise((resolve, reject) => {
        if (
          versionOrProofId &&
          (typeof versionOrProofId === CONSTANTS.JS_TYPES.NUMBER ||
            typeof versionOrProofId === CONSTANTS.JS_TYPES.STRING)
        ) {
          // Get proof for inputted version/id
          ProofHelper.getProof(
            self.nativeDB,
            versionOrProofId,
            format,
            listCollections
          )
            .then(result => {
              resolve(result);
            })
            .catch(err => {
              reject({
                errMsg: err.message,
                err: true
              });
            });
        } else if (!versionOrProofId) {
          // Get proof for the currently selected version.
          VersionHelper.getVersion(self.nativeDB)
            .then(result => {
              ProofHelper.getProof(
                self.nativeDB,
                result.version,
                format,
                listCollections
              )
                .then(result => {
                  resolve(result);
                })
                .catch(err => {
                  reject({
                    errMsg: err.message,
                    err: true
                  });
                });
            })
            .catch(err => {
              reject({
                errMsg: err.message,
                err: true
              });
            });
        } else {
          // Parameter types don't match.
          reject({
            ok: 1,
            err: `First parameter in submitProof should be: empty or a version (type number). Actual type was: ${typeof versionOrProofId}`
          });
        }
      }),

  verifyProof: self =>
    /**
     * Verify a proof exists and is valid on the Blockchain.
     * @param {string} proofId - The ID of the proof to be verified.
     * @param {string} [format='json'] - The format to return the verified proof in.
     * @alias module:Database~ProvenDB.verifyProof
     **/
    (proofId, format = PROOF_CONSTANTS.FORMAT.JSON) =>
      new Promise((resolve, reject) => {
        if (proofId && typeof proofId === CONSTANTS.JS_TYPES.STRING) {
          ProofHelper.verifyProof(self.nativeDB, proofId, format)
            .then(verifyProofResult => {
              resolve(verifyProofResult);
            })
            .catch(verifyProofErr => {
              reject(verifyProofErr);
            });
        } else {
          reject({
            ok: 0,
            err: 'First argument must be a proofID in string format.'
          });
        }
      }),
  listProofs: self =>
    /**
     * List Proofs that exist at a given version or time.
     * @param {number|string} [dateString='Current Version'] - A version number or proofId.
     * @returns {Promise<Object>} - A promise resolving the database result or rejecting an error.
     * @alias module:Database~ProvenDB.listProofs
     **/
    dateString =>
      new Promise((resolve, reject) => {
        let versionInput = dateString;
        if (moment(dateString, 'YYYY-MM-DD', true).isValid()) {
          versionInput = new Date(dateString);
        } else {
          versionInput = parseInt(dateString);
        }
        VersionHelper.setVersion(self.nativeDB, versionInput)
          .then(result => {
            self.nativeDB
              .collection(CONSTANTS.COLLECTIONS.VERSION_PROOFS)
              .find({
                status: PROOF_CONSTANTS.STATUS.VALID,
                version: { $gte: result.version }
              })
              .project({ proof: 0 })
              .sort({ version: -1 })
              .limit(1)
              .toArray((error, result) => {
                if (error) {
                  reject({
                    errMsg: error.message,
                    err: true
                  });
                } else {
                  resolve(result);
                }
              });
          })
          .catch(err => {
            reject({
              err: true,
              errMsg: err.message
            });
          });
      }),
  getDocumentProof: self =>
    /**
     * Retrieve an existing proof from the database.
     * @param {string} collection - The collection the document belongs to.
     * @param {Object} [filter={}] - Filter for finding the document.
     * @param {version} [number=Current Version] - The version the document exists in, defaults to current.
     * @param {string} [format='json'] - The format to return the proof in, defaults to json.
     * @alias module:Database~ProvenDB.getDocumentProof
     **/
    (collection, filter = {}, version = null, format = 'json') =>
      new Promise((resolve, reject) => {
        if (!version) {
          // No Version specified, get the latest version.
          VersionHelper.getVersion(self.nativeDB)
            .then(getVersionResult => {
              ProofHelper.getDocumentProof(
                self.nativeDB,
                collection,
                filter,
                getVersionResult.version,
                format
              )
                .then(getDocProofResult => {
                  resolve(getDocProofResult);
                })
                .catch(getDocProofErr => {
                  reject(getDocProofErr);
                });
            })
            .catch(getVersionErr => {
              reject({
                ok: 0,
                err: getVersionErr,
                msg: 'Failed to get latest (default) version for documentProof.'
              });
            });
        } else {
          ProofHelper.getDocumentProof(
            self.nativeDB,
            collection,
            filter,
            version,
            format
          )
            .then(getDocProofResult => {
              resolve(getDocProofResult);
            })
            .catch(getDocProofErr => {
              reject(getDocProofErr);
            });
        }
      })
};
