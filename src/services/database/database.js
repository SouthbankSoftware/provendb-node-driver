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
 * @Last modified time: 2019-07-02T11:00:11+10:00
 */
/**
 * The ProvenDB Database object: similar to the native MongoDB Database object.
 * @module Database
 */
const BulkLoadHelper = require('../../helpers/bulkLoadHelper');
const UtilHelper = require('../../helpers/utilHelper');
const Version = require('./functions/version');
const Proof = require('./functions/proofs');
const Util = require('./functions/util');

/**
 * A ProvenDB Database object. This object wraps the existing MongoDB database object and adds aditional ProvenDB specific functionality. See {@link https://provendb.com/gettingStarted|the getting started guide}.
 * @class
 * @param {module:MongoDB_Native.Database} dbObject - The MongoDB Node Driver database object.
 */
function ProvenDB(dbObject) {
  if (!dbObject) {
    this.err = true;
    this.errMsg = 'ProvenDB requires a MongoDB database object as a parameter.';
  } else {
    this.err = false;
  }

  Object.prototype.extend = function(obj) {
    for (var i in obj) {
      this[i] = obj[i];
    }
  };

  /**
   * @type {module:MongoDB_Native.Database}
   */
  this.nativeDB = dbObject;
  const self = this;
  this.extend(dbObject);

  // Version Functions.
  /**
   * Set the ProvenDB database version.
   * @param {string|number} dateString - Either a string representing a date or a version number.
   * @returns {Promise<Object>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.setVersion
   */
  this.setVersion = dateString => Version.setVersion(self, dateString);
  /**
   * Get the ProvenDB database version.
   * @returns {Promise<Object>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.getVersion
   */
  this.getVersion = () => Version.getVersion(self);
  /**
   * Get the history of the document including each version.
   * @param {string} collection - The collection the document exists in.
   * @param {Object} filter - The filter for finding the document.
   * @param {Object} [projection={}] - Projection to apply to the result.
   * @returns {Promise<Object>} - A promise resolving the history array or rejecting an error.
   * @alias module:Database~ProvenDB.docHistory
   */
  this.docHistory = (collection, filter, projection) =>
    Version.docHistory(self, collection, filter, projection);
  /**
   * Get a list of versions between an optional time range.
   * @param {ISODate} [startDate=Now - 24hrs] - The start of the date range to list versions for, defaults to 24hrs ago.
   * @param {ISODate} [endDate=Now] - The end of the date range to list versions for, defaults to now.
   * @param {number} [limit=10] - The number of versions to return, defaults to 10.
   * @param {number} [sortDirection=-1] - The sort direction, 1 for ascending and -1 for descending, defaults to -1.
   * @alias module:Database~ProvenDB.listVersions
   */
  this.listVersions = (startDate, endDate, limit, sortDirection) =>
    Version.listVersions(self, startDate, endDate, limit, sortDirection);

  // Proof Functions.

  /**
   * Submit a new Proof for anchoring on the blockchain.
   * @param {number} [version=Current Version] - A version number to submit a proof on. Defaults to current version.
   * @param {Array<string>} [collections='All Collections'] - A list of collections to submit the proof for. Defaulst to all collections.
   * @returns {Promise<Object>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.submitProof
   **/
  this.submitProof = (version, collections) =>
    Proof.submitProof(self, version, collections);
  /**
   * Retrieve an existing proof from the database.
   * @param {number|string} [versionOrProofId='Current Version'] - A version number or proofId.
   * @param {module:Proof_Constants.format} [format='json'] - Proof format for return.
   * @param {boolean} [listCollections='false'] - List collections in the proof.
   * @returns {Promise<Object>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.getProof
   **/
  this.getProof = (versionOrProofId, format, listCollections) =>
    Proof.getProof(self, versionOrProofId, format, listCollections);
  this.getDocumentProof = Proof.getDocumentProof(self);
  /**
   * Verify a proof exists and is valid on the Blockchain.
   * @param {string} proofId - The ID of the proof to be verified.
   * @param {module:Proof_Constants.format} [format='json'] - The format to return the verified proof in.
   **/
  this.verifyProof = (proofId, format) =>
    Proof.verifyProof(self, proofId, format);

  // Util Functions
  /**
   * Prepare a forget command for forgetting the contents of some documents without invalidating
   * proofs those documents exist in, after being prepared it can be executed with executeProof.
   *
   * @param {string} collection - The collection to forget documents in.
   * @param {Object} filter - Filter for which documents to forget.
   * @param {number} [minVersion] - Optional min version for the version range. (Must be used with maxVersion)
   * @param {number} [maxVersion] - Optional max version for the version range. (Must be used with minVersion)
   * @param {boolean} [inclusiveRange=true] - If true, only forget documents taht are within the version range. Defaults to true.
   * @see module:Database~ProvenDB.executeForget
   * @returns {Promise<Object>} A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.prepareForget
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
   * @returns {Promise<Object>} - A promise resolving the output of the forget statement or rejecting an error.
   * @alias module:Database~ProvenDB.executeForget
   */
  this.executeForget = (forgetId, password) =>
    Util.executeForget(self, forgetId, password);
  /**
   * Compact data between two proven database versions to reduce storage consumption.
   * @param {number} startVersion - The first version to compact from, must be proven.
   * @param {number} endVersion - The last version to compact to, must be proven.
   * @returns {Promise<Object>} - A promise resolving the database command or rejecting an error.
   * @alias module:Database~ProvenDB.compactVersions
   */
  this.compactVersions = (startVersion, endVersion) =>
    Util.compactVersions(self, startVersion, endVersion);

  /**
   * Hide ProvenDB metadata in find results.
   * @returns {Promise<Object>} - Promise resolving the result, or rejecting the error.
   */
  this.hideMetadata = () => UtilHelper.hideMetadata(self.nativeDB);
  /**
   * Show ProvenDB metadata in find results.
   * @function
   * @returns {Promise<Object>} - Promise resolving the result, or rejecting the error.
   */
  this.showMetadata = () => UtilHelper.showMetadata(self.nativeDB);
  /**
   * Return a list of ProvenDB specific commands.
   * @returns {Promise<Object>} - A promise resolving the database result (a list of commands) or rejecting an error.
   * @alias module:Database~ProvenDB.listProvenDBCommands
   */
  this.listProvenDBCommands = () =>
    UtilHelper.listProvenDBCommands(self.nativeDB);
  /**
   * Return a list collections and their storage usage.
   * @returns {Promise<Object>} - A promise resolving the database result (a list of collections) or rejecting an error.
   * @alias module:Database~ProvenDB.listStorage
   */
  this.listStorage = () => UtilHelper.listStorage(self.nativeDB);
  /**
   * WARNING: This operation should not be executed unless you are sure you want a rollback. This will rollback any half complete operations to the previous version.
   * @returns {Promise<Object>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.rollback
   */
  this.rollback = () => UtilHelper.rollback(self.nativeDB);
  /**
   * Start a bulkLoad.
   * @returns {Promise<Object>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.startBulkLoad
   */
  this.startBulkLoad = () => BulkLoadHelper.startBulkLoad(self.nativeDB);
  /**
   * Stop a bulkLoad.
   * @returns {Promise<Object>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.stopBulkLoad
   */
  this.stopBulkLoad = () => BulkLoadHelper.stopBulkLoad(self.nativeDB);
  /**
   * WARNIGN: This operation may interrupt another users bulk load in progress. Forcefully stop a bulkLoad, even if you were not the original starter of the bulkLoad.
   * @returns {Promise<Object>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.killBulkLoad
   */
  this.killBulkLoad = () => BulkLoadHelper.killBulkLoad(self.nativeDB);
  /**
   * Get the bulk load status.
   * @returns {Promise<Object>} - A promise resolving the database result or rejecting an error.
   * @alias module:Database~ProvenDB.bulkLoadStatus
   */
  this.bulkLoadStatus = () => BulkLoadHelper.bulkLoadStatus(self.nativeDB);

  return this;
}

module.exports = ProvenDB;
