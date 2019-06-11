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
 * @Date:   2019-06-05T17:24:09+10:00
 * @Last modified by:   Michael Harrison
 * @Last modified time: 2019-06-11T16:44:38+10:00
 */
const moment = require('moment');
const _ = require('lodash');
const CONSTANTS = require('../../../constants/constants');
const VersionHelper = require('../../../helpers/versionHelper');
module.exports = {
  setVersion: self =>
    /**
     * Set the ProvenDB database version.
     * @param {string|number} dateString - Either a string representing a date or a version number.
     * @returns {Promise<Object>} - A promise resolving the database result or rejecting an error.
     * @alias module:Database~ProvenDB.setVersion
     */
    dateString =>
      new Promise((resolve, reject) => {
        let versionInput = dateString;
        if (moment(dateString, 'YYYY-MM-DD', true).isValid()) {
          versionInput = new Date(dateString);
        } else if (
          typeof dateString === CONSTANTS.JS_TYPES.STRING &&
          dateString.toLowerCase() === CONSTANTS.VERSION.CURRENT
        ) {
          versionInput = CONSTANTS.VERSION.CURRENT;
        } else {
          versionInput = parseInt(dateString);
        }
        VersionHelper.setVersion(self.nativeDB, versionInput)
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject({
              errMsg: err.message,
              err: true,
              ok: 0
            });
          });
      }),
  getVersion: self =>
    /**
     * Get the ProvenDB database version.
     * @returns {Promise<Object>} - A promise resolving the database result or rejecting an error.
     * @alias module:Database~ProvenDB.getVersion
     */
    () =>
      new Promise((resolve, reject) => {
        VersionHelper.getVersion(self.nativeDB)
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject({
              errMsg: err.message,
              err: true,
              ok: 0
            });
          });
      }),
  listVersions: self =>
    /**
     * Get a list of versions between an optional time range.
     * @param {ISODate} [startDate=Now - 24hrs] - The start of the date range to list versions for, defaults to 24hrs ago.
     * @param {ISODate} [endDate=Now] - The end of the date range to list versions for, defaults to now.
     * @param {number} [limit=10] - The number of versions to return, defaults to 10.
     * @param {number} [sortDirection=-1] - The sort direction, 1 for ascending and -1 for descending, defaults to -1.
     * @alias module:Database~ProvenDB.listVersions
     */
    (startDate, endDate, limit, sortDirection) =>
      new Promise((resolve, reject) => {
        VersionHelper.listVersions(
          self.nativeDB,
          _.pickBy({ startDate, endDate, limit, sortDirection }, x => {
            return x;
          })
        )
          .then(listVersionsResult => {
            resolve(listVersionsResult);
          })
          .catch(listVersionsErr => {
            reject(listVersionsErr);
          });
      }),
  docHistory: self =>
    /**
     * Get the history of the document including each version.
     * @param {string} collection - The collection the document exists in.
     * @param {Object} filter - The filter for finding the document.
     * @param {Object} [projection={}] - Projection to apply to the result.
     * @returns {Promise<Object>} - A promise resolving the history array or rejecting an error.
     * @alias module:Database~ProvenDB.docHistory
     */
    (collection, filter, projection = {}) =>
      new Promise((resolve, reject) => {
        VersionHelper.docHistory(self.nativeDB, collection, filter, projection)
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject({
              errMsg: err.message,
              err: true,
              ok: 0
            });
          });
      })
};
