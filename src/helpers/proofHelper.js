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
 * @Date:   2019-06-04T15:17:40+10:00
 * @Last modified by:   Michael Harrison
 * @Last modified time: 2020-01-03T11:29:04+11:00
 */
module.exports = {
  submitProof: (dbObject, versionNumber, collections, type) =>
    new Promise((resolve, reject) => {
      let params = {
        submitProof: versionNumber
      };
      if (collections) {
        params.collections = collections;
      }
      if (type) {
        params.anchorType = type;
      }
      dbObject.command(params, (setVersionErr, setVersionRes) => {
        if (setVersionErr) {
          reject(setVersionErr);
        } else {
          resolve(setVersionRes);
        }
      });
    }),
  getProof: (dbObject, versionOrProofId, format, listCollections) =>
    new Promise((resolve, reject) => {
      let params = { getProof: versionOrProofId };
      if (format) {
        params.format = format;
      }
      if (listCollections) {
        params.listCollections = listCollections;
      }
      dbObject.command(params, (setVersionErr, setVersionRes) => {
        if (setVersionErr) {
          reject(setVersionErr);
        } else {
          resolve(setVersionRes);
        }
      });
    }),
  getDocumentProof: (dbObject, collection, filter, version, format) =>
    new Promise((resolve, reject) => {
      dbObject.command(
        { getDocumentProof: { collection, filter, version, format } },
        (setVersionErr, setVersionRes) => {
          if (setVersionErr) {
            reject(setVersionErr);
          } else {
            resolve(setVersionRes);
          }
        }
      );
    }),
  verifyProof: (dbObject, proofId, format) =>
    new Promise((resolve, reject) => {
      dbObject.command(
        { verifyProof: proofId, format },
        (verifyProofErr, verifyProofRes) => {
          if (verifyProofErr) {
            reject(verifyProofErr);
          } else {
            resolve(verifyProofRes);
          }
        }
      );
    })
};
