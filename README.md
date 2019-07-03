<div align="center">

![ProvenDB Logo](./logo.svg)

# **NodeJS Driver for ProvenDB**.
[![Powered by ProvenDB](https://img.shields.io/static/v1.svg?label=Powered%20By&message=ProvenDB&color=35b3d4&labelColor=1c4d6b&link=https:/provendb.com&link=https:/provendb.com&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA0CAYAAAD8H6qwAAAAAXNSR0IArs4c6QAABk9JREFUaAXFWV2ME1UUvne6P2xcBDQY3UQDCA9L2S5LWyEaiRgIsrbgKvKjIj9PRhLDiw88+OoDDyQY39QHwp9INLLtigYRg4IsbRfpz4KRjUgIJmAEk3W3u9uZ43dnmXZmOnPbLi29STPnnnt+vt57zz1n7nBWpxaMpp5lxM66uSfGaLxJezy5uvOWkFHcBGvO19ibJXz8aIAUcvUB+gV5GKfNMqDE+GHzeF2ALpmWXsMYn2UGYqaJ0US2lX9u5tUFqMLly84Zj2ZWeIfrCtR7OtPKGXvFDMJOE/FDdl6DmTH/m9+bZ6ijO/GPnueMFkJhPufV2ceI4gvxcMfSlmF6FT6nmf2aaSI2TG3ZXjNP0Hmg/r7MUq5mDwHk05NCoPDXq9UA4OCkLZJHO2fHEoHAhN2vDiXYl1nMNDWGDZ4HjjNuELNw264w1f6YQj28kRqbx/hNzIDH3Y6yMhb2nrKPNzAcFaSlD2P+dJBE9BtX+I5YuOOcXfh++4FoeheOJXeQRLdi4YU/OPlRgtNSWzCt7WIQM3i5MTurKxaqPkhhn2vyZYf/Q5htPAotGEluFz2FOH/bYHOF3vllw5OjRr+az2A0OY9xFpDZ1BQANbUl0VQ79vZewWrAbHYKAkt+N/6y74yga9KIbZPZxTQODYR8CbOMQrSNcz7T992lx8SB/8jkIL9uFqo2DSDSaMeK77f4xNmIvr7szWMNswuZiVPOIljFzpLeS8sQrPNkJjXFmtsDvemV0JktdEjhvABUZuU+x+DnLZkJ5Pb+RHfHkFkGyHrM/doDxfGHNXzD7NROO6VMBFGrWa5wwJu5VaQDLanVskoJUaxONNPRUi5rPqOYTWkQAeBJc4HsBrimQOec/gPFBxdFiGuzF8hugjUFOvu/4fVw7FopYSz79/TWY27gzPyaAmWlU+bX11bMzZoBudFyoAjHQCT1Pn6fuRlw44tsgrFVbuOCr5E1ZcpkXYH6Tw7NAMA+BMMe/HYEe9PvygzZxxrHlU3yco7uDGQXnbDrufUdgQYimWd4diSJPIuXMKNpHwm+0Sv1LBXtCKKjbANXS9kxxouA+iOp9zhTz8LRU4aQ/tSLXTXq/3bwCQvfoSMqJehL/xQxxVIpOZixsPJAUTR4ApHkcTD2WSp9k7jIvXw81+ePxxtN7CISWztfOhYN6gy6kQh7f3Yec+bmgQKEKFmXOYsVuJDqUv5q+qTAcaJoixO3wFMOFujyqDxQ1Cg5ldE6kdJKq/KtgUh6p5Ocvr9LVEo5Dz/gpCvjmYAyNrC28zyqwF0yBWOMk7bPMbhIk1dKxJIXu72Dhp1ynxagQike9n2Mav9ISQNOwaVXSrRRqsuLLxek8vcGi4AK/t2Glu2oEVOlDBjBJS4uhGzwocFV2OrioHdsCFjyeFTL5ZejoAPTEejV7gVjxDwhgP3XQcfCEsE1U83u15maKl12TvRTf3fnDYuBMjuOQIUujo/ruClZjwJWK2ULZ+ZGkWpxrL0mlbW9ZUplbYOuQIVcLOT7HjdPH9h0HLsAuwcDrpWSfpXIWFmVkpMDKVChEA91fIi91eekXCHvRCrku1OhTl68JFAhOdqqbALYobzWFAjucJVYiZmygIpLVSxdCMlgSrco2OfDt6e3Fl0lVh2oMJgI+64wRf7a6+YYufnLcgtkNxtlzaihjMuzrzCzImgqaprtw0FFyveEKwIqdBBcu7EFzpTtDFeJidFFp8qWdxGsGCgyjzbS5OlBmr3pYtPK5vxIJQWyVbnQm9IFROYl7z/+yGCYkapfCRbMOVCkTGYth6FKWFMCKhwkwgsH8HhB0A+i4QryXook/vCDcFi+D8rjIcrlcNHG9I+i+FwzV7x5lm+o5pJBw0PT6Kw/MaN0UWegvuSjIygs6t/wUWITqrI2gQQZ8Yq4rseMcvNm3x3oTa6rJ9RgX3I5I+1TAwNWWseHoocxlGj9IPTXW+zZcbAOqA3K3qm8MhgOKnmKz44tw+pyvFy+jo8fW4FFxwUsV4k/2pkIt43ojMUnLs9pzE0git2/+FbiuCqySBR4g38xttabEfb0A//XNe3XVM6fQ8Y5XxUn92kE+/Jcjpq6DJDCnD6jZrv+aHqFQtpmXLkswE4uGjfLVo3GRsSy3wLAq4wrx+Nh7wW77f8BOCwBY4XYwqgAAAAASUVORK5CYII=)](https://img.shields.io/static/v1.svg?label=Powered%20By&message=ProvenDB&color=35b3d4&labelColor=1c4d6b&link=https:/provendb.com&link=https:/provendb.com&logo=data:image/png;base64,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)
[![License](https://img.shields.io/github/license/SouthbankSoftware/provendb-node-driver.svg)](https://img.shields.io/github/license/Southbanksotware/provendb-node-driver.svg)
</div>
<div align="center" style="display: flex; flex-direction: row; justify-content: space-around">

[![Dependencies](https://img.shields.io/david/SouthbankSoftware/provendb-node-api.svg)](https://img.shields.io/david/SouthbankSoftware/provendb-node-api.svg) [![Open Issues](https://img.shields.io/github/issues-raw/SouthbankSoftware/provendb-node-api.svg)](https://img.shields.io/github/issues-raw/SouthbankSoftware/provendb-node-api.svg) [![Last Commit](https://img.shields.io/github/last-commit/Southbanksoftware/provendb-node-api.svg)](https://img.shields.io/github/last-commit/Southbanksoftware/provendb-node-api.svg)
</div>

**NOTE** - This driver is still very much a work in progress, please be patient with us!

*More information and detailed documentation for ProvenDB Application can be found on the **[ProvenDB ReadMe.IO](https://provendb.readme.io/docs)***

</div>

---
# Table of Contents
- [**NodeJS Driver for ProvenDB**.](#NodeJS-Driver-for-ProvenDB)
- [Table of Contents](#Table-of-Contents)
- [Requirements](#Requirements)
- [Getting Started](#Getting-Started)
  - [Installation](#Installation)
  - [Quick Start](#Quick-Start)
    - [ProvenDB Service](#ProvenDB-Service)
    - [Connect to MongoDB](#Connect-to-MongoDB)
    - [Using ProvenDB](#Using-ProvenDB)
      - [Document History.](#Document-History)
      - [Create a Proof](#Create-a-Proof)
      - [Get an existing Proof](#Get-an-existing-Proof)
  - [Next Steps](#Next-Steps)
- [Documentation](#Documentation)
- [Troubleshooting](#Troubleshooting)
  - [Change Log](#Change-Log)
  - [Compatability](#Compatability)
- [Contributing](#Contributing)
  
# Requirements
_ Full requirements have not yet been tested, coming soon._

# Getting Started
First, create a new project using `npm`.
```bash
mkdir myProvenDBApp
cd myProvenDBApp

npm init
```

## Installation
Now we can add the only two dependencies we need to get started.
```bash
npm install mongodb --save
npm install @southbanksoftware/provendb-node-driver --save
```

## Quick Start
### ProvenDB Service
This driver will only work when run against a ProvenDB service. You can get a free early access account [here](provendb.com). 
### Connect to MongoDB
Create a file called `index.js` and put the following code inside.

_Note: We'll use using Async/Await syntax for this example to maintain clarity of code, but the same can be accomplished with callbacks or promises._
```js
// Import required libraries.
const ProvenDB = require('@southbanksoftware/provendb-node-driver').Database;
const { MongoClient } = require('mongodb');
// Define our connection information.
const URL = process.env.PROVENDB_URI;             // The URI for your ProvenDB service.
const DATABASE = process.env.PROVENDB_DATABASE;   // The Database for your ProvenDB service.
let connection; // Our MongoDB connection object.
let db;         // Our MongoDB Database
let pdb;        // Our ProvenDB Database.
let result;     // To store our result documents.

async function proveMyDB() {
  connection = await MongoClient.connect(process.env.PDB_PROXY_URI);
  db = await connection.db(DATABASE);

  // ProvenDB Logic goes here...

  // Document History

  // Create a Proof

  // View a Proof.
}

proveMyDB();
```
You may notice this looks just like MongoDB code so far. Run your app with `node index.js`, you should see the **Connected successfully to server** message.

### Using ProvenDB
To use the extra Blockchain and versioning capabilties of ProvenDB, all you need to do is pass your Mongo Connection into the ProvenDB driver.

Under this section:
```js
// ProvenDB Logic goes here...

```
Add the following code to insert a document:
```js
  pdb = new ProvenDB(db);                           // Create ProvenDB Client.
  collection = pdb.collection('proven_staff');      // Get collection.
  result = await pdb.getVersion();                  // Check current version.
  console.log(`Version was ${result.version}.`);
  result = await collection.insertOne({             // Add a document.
    name: 'Michael',
    role: 'Code Monkey'
  });
  console.log(`Inserted a document.`);
  result = await pdb.getVersion();                  // Check version again.
  console.log(`Version is now ${result.version}.`);
```
You may have noticed that we can get the `collection('proven_staff')` directly from the ProvenDB client, that's because it exposes the underyling MongoDB functions as well. This means you don't need to go back and forth between the native MongoDB driver and the ProvenDB driver, everything you need is now avaliable in our `pdb` object!

If you run this script again with `node index.js` you'll see that each time we insert a document, our version number increments. This is what allows us to keep point in time history of your documents for later anchoring on the blockchain. For more information about versioning, see [this](https://provendb.readme.io/docs/working-with-versions) page.

#### Document History.
Let's have a look at one of the things we can do with this new version information. We'll make some updates to our document, and then retrieve the history of that document.

Under this section:
```js
// Document History
```
Add the following code:
```js
  // Update a document.
  result = await collection.update(
    { name: 'Michael', role: 'Code Monkey' },
    { $set: { role: 'Chief Code Monkey' } }
  );
  console.log(`Updated ${result.result.nModified} document/s.`);
  // Fetch the history of that document.
  result = await pdb.docHistory('proven_staffe', { name: 'Michael' });
  console.log(
    `History for document: ${JSON.stringify(result.docHistory[0], null, 4)}`
  );

```
You should see something like the following if you execute your code:
```json
History for document: {
    "collection": "proven_staff",
    "_id": "5d19a8ee33faa1ed71a8e364",
    "history": {
        "versions": [
            {
                "minVersion": 58,
                "maxVersion": 59,
                "status": "Unproven",
                "started": "2019-07-01 06:32:14",
                "ended": "2019-07-01 06:32:14",
                "document": {
                    "name": "Michael",
                    "role": "Code Monkey"
                }
            },
            {
                "minVersion": 60,
                "maxVersion": "9223372036854775807",
                "status": "Unproven",
                "started": "2019-07-01 06:32:21",
                "ended": "2019-07-01 06:32:21",
                "document": {
                    "name": "Michael",
                    "role": "Chief Code Monkey"
                }
            }
        ]
    }
}
```
Here we can see that Michael was promoted along with the time that update occured. You may notice that the `status` field is set to `Unproven`. This indicated to us that these version of the Database have not yet been placed on the Blockchain. Let's change that.

#### Create a Proof

Under this section:
```js
// Create a Proof
```
Add the following code:
```js
  result = await pdb.submitProof();
  console.log(`Submitted Proof: ${JSON.stringify(result, null, 4)}`);
```
Run the code again and you will see a result like this:
```json
Submitted Proof: {
    "ok": 1,
    "version": 68,
    "dateTime": "2019-07-01T06:40:32.000Z",
    "hash": "0ad12bf41ab2a7047148d5ee30cc61284f11676bf0e907a38741a740db072ca4",
    "proofId": "1ffbe8e0-9bcb-11e9-a57b-01d798cd6796",
    "status": "Pending"
}
```
We can see here that a new proof has been created for version 68, at the current time and that it is still in status `Pending`. This means it has been sent to the Blockchain but is not yet part of a block. For more information about working with proofs see [this](https://provendb.readme.io/docs/working-with-proofs) page.
#### Get an existing Proof
```js
  result = await pdb.getProof();
  console.log(`Latest Proof Is: ${JSON.stringify(result, null, 4)}`);
```
Run the code again and you will see a result like this:
```json
Latest Proof Is: {
    "ok": 1,
    "proofs": [
        {
            "proofId": "1ffbe8e0-9bcb-11e9-a57b-01d798cd6796",
            "version": 68,
            "submitted": "2019-07-01T06:40:32.000Z",
            "hash": "0ad12bf41ab2a7047148d5ee30cc61284f11676bf0e907a38741a740db072ca4",
            "scope": "database",
            "status": "Pending",
            "details": {
                "protocol": {
                    "name": "chainpoint",
                    "uri": "http://35.235.91.33",
                    "hashIdNode": "1ffbe8e0-9bcb-11e9-a57b-01d798cd6796"
                }
            }
        }
    ]
}
```
By default both submitProof and getProof will operate on the latest version of the database, however you can also submitProof for a specific version and collection. See the documentation for more details.

## Next Steps
If you're searching for some help getting started, take a look at some of these helpful next steps

- Read through the [documentation]() and examples.
- Read through some of our [blogs](https://medium.com/provendb).
- Try our sample application built on top of ProvenDB: [ProvenDocs](provendocs.com)
- Send us an email at [support@provendb.com](mailto:support@provendb.com).

# Documentation
- ProvenDB high level documentation and concepts manual is avaliable [here](https://provendb.readme.io/docs)
- Node Driver API documentation is avaliable online [here]().

  *OR*
- You can generate the Driver documentation by cloning this repository and running:
```bash
npm install
npm generate-docs
``` 

# Troubleshooting
## Change Log
You can view the full change log [here](./CHANGELOG.md).
## Compatability
_Full compatability has not yet been tested, coming soon._

# Contributing
For issues, questsions or feature requests relating directly to the ProvenDB Node driver you can create Github Issues [here](https://github.com/SouthbankSoftware/provendb-node-driver/issues) or by emailing us directly at [support@provendb.com](mailto:support@provendb.com).

For issues, questions or requests relating to the ProvenDB platform you can ask us questions on our support forum [here](https://provendb.readme.io/discuss?isFAQ=true).

For questsions about ProvenDB or Southbanksoftware the companies, please email us directly at [support@provendb.com](mailto:support@provendb.com).