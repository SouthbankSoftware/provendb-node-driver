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
 * @Date:   2019-06-05T16:40:33+10:00
 * @Last modified by:   Michael Harrison
 * @Last modified time: 2019-07-03T10:36:42+10:00
 */
/**
 * @module Types_Proof
 * @param {module:Proof_Constants} Proof_Constants - Enumerations and Constants used in the Proof Type.
 */

/**
 * Response from getProof commands.
 * @typedef module:Types_Proof.getProofResponse
 * @property {number} ok - Did command execute without error (1 | 0)
 * @property {Array<module:Types_Proof.Proof>} proofs - Message recieved from Database.
 * @type {object}
 * @example
 * {
 *  "ok": 1,
 *  "proofs": [
 *  {
 *   "proofId": "33313180-9d2a-11e9-a57b-016d01696933",
 *   "version": 85,
 *   "submitted": "2019-07-03T00:33:38.000Z",
 *    "hash": "60f469fe214424bb1602b44b7ecdf7149df8a198aa2f64e40b10ea21b6fb6c64",
 *    "scope": "database",
 *    "status": "Pending",
 *    "details": {
 *      "protocol": {
 *        "name": "chainpoint",
 *        "uri": "http://35.235.91.33",
 *        "hashIdNode": "33313180-9d2a-11e9-a57b-016d01696933"
 *      }
 *    }
 *  }
 *  ]
 * }
 * @type {object}
 */

/**
 * Response from submitProof commands.
 * @typedef module:Types_Proof.submitProofResponse
 * @property {number} ok - Did command execute without error (1 | 0)
 * @property {NumberLong} version - The version the proof was submitted for.
 * @property {ISODate} dateTime - The ISODate the proof was submitted at.
 * @property {string} hash - The hash representing the proof for anchoring on the blockchain.
 * @property {string} proofId - The ID of the proof.
 * @property {module:Proof_Constants.STATUS} status - The status of the proof, this should always be "Pending" for newly submitted proofs.
 * @type {object}
 * @example
 * {
 *    "ok": 1,
 *    "version": 85,
 *    "dateTime": "2019-07-03T00:33:38.000Z",
 *    "hash": "60f469fe214424bb1602b44b7ecdf7149df8a198aa2f64e40b10ea21b6fb6c64",
 *    "proofId": "33313180-9d2a-11e9-a57b-016d01696933",
 *    "status": "Pending"
 * }
 * @type {object}
 */

/**
 * Response from verifyProof commands.
 * @typedef module:Types_Proof.verifyProofResponse
 * @property {number} ok - Did command execute without error (1 | 0)
 * @property {NumberLong} version - The version the proof was submitted for.
 * @property {ISODate} dateTime - The ISODate the proof was submitted at.
 * @property {string} hash - The hash representing the proof for anchoring on the blockchain.
 * @property {string} proofId - The ID of the proof.
 * @property {module:Proof_Constants.STATUS} proofStatus - The status of the proof, this should always be "Pending" for newly submitted proofs.
 * @property {string} btcTransaction - The btc transaction that the proof was appended in.
 * @property {string} btcBlockNumber - The btc block the proof is anchored to.
 * @property {BinData} proof - A binary representation of a full proof.
 * @example
 * {
 *    "ok": 1,
 *    "version": NumberLong(3),
 *    "dateTime" ISODate("2019-07-02T03:38:09.208Z"),
 *    "hash": "da430d4d2d5cc72b0386cd016671d2d053d3fd43bcb5ec8f70385d53db0c006f",
 *    "proofId": "81ad54f0-9c5e-11e9-a57b-011b38f41044",
 *    "proofStatus": "Valid",
 *    "btcTransaction": "425d1167717bf05ecd52077acc344cc10fbf7fa8a41b5a9629221da1f5f183bb",
 *    "btcBlockNumber": "583385",
 *    "proof": BinData(0,"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")
 * }
 * @type {object}
 */

/**
 * Proof Document
 * @typedef module:Types_Proof.Proof
 * @property {string} proofId - Unique identifier for the proof.
 * @property {number} version - The version the proof was submitted for.
 * @property {date} submitted - When the proof was submitted
 * @property {module:Proof_Constants.TYPE} type - Either Full or Collection.
 * @property {string} hash - The root hash for the proof that goes on the blockchain.
 * @property {module:Proof_Constants.STATUS} status - Pending, Valid, Invalid, Submitted, Failed or Purged.
 * @property {module:Types_Proof.ProofDetails} details - The Proof Details.
 * @property {module:Types_Proof.ChainpointProof} proof - The Chainpoint proof itself.
 * @type {object}
 */

/**
 * Proof Details
 * @typedef module:Types_Proof.ProofDetails
 * @property {Object} protocol
 * @property {string} btcTxn - The btc Transaction the proof is in.
 * @property {string} btcTxnReceived - When the btc transaction was started.
 * @property {string} btcTxnConfirmed - When the btc transaction was finalized.
 * @property {string} btcBlock - The btc block the proof is in.
 * @type {object}
 */

/**
 * Chainpoint Proof
 * @typedef module:Types_Proof.ChainpointProof
 * @see https://chainpoint.org/
 * @type {object}
 */
