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
