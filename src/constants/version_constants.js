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
 * @Date:   2019-06-07T13:45:29+10:00
 * @Last modified by:   Michael Harrison
 * @Last modified time: 2019-07-02T13:01:55+10:00
 */
/**
 * Version Constants.
 * @module Version_Constants
 */
module.exports = {
  /**
   * Version Status
   * @readonly
   * @enum {string}
   */
  STATUS: {
    STARTED: 'started',
    VALID: 'valid',
    ENDED: 'ended',
    PURGED: 'purged'
  },
  /**
   * Version Type.
   * @readonly
   * @enum {string}
   */
  TYPE: {
    USER_DEFINED: 'userDefined',
    CURRENT: 'current'
  }
};
