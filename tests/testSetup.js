// Insert.
db.unit_tests.insertOne({ a: '1', b: '2', c: '3' });
db.unit_tests.insertOne({ a: '4', b: '5', c: '6' });
db.runCommand({ submitProof: 3 });
db.unit_tests.insertOne({ a: '7', b: '8', c: '9' });

db.unit_tests_2.insertOne({ a: '1', b: '2', c: '3' });
db.unit_tests_2.insertOne({ a: '4', b: '5', c: '6' });
db.unit_tests_2.insertOne({ a: '7', b: '8', c: '9' });
db.runCommand({ submitProof: 5 });

// Update
db.unit_tests.update({ a: '1' }, { $set: { b: 'b' } });
