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
 * @Date:   2019-06-04T15:00:53+10:00
 * @Last modified by:   Michael Harrison
 * @Last modified time: 2019-06-11T16:45:17+10:00
 */
/**
 * @module Constants
 */

module.exports = {
  JS_TYPES: {
    NUMBER: 'number',
    STRING: 'string',
    BOOLEAN: 'boolean',
    OBJECT: 'object',
    FUNCTION: 'function'
  },
  /**
   * Version Constants
   * @readonly
   * @enum {string}
   */
  VERSION: {
    CURRENT: 'current'
  },
  /**
   * BulkLoad States
   * @readonly
   * @enum {string}
   */
  BULKLOAD: {
    START: 'start',
    STOP: 'stop',
    KILL: 'kill',
    STATUS: 'status'
  },
  /**
   * Metadata Collections
   * @readonly
   * @enum {string}
   */
  COLLECTIONS: {
    COLLECTIONS: '_provendb_collections',
    CURRENT_VERSION: '_provendb_currentVersion',
    DOCUMENT_PROOFS: '_provendb_documentProofs',
    FORGET_REQUESTS: '_provendb_forgetRequests',
    INFO: '_provendb_info',
    VERSION_PROOFS: '_provendb_versionProofs',
    VERSIONS: '_provendb_versions,'
  },

  ERRORS: {
    BULK_LOAD: {
      NOT_IN_PROGRESS: 'BulkLoadNotInProgress'
    }
  }
};
