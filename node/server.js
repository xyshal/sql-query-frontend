'use strict';

const express = require('express');
const app = express();

const mariadb = require('mariadb');
const path = require('path');

// -----------
// GET HANDLER
// -----------
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});


// ------------
// POST HANDLER
// ------------
app.post('/', function(req, res) {

  // TODO: Functionalize this elsewhere.  Does that work with JS/node/this lib?
  async function makeQuery() {
    let conn;
    let rows;

    try {
      conn = await mariadb.createConnection({
        host: 'db',
        database: 'testdb',
        user: 'test'
      });

      rows = await conn.query("SELECT * FROM test");
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
      return rows;
    }
  }

  const queryPromise = makeQuery();
  // TODO: Is this actually how we should be using Promises?
  queryPromise.then(
    (value) => {
      let resultString = "";
      // TODO: There has to be a more sane way to exclude the meta object...
      for ( var i = 0; i < value.length; i++) {
        const row = value[i];
        for ( const key in row ) {
          resultString = resultString + key + ": " + row[key] + "<br/>";
        }
        resultString = resultString + "------<br/>";
      }
      const response = "<html><body>" + resultString + "</body></html>";
      res.send(response);
    },
    (reason) => {
      console.log("Failure in query");
      console.error(reason);
      res.send(reason);
    },
  );
});

const server = app.listen(8080, () => {
  console.log(`server bound ${server.address().address}:${server.address().port}`);
});
