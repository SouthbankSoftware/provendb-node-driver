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
 * @Date:   2019-06-07T10:04:09+10:00
 * @Last modified by:   Michael Harrison
 * @Last modified time: 2019-06-11T16:44:12+10:00
 */
module.exports = {
  listProvenDBCommands: dbObject =>
    new Promise((resolve, reject) => {
      dbObject.command(
        { listProvenDBCommands: 1 },
        (listCommandsErr, listCommandsRes) => {
          if (listCommandsErr) {
            reject(listCommandsErr);
          } else {
            resolve(listCommandsRes);
          }
        }
      );
    }),
  listStorage: dbObject =>
    new Promise((resolve, reject) => {
      dbObject.command({ listStorage: 1 }, (listStorageErr, listStorageRes) => {
        if (listStorageErr) {
          reject(listStorageErr);
        } else {
          resolve(listStorageRes);
        }
      });
    }),
  hideMetadata: dbObject =>
    new Promise((resolve, reject) => {
      dbObject.command({ showMetadata: false }, (hideMDErr, result) => {
        if (hideMDErr || !result || result.ok !== 1) {
          reject({
            hideMDErr,
            errMsg: hideMDErr.message
          });
        } else {
          resolve({
            result,
            err: false
          });
        }
      });
    }),
  showMetadata: dbObject =>
    new Promise((resolve, reject) => {
      dbObject.command({ showMetadata: true }, (showMDErr, result) => {
        if (showMDErr || !result || result.ok !== 1) {
          reject({
            showMDErr,
            errMsg: showMDErr.message
          });
        } else {
          resolve({
            result,
            err: false
          });
        }
      });
    }),
  prepareForget: (dbObject, params) =>
    new Promise((resolve, reject) => {
      dbObject.command(
        {
          forget: {
            prepare: params
          }
        },
        (forgetErr, forgetResult) => {
          if (forgetErr) {
            reject(forgetErr);
          } else {
            resolve(forgetResult);
          }
        }
      );
    }),
  executeForget: (dbObject, forgetId, password) =>
    new Promise((resolve, reject) => {
      dbObject.command(
        {
          forget: {
            execute: {
              forgetId,
              password
            }
          }
        },
        (forgetErr, forgetResult) => {
          if (forgetErr) {
            reject(forgetErr);
          } else {
            resolve(forgetResult);
          }
        }
      );
    }),
  compactVersions: (dbObject, startVersion, endVersion) =>
    new Promise((resolve, reject) => {
      dbObject.command(
        {
          compact: {
            startVersion,
            endVersion
          }
        },
        (compactErr, compactRes) => {
          if (compactErr) {
            reject(compactErr);
          } else {
            resolve(compactRes);
          }
        }
      );
    }),
  rollback: dbObject =>
    new Promise((resolve, reject) => {
      dbObject.command({ rollback: 1 }, (rollbackErr, rollbackRes) => {
        if (rollbackErr) {
          reject(rollbackErr);
        } else {
          resolve(rollbackRes);
        }
      });
    })
};
