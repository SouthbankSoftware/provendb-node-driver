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
 * @Date:   2019-06-05T17:16:16+10:00
 * @Last modified by:   Michael Harrison
 * @Last modified time: 2019-06-11T16:43:47+10:00
 */
/**
 * Proof
 * @module Proof_Constants
 */
module.exports = {
  /**
   * Proof Status
   * @readonly
   * @enum {string}
   */
  STATUS: {
    PENDING: 'pending',
    VALID: 'valid',
    INVALID: 'invalid',
    SUBMITTED: 'submitted',
    FAILED: 'failed',
    PURGED: 'purged'
  },
  /**
   * Proof Format
   * @readonly
   * @enum {string}
   */
  FORMAT: {
    BINARY: 'binary',
    JSON: 'json'
  },
  /**
   * Proof Type
   * @readonly
   * @enum {string}
   */
  TYPE: {
    FULL: 'full',
    COLLECTION: 'collection'
  }
};
