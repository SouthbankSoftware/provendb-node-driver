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
 * @Date:   2019-06-04T16:42:12+10:00
 * @Last modified by:   Michael Harrison
 * @Last modified time: 2019-06-11T16:44:01+10:00
 */
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
