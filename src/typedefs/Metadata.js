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
 * @Date:   2019-07-03T09:13:45+10:00
 * @Last modified by:   Michael Harrison
 * @Last modified time: 2019-07-03T09:18:31+10:00
 */

/**
 * @module Types_Metadata
 * @param {module:Constants} Constants - Enumerations and Constants.
 */

/**
 * Metadata that is appended to each document.
 * @typedef module:Types_Metadata.Metadata
 * @property {string} hash - Hash value for the document. The hash includes metadata attributes but (of course) not the hash itself
 * @property {NumberLong} minVersion - The database version in which this version of the document first became visible
 * @property {NumberLong} maxVersion - The database version in which this version of the document last became visible
 * @property {string | null} forgotten - If true, the contents of this document have been forgotten
 * @property {ObjectId} _id - The "ProvenDB" _id - this is the same for all versions of a document
 * @property {ObjectId} mongoId - The actual MongoDB "_id" of the document. Unlike the provenDB _id , this value changes every time a document is updated.
 * @example
 * "_provendb_metadata": {
 *    "_id": ObjectId("5d1bdf3df945589f847ee9e3"),
 *    "_mongoId": ObjectId("5d1bdf3df945589f847ee9e3"),
 *    "minVersion": NumberLong("3"),
 *    "hash": "fbda2cf3966298f3e52aac233d7be22dc9f69edc7c6383d3d8466818e4696f49",
 *    "maxVersion": NumberLong("9223372036854775807")
 * }
 * @type {object}
 */
