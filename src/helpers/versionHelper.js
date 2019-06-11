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
 * @Date:   2019-06-04T09:27:58+10:00
 * @Last modified by:   Michael Harrison
 * @Last modified time: 2019-06-11T16:44:17+10:00
 */
module.exports = {
  setVersion: (dbObject, date) =>
    new Promise((resolve, reject) => {
      dbObject.command({ setVersion: date }, (setVersionErr, setVersionRes) => {
        if (setVersionErr) {
          reject(setVersionErr);
        } else {
          resolve(setVersionRes);
        }
      });
    }),
  getVersion: dbObject =>
    new Promise((resolve, reject) => {
      dbObject.command({ getVersion: 1 }, (getVersionErr, getVersionRes) => {
        if (getVersionErr) {
          reject(getVersionErr);
        } else {
          resolve(getVersionRes);
        }
      });
    }),
  listVersions: (dbObject, params) =>
    new Promise((resolve, reject) => {
      dbObject.command(
        { listVersions: params },
        (listVersionsErr, listVersionsRes) => {
          if (listVersionsErr) {
            reject(listVersionsErr);
          } else {
            resolve(listVersionsRes);
          }
        }
      );
    }),
  docHistory: (dbObject, collection, filter, projection) =>
    new Promise((resolve, reject) => {
      dbObject.command(
        {
          docHistory: {
            collection,
            filter,
            projection
          }
        },
        (docHistoryErr, docHistoryRes) => {
          if (docHistoryErr) {
            reject(docHistoryErr);
          } else {
            resolve(docHistoryRes);
          }
        }
      );
    })
};
