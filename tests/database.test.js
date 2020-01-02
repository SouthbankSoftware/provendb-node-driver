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
 * @Date:   2019-06-03T15:03:20+10:00
 * @Last modified by:   Michael Harrison
 * @Last modified time: 2020-01-03T10:55:47+11:00
 */
const ProvenDB = require('../index.js').Database;
const CONSTANTS = require('../index.js').Constants.General;
const PROOF_CONSTANTS = require('../index.js').Constants.Proof;
const VERSION_CONSTANTS = require('../index.js').Constants.Version;
const { MongoClient } = require('mongodb');
const moment = require('moment');
const _ = require('lodash');

const DATABASE = 'stg_ela-mike';
const COLLECTION_A = 'unit_tests';
const COLLECTION_B = 'unit_tests_2';

let dbObject;
let provenDB;

describe('Database Object Tests', () => {
  let connection;
  let db;
  let collection;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.PDB_PROXY_URI, {
      ssl: true,
      sslValidate: false
    });
    db = await connection.db(DATABASE);
    collection = await db.collection(COLLECTION_A);
    collection = await db.collection(COLLECTION_B);
    provenDB = new ProvenDB(db, {});
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('can create a new ProvenDB Client.', () => {
    provenDB = new ProvenDB(db, {});
    expect(provenDB.err).toBe(false);
  });

  it('can access native database object.', () => {
    expect(provenDB.nativeDB.s.databaseName).toBe(DATABASE);
  });

  it('can show and hide metadata.', () => {
    let showMDRes;
    let hideMDRes;
    let findResult;
    jest.setTimeout(15000);
    return provenDB
      .showMetadata()
      .then(
        showMetadataRes =>
          new Promise((resolve, reject) => {
            expect(showMetadataRes.result.ok).toBe(1);
            findResult = collection.findOne({}, (err, findResult) => {
              expect(findResult._provendb_metadata).toBeTruthy();
              resolve();
            });
          })
      )
      .then(provenDB.hideMetadata)
      .then(hideMetadataRes => {
        expect(hideMetadataRes.result.ok).toBe(1);
        findResult = collection.findOne({}, (err, findResult) => {
          expect(findResult._provendb_metadata).toBeUndefined();
        });
      })
      .catch(showMetadataErr => {
        console.error(showMetadataErr);
        expect(showMetadataErr).toBeUndefined();
      });
  });

  //
  // ─── VERSION TESTS ──────────────────────────────────────────────────────────────
  //
  it('can get version', () => {
    return provenDB
      .getVersion()
      .then(result => {
        expect(result.response).toMatch(/The version is set to/);
      })
      .catch(err => {
        console.error(err);
        expect(err).toBeUndefined();
      });
  });

  it('can set version to current', () => {
    return provenDB
      .setVersion('CURRENT')
      .then(result => {
        expect(result.response).toBe(
          `The version has been set to: \'current\'`
        );
      })
      .catch(err => {
        console.error(err);
        expect(err).toBeUndefined();
      });
  });

  it('can get dochistory.', () => {
    return provenDB
      .docHistory(COLLECTION_A, { a: '1' })
      .then(docHistoryResult => {
        expect(docHistoryResult.ok).toBe(1);
        expect(
          docHistoryResult.docHistory[0].history.versions[0].document.a
        ).toBe('1');
      })
      .catch(docHistoryErr => {
        console.error(docHistoryErr);
        expect(docHistoryErr).toBeUndefined();
      });
  });

  it('can set version by number', () => {
    return provenDB
      .setVersion(3)
      .then(result => {
        expect(result.response).toBe(`The version has been set to: \'3\'`);
      })
      .catch(err => {
        console.error(err);
        expect(err).toBeUndefined();
      });
  });

  it.skip('can set version by date string', () => {
    return provenDB
      .setVersion('2019-06-04')
      .then(result => {
        expect(result.response).toBe(`The version has been set to: \'14\'`);
      })
      .catch(err => {
        console.error(err);
        expect(err).toBeUndefined();
      });
  });

  it('can list versions with no params', () => {
    return provenDB
      .listVersions()
      .then(listVersionsResult => {
        expect(listVersionsResult).toBeTruthy();
        expect(listVersionsResult.versions[0].status).toBe(
          _.startCase(VERSION_CONSTANTS.STATUS.ENDED)
        );
        expect(listVersionsResult.ok).toBe(1);
      })
      .catch(listVersionsErr => {
        console.error(listVersionsErr);
        expect(listVersionsErr).toBeUndefined();
      });
  });

  it('can list versions within a date range and limit', () => {
    return provenDB
      .listVersions(
        new Date('2019-06-10T04:41:49.000Z'),
        new Date('2020-06-12T04:41:49.000Z'),
        1
      )
      .then(listVersionsResult => {
        expect(listVersionsResult).toBeTruthy();
        expect(listVersionsResult.versions[0].status).toBe(
          _.startCase(VERSION_CONSTANTS.STATUS.ENDED)
        );
        expect(listVersionsResult.ok).toBe(1);
        expect(listVersionsResult.versions[0].effectiveDate.toString()).toMatch(
          /\(Australian Eastern Standard Time\)/
        );
      })
      .catch(listVersionsErr => {
        console.error(listVersionsErr);
        expect(listVersionsErr).toBeUndefined();
      });
  });

  //
  // ─── PROOF TESTS ────────────────────────────────────────────────────────────────
  //
  it('can submit proof with no params', () => {
    return provenDB
      .submitProof()
      .then(submitProofResult => {
        expect(submitProofResult.ok).toBe(1);
        expect(submitProofResult.status.toLowerCase()).toBe(
          PROOF_CONSTANTS.STATUS.PENDING
        );
      })
      .catch(err => {
        console.error(err);
        expect(err).toBeUndefined();
      });
  });

  it('can submit proof with just collections', () => {
    return provenDB
      .submitProof([COLLECTION_A, COLLECTION_B])
      .then(submitProofResult => {
        expect(submitProofResult.ok).toBe(1);
        expect(submitProofResult.status.toLowerCase()).toBe(
          PROOF_CONSTANTS.STATUS.PENDING
        );
      })
      .catch(err => {
        console.error(err);
        expect(err).toBeUndefined();
      });
  });

  it('can submit proof with just version', () => {
    return provenDB
      .submitProof(1)
      .then(submitProofResult => {
        expect(submitProofResult.ok).toBe(1);
        expect(submitProofResult.status.toLowerCase()).toBe(
          PROOF_CONSTANTS.STATUS.PENDING
        );
      })
      .catch(err => {
        console.error(err);
        expect(err).toBeUndefined();
      });
  });

  it('can submit proof with version and collections', () => {
    return provenDB
      .submitProof(2, [COLLECTION_A, COLLECTION_B])
      .then(submitProofResult => {
        expect(submitProofResult.ok).toBe(1);
        expect(submitProofResult.status.toLowerCase()).toBe(
          PROOF_CONSTANTS.STATUS.PENDING
        );
      })
      .catch(err => {
        console.error(err);
        expect(err).toBeUndefined();
      });
  });

  it.skip('can get proof with no params', () => {
    return provenDB
      .getProof()
      .then(getProofResult => {
        expect(getProofResult.ok).toBe(1);
      })
      .catch(err => {
        console.error(err);
        expect(err).toBeUndefined();
      });
  });

  it.skip('can get proof with version number', () => {
    return provenDB
      .getProof()
      .then(getProofResult => {
        expect(getProofResult.ok).toBe(1);
      })
      .catch(err => {
        console.error(err);
        expect(err).toBeUndefined();
      });
  });

  it.skip('can verify a proof', () => {
    return provenDB
      .getProof(14)
      .then(getProofResult => {
        expect(getProofResult.ok).toBe(1);
        provenDB
          .verifyProof(getProofResult.proofs[0].proofId)
          .then(verifyProofResult => {
            expect(verifyProofResult.ok).toBe(1);
            expect(verifyProofResult.version).toBe(14);
            expect(verifyProofResult.proofStatus).toBe(
              _.startCase(PROOF_CONSTANTS.STATUS.VALID)
            );
          })
          .catch(verifyProofErr => {
            console.error(verifyProofErr);
            expect(verifyProofErr).toBeUndefined();
          });
      })
      .catch(err => {
        console.error(err);
        expect(err).toBeUndefined();
      });
  });

  it('can get documentProof with no version (or format)', () => {
    return provenDB
      .getDocumentProof(COLLECTION_A, { a: '1' })
      .then(getDocumentProofResult => {
        expect(getDocumentProofResult.ok).toBe(1);
        expect(getDocumentProofResult.proofs[0].collection).toBe('unit_tests');
      })
      .catch(getDocumentProofErr => {
        console.error(getDocumentProofErr);
        expect(getDocumentProofErr).toBeUndefined();
      });
  });

  it('can get documentProof with version specified.', () => {
    return provenDB
      .getDocumentProof(COLLECTION_A, { a: '1' }, 3)
      .then(getDocumentProofResult => {
        console.log(getDocumentProofResult);
        expect(getDocumentProofResult.ok).toBe(1);
        expect(getDocumentProofResult.proofs[0].collection).toBe('unit_tests');
        expect(getDocumentProofResult.proofs[0].version).toBe(8);
      })
      .catch(getDocumentProofErr => {
        console.error(getDocumentProofErr);
        expect(getDocumentProofErr).toBeUndefined();
      });
  });

  it('can get proof with all params', () => {
    return provenDB
      .getProof(3, PROOF_CONSTANTS.FORMAT.BINARY, true)
      .then(getProofResult => {
        expect(getProofResult.ok).toBe(1);
        expect(getProofResult.proofs[0].details.collections).toBeTruthy();
      })
      .catch(err => {
        console.error(err);
        expect(err).toBeUndefined();
      });
  });

  //
  // ─── UTIL TESTS ─────────────────────────────────────────────────────────────────
  //
  it('can list ProvenDB commands', () => {
    return provenDB
      .listProvenDBCommands()
      .then(listCommandsRes => {
        expect(listCommandsRes).toBeTruthy();
        expect(listCommandsRes.ok).toBe(1);
        expect(listCommandsRes.message).toMatch(/All commands are run using/);
      })
      .catch(listCommandsErr => {
        console.error(listCommandsErr);
        expect(listCommandsErr).toBeUndefined();
      });
  });

  it('can list storage commands', () => {
    return provenDB
      .listStorage()
      .then(listStorageRes => {
        expect(listStorageRes.ok).toBe(1);
        expect(listStorageRes).toBeTruthy();
      })
      .catch(listStorageErr => {
        console.error(listStorageErr);
        expect(listStorageErr).toBeUndefined();
      });
  });

  it('can prepare a forget command without version range', () => {
    return provenDB
      .prepareForget(COLLECTION_A, { b: 2 })
      .then(prepForgetResult => {
        expect(prepForgetResult).toBeTruthy();
        expect(prepForgetResult.ok).toBe(1);
      })
      .catch(prepForgetErr => {
        console.error(prepForgetErr);
        expect(prepForgetErr).toBeUndefined();
      });
  });

  it('can prepare a forget command with version range', () => {
    return provenDB
      .prepareForget(COLLECTION_A, { b: 2 }, 1, 2)
      .then(prepForgetResult => {
        expect(prepForgetResult).toBeTruthy();
        expect(prepForgetResult.ok).toBe(1);
      })
      .catch(prepForgetErr => {
        console.error(prepForgetErr);
        expect(prepForgetErr).toBeUndefined();
      });
  });

  it.skip('can execute a prepared forget command with version range', () => {
    let forgetId;
    let password;

    return provenDB
      .prepareForget(COLLECTION_A, { b: 2 }, 1, 2)
      .then(prepForgetResult => {
        expect(prepForgetResult).toBeTruthy();
        expect(prepForgetResult.ok).toBe(1);
        let forgetId = prepForgetResult.forgetId;
        let password = prepForgetResult.password;
        provenDB
          .executeForget(forgetId, password)
          .then(execForgetResult => {
            expect(execForgetResult).toBeTruthy();
            expect(execForgetResult.ok).toBe(1);
            expect(execForgetResult.status).toBe('Complete');
          })
          .catch(execForgetErr => {
            console.error(execForgetErr);
            expect(execForgetErr).toBeUndefined();
          });
      })
      .catch(prepForgetErr => {
        console.error(prepForgetErr);
        expect(prepForgetErr).toBeUndefined();
      });
  });

  it.skip('can execute a compact command for two proven versions.', () => {
    return provenDB
      .compactVersions(2, 4)
      .then(compactResult => {
        expect(compactResult).toBeTruthy();
        expect(compactResult.ok).toBe(1);
        expect(compactResult.proofsDeleted).toBe(0);
        expect(compactResult.versionsDeleted).toBe(3);
      })
      .catch(compactErr => {
        console.error(compactErr);
        expect(compactErr).toBeUndefined();
      });
  });

  it.skip('cannot execute a compact command against two unproven versions', () => {
    return provenDB
      .compactVersions(5, 10)
      .then(compactResult => {
        console.log(compactResult);
        expect(compactResult).toBeUndefined();
        expect(CompactResult.ok).toBe(0);
      })
      .catch(compactErr => {
        expect(compactErr.ok).toBe(0);
        expect(compactErr.message).toMatch(
          /Range contains proofs but 'destroyProof' not set to true/
        );
      });
  });

  it('perform a rollback.', () => {
    return provenDB
      .rollback()
      .then(rollbackRes => {
        expect(rollbackRes).toBeTruthy();
        expect(rollbackRes.ok).toBe(1);
      })
      .catch(rollbackErr => {
        console.error(rollbackErr);
        expect(rollbackErr).toBeUndefined();
      });
  });

  it('can start and stop a bulk load.', () => {
    return provenDB
      .bulkLoadKill()
      .then(result => {
        console.log(result);
        expect(result).toBeTruthy();
        provenDB
          .bulkLoadStatus()
          .then(result => {
            console.log(result);
            expect(result).toBeTruthy();
            provenDB
              .bulkLoadStart()
              .then(result => {
                console.log(result);
                expect(result).toBeTruthy();
                provenDB
                  .bulkLoadStatus()
                  .then(result => {
                    console.log(result);
                    expect(result).toBeTruthy();
                    provenDB
                      .bulkLoadStop()
                      .then(result => {
                        console.log(result);
                        expect(result).toBeTruthy();
                      })
                      .catch(err => {
                        console.error(err);
                        expect(err).toBeUndefined();
                      });
                  })
                  .catch(err => {
                    console.error(err);
                    expect(err).toBeUndefined();
                  });
              })
              .catch(err => {
                console.error(err);
                expect(err).toBeUndefined();
              });
          })
          .catch(err => {
            console.error(err);
            expect(err).toBeUndefined();
          });
      })
      .catch(err => {
        console.error(err);
        expect(err).toBeUndefined();
      });
  });
});
