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
