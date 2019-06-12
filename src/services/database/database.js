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
 * @Last modified time: 2019-06-12T16:41:14+10:00
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
 * @param {Object} params - Optional parameters.
 */
function ProvenDB(dbObject, params) {
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
  this.setVersion = Version.setVersion(self);
  this.getVersion = Version.getVersion(self);
  this.docHistory = Version.docHistory(self);
  this.listVersions = Version.listVersions(self);

  // Proof Functions.
  this.submitProof = Proof.submitProof(self);
  this.getProof = Proof.getProof(self);
  this.getDocumentProof = Proof.getDocumentProof(self);
  this.verifyProof = Proof.verifyProof(self);

  // Util Functions
  this.prepareForget = Util.prepareForget(self);
  this.executeForget = Util.executeForget(self);
  this.compactVersions = Util.compactVersions(self);
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
