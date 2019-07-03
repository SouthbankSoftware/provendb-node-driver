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
 * @Date:   2019-07-02T13:45:03+10:00
 * @Last modified by:   Michael Harrison
 * @Last modified time: 2019-07-02T14:01:10+10:00
 */

/**
 * @module Types_Util
 * @param {module:Constants} Constants - Enumerations and Constants.
 */

/**
 * Response from forget commands.
 * @typedef module:Types_Util.forgetResponse
 * @property {number} ok - Did command execute without error (1 | 0)
 * @property {NumberLong} forgetId - ID for the forget.
 * @property {string} password - Password used to confirm a forget.
 * @property {Object} forgetSummary - Summary of the forget.
 * @example
 * {
 *  "ok": 1,
 *  "forgetId": NumberLong(6),
 *  "password": "ef230d48-7de7-45f2-8aaf-3fa626f19d15"
 *  "forgetSummary": {
 *    "documentsToBeForgotten": NumberLong(1),
 *    "uniqueDocuments": NumberLong(1)
 *  }
 * }
 * @type {object}
 */

/**
 * Response from compact commands.
 * @typedef module:Types_Util.compactResponse
 * @property {number} ok - Did command execute without error (1 | 0)
 * @property {NumberLong} proofsDeleted - How many proofs were compacted.
 * @property {NumberLong} versionsDeleted - How many versions were compacted.
 * @property {Object} documentsDeleted - Summary of the compact.
 * @example
 * {
 *  "ok": 1,
 *  "forgetId": NumberLong(6),
 *  "password": "ef230d48-7de7-45f2-8aaf-3fa626f19d15"
 *  "forgetSummary": {
 *    "documentsToBeForgotten": NumberLong(1),
 *    "uniqueDocuments": NumberLong(1)
 *  }
 * }
 * @type {object}
 */

/**
 * Response from metadata commands.
 * @typedef module:Types_Util.metadataResponse
 * @property {number} ok - Did command execute without error (1 | 0)
 * @example
 * {
 *  "ok": 1,
 * }
 * @type {object}
 */

/**
 * Response from listStorage commands.
 * @typedef module:Types_Util.listStorageResponse
 * @property {number} ok - Did command execute without error (1 | 0)
 * @property {Array<Object>} storageList - Array of storage usage.
 * @example
 * {
 *  "ok": 1,
 *   "storageList": [
 *     {
 *       "staff": NumberLong(3334123)
 *     },
 *     {
 *       "offices": NumberLong(3334123)
 *     }
 *   ]
 * }
 * @type {object}
 */

/**
 * Response from rollback commands.
 * @typedef module:Types_Util.rollbackResponse
 * @property {number} ok - Did command execute without error (1 | 0)
 * @property {Array<Object>} version - Array of databases rolled back.
 * @example
 * {
 *  "ok": 1,
 *   "version": [
 *     {
 *       "staff": NumberLong(5)
 *     },
 *   ]
 * }
 * @type {object}
 */

/**
 * Response from bulkLoad commands.
 * @typedef module:Types_Util.bulkLoadResponse
 * @property {number} ok - Did command execute without error (1 | 0)
 * @property {string} [status] - Bulkload status or null.
 * @example
 * {
 *  "ok": 1,
 *   "status": "on"
 * }
 * @type {object}
 */
