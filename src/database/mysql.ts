import mysql from 'mysql';
import config from 'config';

class Mysql {
  constructor() {
    this.pool = mysql.createPool({
      connectionLimit     : config.get("db.pool_limit"),
      timeout             : 60 * 60 * 1000,
      multipleStatements  : true,
      host                : config.get("db.host"),
      charset             : "utf8mb4_general_ci",
      connectTimeout      : 60 * 60 * 1000,
      database            : config.get("db.name"),
      user                : config.get("db.username"),
      password            : config.get("db.password")
    });
  }

  private pool: mysql.Pool

  public query = (query: string | mysql.QueryOptions, values: any): Promise<any> => new Promise((resolve, reject) => {
    this.pool.getConnection((error, connection) => {
      if (error)
        return reject(error);

      connection.query(query, values, (err, results, fields) => {
        if (err)
          return reject(err);

        connection.release();

        return resolve({ results, fields });
      });
    });
  });
}

export default new Mysql();
