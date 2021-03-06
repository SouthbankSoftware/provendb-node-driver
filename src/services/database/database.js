/*
 * provendb-node-driver
 * Copyright (C) 2019  Southbank Software Ltd.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * @Author: Michael Harrison
 * @Date:   2019-06-03T14:21:20+10:00
 * @Last modified by:   Michael Harrison
 * @Last modified time: 2020-01-03T10:50:16+11:00
 */
/**
 * The ProvenDB Database object abc: similar to the native MongoDB Database object.
 * @module Database
 */
const BulkLoadHelper = require('../../helpers/bulkLoadHelper');
const UtilHelper = require('../../helpers/utilHelper');
const Version = require('./functions/version');
const Proof = require('./functions/proofs');
const Util = require('./functions/util');

const extend = function(obj, obj2) {
  for (var i in obj) {
    obj2[i] = obj[i];
  }
};

/**
 * A ProvenDB Database object. This object wraps the existing MongoDB database object and adds aditional ProvenDB specific functionality. See {@link https://provendb.com/gettingStarted} the getting started guide for help.
 * @class
 * @param {MongoDB_Native.Database} dbObject - The MongoDB Node Driver database object. {@link https://mongodb.github.io/node-mongodb-native/3.2/api/Db.html}
 * @example
 * // Normal MongoDB connection.
 * connection = await MongoClient.connect(URL, {
 * useNewUrlParser: true
 * });
 * db = await connection.db(DATABASE);
 *
 * // ProvenDB Logic goes here...
 * pdb = new ProvenDB(db);
 * collection = pdb.collection('myCollection');
 */
function ProvenDB(dbObject) {
  if (!dbObject) {
    this.err = true;
    this.errMsg = 'ProvenDB requires a MongoDB database object as a parameter.';
  } else {
    this.err = false;
  }

  /**
   * @type {MongoDB_Native.Database}
   * @see https://mongodb.github.io/node-mongodb-native/3.2/api/Db.html
   */
  this.nativeDB = dbObject;
  extend(dbObject, this);
  const self = this;

  // Version Functions.
  /**
   * Set the ProvenDB database version.
   * @param {string|number} dateString - Either a string representing a date or a version number.
   * @returns {Promise<module:Types_Version.setVersionResponse>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.setVersion
   * @example
   *    pdb.setVersion(10).then((result) => {
   *      console.log(result);
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.setVersion = dateString => Version.setVersion(self, dateString);
  /**
   * Get the ProvenDB database version.
   * @returns {Promise<module:Types_Version.getVersionResponse>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.getVersion
   * @example
   *    pdb.getVersion().then((result) => {
   *      console.log(result);
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.getVersion = () => Version.getVersion(self);
  /**
   * Get the history of the document including each version.
   * @param {string} collection - The collection the document exists in.
   * @param {Object} filter - The filter for finding the document.
   * @param {Object} [projection={}] - Projection to apply to the result.
   * @returns {Promise<module:Types_Version.docHistoryResponse>} - A promise resolving the history array or rejecting an error.
   * @alias module:Database~ProvenDB.docHistory
   * @example
   *    pdb.docHistory('myCollection', {name: 'mike'}).then((result) => {
   *      console.log(result);
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.docHistory = (collection, filter, projection) =>
    Version.docHistory(self, collection, filter, projection);
  /**
   * Get a list of versions between an optional time range.
   * @param {ISODate} [startDate=Now - 24hrs] - The start of the date range to list versions for, defaults to 24hrs ago.
   * @param {ISODate} [endDate=Now] - The end of the date range to list versions for, defaults to now.
   * @param {number} [limit=10] - The number of versions to return, defaults to 10.
   * @param {number} [sortDirection=-1] - The sort direction, 1 for ascending and -1 for descending, defaults to -1.
   * @returns {Promise<Object>} - Object containing Database result.
   * @alias module:Database~ProvenDB.listVersions
   * @example
   *    pdb.listVersions().then((result) => {
   *      console.log(result);
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.listVersions = (startDate, endDate, limit, sortDirection) =>
    Version.listVersions(self, startDate, endDate, limit, sortDirection);

  // Proof Functions.

  /**
   * Submit a new Proof for anchoring on the blockchain.
   * @param {number} [version=Current Version] - A version number to submit a proof on. Defaults to current version.
   * @param {Array<string>} [collections='All Collections'] - A list of collections to submit the proof for. Defaulst to all collections.
   * @param {string} [type='BTC'] - The anchor type, BTC for bitcoin or ETH for ethereum.
   * @returns {Promise<module:Types_Proof.submitProofResponse>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.submitProof
   * @example
   *    pdb.submitProof(23, ['myCollectionA', 'myCollectionB']).then((result) => {
   *      console.log(result);
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.submitProof = (version, collections, type) =>
    Proof.submitProof(self, version, collections, type);
  /**
   * Retrieve an existing proof from the database.
   * @param {number|string} [versionOrProofId='Current Version'] - A version number or proofId.
   * @param {module:Proof_Constants.format} [format='json'] - Proof format for return.
   * @param {boolean} [listCollections='false'] - List collections in the proof.
   * @returns {Promise<module:Types_Proof.getProofResponse>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.getProof
   * @example
   *    pdb.getProof(23, 'json', true).then((result) => {
   *      console.log(result);
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   **/
  this.getProof = (versionOrProofId, format, listCollections) =>
    Proof.getProof(self, versionOrProofId, format, listCollections);
  /**
   * Retrieve an existing proof from the database.
   * @param {string} collection - The collection the document belongs to.
   * @param {Object} [filter={}] - Filter for finding the document.
   * @param {version} [number=Current Version] - The version the document exists in, defaults to current.
   * @param {module:Proof_Constants.format} [format='json'] - The format to return the proof in, defaults to json.
   * @returns {Promise<module:Types_Proof.Proof>} Returns the Proof along with relevant details and information.
   * @alias module:Database~ProvenDB.getDocumentProof
   * @example
   *    pdb.getDocumentProof('myCollection', {name: 'Michael'}, 15).then((result) => {
   *      console.log(result);
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   **/
  this.getDocumentProof = (collection, filter, version, format) =>
    Proof.getDocumentProof(self, collection, filter, version, format);
  /**
   * Verify a proof exists and is valid on the Blockchain.
   * @param {string} proofId - The ID of the proof to be verified.
   * @param {module:Proof_Constants.format} [format='json'] - The format to return the verified proof in.
   * @returns {Promise<module:Types_Proof.verifyProofResponse>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.verifyProof
   * @example
   *    pdb.verifyProof('81ad54f0-9c5e-11e9-a57b-011b38f41044').then((result) => {
   *      console.log(result);
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.verifyProof = (proofId, format) =>
    Proof.verifyProof(self, proofId, format);

  // Util Functions
  /**
   * Prepare a forget command for forgetting the contents of some documents without invalidating
   * proofs those documents exist in, after being prepared it can be executed with executeProof.
   * @param {string} collection - The collection to forget documents in.
   * @param {Object} filter - Filter for which documents to forget.
   * @param {number} [minVersion] - Optional min version for the version range. (Must be used with maxVersion)
   * @param {number} [maxVersion] - Optional max version for the version range. (Must be used with minVersion)
   * @param {boolean} [inclusiveRange=true] - If true, only forget documents taht are within the version range. Defaults to true.
   * @see module:Database~ProvenDB.executeForget
   * @returns {Promise<module:Types_Util.forgetResponse>} A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.prepareForget
   * @example
   *    pdb.prepareForget('myCollection', { name: 'Michael' }, 1, 10).then((result) => {
   *       console.log(result);
   *       const forgetId = result.forgetId;       // Needed to execute the prepared forget.
   *       const forgetPassword = result.password; // Needed to execute the prepared forget.
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.prepareForget = (
    collection,
    filter,
    minVersion,
    maxVersion,
    inclusiveRange = true
  ) =>
    Util.prepareForget(
      self,
      collection,
      filter,
      minVersion,
      maxVersion,
      inclusiveRange
    );
  /**
   * Execute a prepared forget statement.
   * @param {number} forgetId - The ID of the forget statmement, returned after running a prepareForget.
   * @param {string} password - A password generated by the forget, used to make sure the wrong forget is not executed by mistake.
   * @see module:Database~ProvenDB.prepareForget
   * @returns {Promise<module:Types_Util.forgetResponse>} - A promise resolving the output of the forget statement or rejecting an error.
   * @alias module:Database~ProvenDB.executeForget
   * @example
   *    // Use stored forget ID and password from prepare statement.
   *    pdb.executeForget(forgetId, forgetPassword }, 1, 10).then((result) => {
   *       console.log(result);
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.executeForget = (forgetId, password) =>
    Util.executeForget(self, forgetId, password);
  /**
   * Compact data between two proven database versions to reduce storage consumption.
   * @param {number} startVersion - The first version to compact from, must be proven.
   * @param {number} endVersion - The last version to compact to, must be proven.
   * @returns {Promise<module:Types_Util.compactResponse>} - A promise resolving the database command or rejecting an error.
   * @alias module:Database~ProvenDB.compactVersions
   * @example
   *    pdb.compactVersions(3, 5).then((result) => {
   *       console.log(result);
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.compactVersions = (startVersion, endVersion) =>
    Util.compactVersions(self, startVersion, endVersion);

  /**
   * Hide ProvenDB metadata in find results.
   * This operation persists for the duration of the connection,
   * meaning all subsuquent calls on the same client
   * will not contain metadata.
   * @see module:Types_Metadata.Metadata
   * @returns {Promise<module:Types_Util.metadataResponse>} - Promise resolving the result, or rejecting the error.
   * @example
   *    pdb.hideMetadata().then(() => {
   *       collection.findOne({}).then(res => {
   *         console.log(res); // Will not contain ProvenDB Metadata in result.
   *       })
   *       .catch(err => {
   *          console.error(err);
   *       })
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.hideMetadata = () => UtilHelper.hideMetadata(self.nativeDB);
  /**
   * Show ProvenDB metadata in find results.
   * This operation persists for the duration of the connection,
   * meaning all subsuquent calls on the same client
   * will contain metadata.
   * @see module:Types_Metadata.Metadata
   * @returns {Promise<module:Types_Util.metadataResponse>} - Promise resolving the result, or rejecting the error.
   * @example
   *    pdb.showMetadata().then(() => {
   *       collection.findOne({}).then(res => {
   *         console.log(res); // Will contain ProvenDB Metadata in result.
   *       })
   *       .catch(err => {
   *          console.error(err);
   *       })
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.showMetadata = () => UtilHelper.showMetadata(self.nativeDB);
  /**
   * Return a list of ProvenDB specific commands.
   * @returns {Promise<Object>} - A promise resolving the database result (a list of commands) or rejecting an error.
   * @alias module:Database~ProvenDB.listProvenDBCommands
   * @example
   *    pdb.listProvenDBCommands().then((result) => {
   *       console.log(result.commands); // An array of avaliable commands.
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.listProvenDBCommands = () =>
    UtilHelper.listProvenDBCommands(self.nativeDB);
  /**
   * Return a list collections and their storage usage.
   * @returns {Promise<module:Types_Util.listStorageResponse>} - A promise resolving the database result (a list of collections) or rejecting an error.
   * @alias module:Database~ProvenDB.listStorage
   * @example
   *    pdb.listStorage().then((result) => {
   *       console.log(result.storageList); // An array of collections and storage use.
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.listStorage = () => UtilHelper.listStorage(self.nativeDB);
  /**
   * WARNING: This operation should not be executed unless you are sure you want a rollback. This will rollback any half complete operations to the previous version.
   * @returns {Promise<module:Types_Util.rollbackResponse>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.rollback
   * @example
   *    pdb.rollback().then((result) => {
   *       console.log(result);
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.rollback = () => UtilHelper.rollback(self.nativeDB);
  /**
   * Start a bulkLoad.
   * @returns {Promise<module:Types_Util.bulkLoadResponse>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.bulkLoadStart
   * @example
   *    pdb.bulkLoadStart().then((result) => {
   *       console.log(result);
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.bulkLoadStart = () => BulkLoadHelper.bulkLoadStart(self.nativeDB);
  /**
   * Stop a bulkLoad.
   * @returns {Promise<module:Types_Util.bulkLoadResponse>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.bulkLoadStop
   * @example
   *    pdb.bulkLoadStop().then((result) => {
   *       console.log(result);
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.bulkLoadStop = () => BulkLoadHelper.bulkLoadStop(self.nativeDB);
  /**
   * WARNIGN: This operation may interrupt another users bulk load in progress. Forcefully stop a bulkLoad, even if you were not the original starter of the bulkLoad.
   * @returns {Promise<module:Types_Util.bulkLoadResponse>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.bulkLoadKill
   * @example
   *    pdb.bulkLoadKill().then((result) => {
   *       console.log(result);
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.bulkLoadKill = () => BulkLoadHelper.bulkLoadKill(self.nativeDB);
  /**
   * Get the bulk load status.
   * @returns {Promise<module:Types_Util.bulkLoadResponse>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.bulkLoadStatus
   * @example
   *    pdb.bulkLoadStatus().then((result) => {
   *       console.log(result.status); // "on" or "off"
   *    }).catch((err) => {
   *      console.error(err);
   *    })
   */
  this.bulkLoadStatus = () => BulkLoadHelper.bulkLoadStatus(self.nativeDB);

  return this;
}

module.exports = ProvenDB;
