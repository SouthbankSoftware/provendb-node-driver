const ProvenDB = require('../index.js').Database;
const CONSTANTS = require('../index.js').Constants.General;
const PROOF_CONSTANTS = require('../index.js').Constants.Proof;
const VERSION_CONSTANTS = require('../index.js').Constants.Version;
const { MongoClient } = require('mongodb');

connection = await MongoClient.connect('mongodb://provendocsUser:DBEnvy2016@localhost:27019/provendocs', { ssl: true,
sslValidate: false,});
db = await connection.db(DATABASE);
collection = await db.collection(COLLECTION_A);