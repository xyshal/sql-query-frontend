'use strict';

const express = require('express');
const app = express();
const mariadb = require('mariadb');

app.get('/', function(req, res) {

  const pool = mariadb.createPool({
    host: 'db',
    database: 'testdb',
    user: 'test'
  });

  async function makeQuery() {
    let conn;

    try {
      conn = await mariadb.createConnection({
        host: 'db',
        database: 'testdb',
        user: 'test'
      });

      const rows = await conn.query("SELECT * FROM test");
      res.send(rows);

    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
  }

  makeQuery();

});

const server = app.listen(8080, () => {
  console.log(`server bound ${server.address().address}:${server.address().port}`);
});
