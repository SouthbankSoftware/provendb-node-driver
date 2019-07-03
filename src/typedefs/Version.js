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
 * @Date:   2019-07-02T12:56:43+10:00
 * @Last modified by:   Michael Harrison
 * @Last modified time: 2019-07-02T13:17:23+10:00
 */

/**
 * @module Types_Version
 * @param {module:Version_Constants} Version_Constants - Enumerations and Constants used in the Version Type.
 */

/**
 * Response from setVersion command.
 * @typedef module:Types_Version.setVersionResponse
 * @property {number} ok - Did command execute without error (1 | 0)
 * @property {string} response - The response message.
 * @property {number} version - The version that has been set.
 * @property {string} status - Either userDefined or current.
 * @example
 * {
 *  "ok": 1,
 *  "response": "The version has been set to '3'",
 *  "version": NumberLong(3),
 *  "status": "userDefined"
 * }
 * @type {object}
 */

/**
 * Response from getVersion command.
 * @typedef module:Types_Version.getVersionResponse
 * @property {number} ok - Did command execute without error (1 | 0)
 * @property {string} response - The response message.
 * @property {number} version - The version that is currently set.
 * @property {string} status - Either userDefined or current.
 * @example
 * {
 *  "ok": 1,
 *  "response": "The version is set to 'current'",
 *  "version": NumberLong(77),
 *  "status": "current"
 * }
 * @type {object}
 */

/**
 * Response from docHistory command.
 * @typedef module:Types_Version.docHistoryResponse
 * @property {number} ok - Did command execute without error (1 | 0)
 * @property {Array<DocumentHistory>} docHistory - The documents history
 * @property {number} version - The version that is currently set.
 * @property {string} status - Either userDefined or current.
 * @example
 * {
 *  "ok": 1,
 *  "response": "The version is set to 'current'",
 *  "version": NumberLong(77),
 *  "status": "current"
 * }
 * @type {object}
 */

/**
 * DocHistory object.
 * @typedef module:Types_Version.docHistoryResponse
 * @property {string} collection - The collection the document exists in.
 * @property {ObjectID} _id - The ID for the document (persists across different versions.)
 * @property {Array<Object>} history.versions - An array of documents with history.
 * @example
 * {
 *  "ok": 1,
 *  "docHistory": [
 *    {
 *      "collection": "staff",
 *      "_id": "_id" : ObjectId("5d1aa2204d13d779b05813e6"),
 *      "history": {
 *        "versions": [
 *          {
 *            "minVersion": NumberLong(71),
 *            "maxVersion": NumberLong(76),
 *            "status": "Unproven",
 *            "started": "2019-07-02 12:15:29",
 *            "ended": "2019-07-02 12:15:29"
 *            "document": {
 *              "name": "Michael",
 *              "role": "Code Monkey"
 *            }
 *          },
 *  *          {
 *            "minVersion": NumberLong(77),
 *            "maxVersion": NumberLong(9223372036854775807),
 *            "status": "Valid",
 *            "started": "2019-07-02 12:30:47",
 *            "ended": "2019-07-02 12:30:47"
 *            "document": {
 *              "name": "Michael",
 *              "role": "Chief Code Monkey"
 *            }
 *          }
 *        ]
 *      }
 *    }
 *  ]
 * }
 * @type {object}
 */
