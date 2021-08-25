const mysql = require('mysql'),
  config = require('config'),
  migration = require('mysql-migrations');

(async function() {
  try {
    const connection = mysql.createConnection({
      host     : config.get("db.host"),
      user     : config.get("db.username"),
      password : config.get("db.password"),
    }), query = `CREATE DATABASE IF NOT EXISTS ${config.get("db.name")}\
      CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci`;

    connection.query(query, error => {
      if (error) throw error;
      connection.end();
    });
  } catch (error) {
    console.error(error);
  }
})();

let connection = mysql.createPool({
  connectionLimit : config.get("db.pool_limit"),
  host            : config.get("db.host"),
  user            : config.get("db.username"),
  password        : config.get("db.password"),
  database        : config.get("db.name")
});

migration.init(connection, __dirname + '/migrations');
