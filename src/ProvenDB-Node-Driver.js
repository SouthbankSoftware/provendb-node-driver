/**
 * @file ProvenDB Node Driver
 * @license
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
 * @description This driver takes the standard MongoDB Node Driver {@link https://mongodb.github.io/node-mongodb-native/} and extends the functioanlity to support ProvenDB usage. Please Note, this driver is still being developed.
 * @author Michael Harrison
 * @version 0.1.8
 * @see module:Database~ProvenDB
 * @see https://provendb.readme.io
 * @example
 * // Import required libraries.
 * const ProvenDB = require('@southbanksoftware/provendb-node-driver').Database;
 * const { MongoClient } = require('mongodb');
 * // Define our connection information.
 * const URL = process.env.PROVENDB_URI;
 * const DATABASE = process.env.PROVENDB_DATABASE;
 * // Variables
 * let connection; // Our MongoDB connection object.
 * let db; // Our MongoDB Database
 * let pdb; // Our ProvenDB Database.
 * let collection; // Our Collection.
 * let result; // To store our result documents.
 *
 * async function proveMyDB() {
 *    // Normal MongoDB connection.
 *    connection = await MongoClient.connect(URL, {
 *    sslValidate: false,
 *    useNewUrlParser: true
 *  });
 *  db = await connection.db(DATABASE);
 *
 *  // ProvenDB Logic goes here...
 *  pdb = new ProvenDB(db);
 *  collection = pdb.collection('proven_staffe');
 *  result = await pdb.getVersion();
 *  console.log(`Version was ${result.version}.`);
 *  result = await collection.insertOne({
 *    name: 'Michael',
 *    role: 'Code Monkey'
 *  });
 *  console.log(`Inserted a document.`);
 *  result = await pdb.getVersion();
 *  console.log(`Version is now ${result.version}.`);
 *
 *  // Document History.
 *  result = await collection.updateOne(
 *      { name: 'Michael', role: 'Code Monkey' },
 *      { $set: { role: 'Chief Code Monkey' } }
 *  );
 *  console.log(`Updated ${result.result.nModified} document/s.`);
 *  result = await pdb.docHistory('proven_staffe', { name: 'Michael' });
 *  console.log(
 *      `History for document: ${JSON.stringify(result.docHistory[0], null, 4)}`
 *  );
 *
 *  // Create a Proof.
 *  result = await pdb.submitProof();
 *  console.log(`Submitted Proof: ${JSON.stringify(result, null, 4)}`);
 *
 *  // View a Proof.
 *  result = await pdb.getProof();
 *  console.log(`Latest Proof Is: ${JSON.stringify(result, null, 4)}`);
 *
 *  connection.close();
 *   process.exit();
 * }
 *
 * proveMyDB();
 */
