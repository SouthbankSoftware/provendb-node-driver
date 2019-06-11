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
 * @Date:   2019-06-07T15:28:59+10:00
 * @Last modified by:   Michael Harrison
 * @Last modified time: 2019-06-11T16:44:30+10:00
 */
const _ = require('lodash');
const CONSTANTS = require('../../../constants/constants');
const UtilHelper = require('../../../helpers/utilHelper');
module.exports = {
  prepareForget: self =>
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
    (collection, filter, minVersion, maxVersion, inclusiveRange = true) =>
      new Promise((resolve, reject) => {
        if ((minVersion && !maxVersion) || (maxVersion && !minVersion)) {
          reject(
            new Error(
              'When preparing a forget with either minVersion or maxVersion, both must be non-null.'
            )
          );
        } else if (
          minVersion &&
          maxVersion &&
          (typeof minVersion != CONSTANTS.JS_TYPES.NUMBER ||
            typeof maxVersion !== CONSTANTS.JS_TYPES.NUMBER)
        ) {
          reject(
            new Error('minVersion and maxVersion must both be of type NUMBER')
          );
        } else {
          UtilHelper.prepareForget(
            self.nativeDB,
            _.pickBy(
              { collection, filter, minVersion, maxVersion, inclusiveRange },
              x => {
                return x;
              }
            )
          )
            .then(prepForgetResult => {
              resolve(prepForgetResult);
            })
            .catch(prepForgetErr => {
              reject(prepForgetErr);
            });
        }
      }),
  executeForget: self =>
    /**
     * Execute a prepared forget statement.
     * @param {number} forgetId - The ID of the forget statmement, returned after running a prepareForget.
     * @param {string} password - A password generated by the forget, used to make sure the wrong forget is not executed by mistake.
     * @returns {Promise<Object>} - A promise resolving the output of the forget statement or rejecting an error.
     * @see module:Database~ProvenDB.executeForget
     */
    (forgetId, password) =>
      new Promise((resolve, reject) => {
        if (!forgetId || !password) {
          reject(
            new Error(
              'Both forgetID and password must be provided to executeForget'
            )
          );
        }
        UtilHelper.executeForget(self.nativeDB, forgetId, password)
          .then(execForgetResult => {
            resolve(execForgetResult);
          })
          .catch(execForgetErr => {
            reject(execForgetErr);
          });
      }),
  compactVersions: self =>
    /**
     * Compact data between two proven database versions to reduce storage consumption.
     * @param {number} startVersion - The first version to compact from, must be proven.
     * @param {number} endVersion - The last version to compact to, must be proven.
     * @returns {Promise<Object>} - A promise resolving the database command or rejecting an error.
     */
    (startVersion, endVersion) =>
      new Promise((resolve, reject) => {
        if (!startVersion || !endVersion) {
          reject(
            new Error(
              'Both start version and end version are mandatory for compact.'
            )
          );
        } else if (
          typeof startVersion !== CONSTANTS.JS_TYPES.NUMBER ||
          typeof endVersion !== CONSTANTS.JS_TYPES.NUMBER
        ) {
          reject(
            new Error(
              'Both startVersion and endVersion must be of type number.'
            )
          );
        } else {
          UtilHelper.compactVersions(self.nativeDB, startVersion, endVersion)
            .then(compactRes => {
              resolve(compactRes);
            })
            .catch(compactErr => {
              reject(compactErr);
            });
        }
      })
};
