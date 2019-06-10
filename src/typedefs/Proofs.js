/**
 * @module Types_Proof
 * @param {module:Proof_Constants} Proof_Constants - Enumerations and Constants used in the Proof Type.
 */

/**
 * Response from getProof commands.
 * @typedef module:Types_Proof.getProofResponse
 * @property {number} ok - Did command execute without error (1 | 0)
 * @property {Array<module:Proofs.Proof>} proofs - Message recieved from Database.
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
 * @property {module:Proofs.ProofDetails} details - The Proof Details.
 * @property {module:Proofs.ChainpointProof} proof - The Chainpoint proof itself.
 *  @type {object}
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
