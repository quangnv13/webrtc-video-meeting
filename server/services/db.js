const mysql = require('mysql2/promise');
const CONFIG = require('../config');

const pool = mysql.createPool({
  host: CONFIG.MYSQL_HOST,
  user: CONFIG.MYSQL_USER,
  password: CONFIG.MYSQL_PASSPORT,
  port: CONFIG.MYSQL_PORT,
  database: CONFIG.MYSQL_DATABASE,
  connectionLimit: 5,
  dateStrings: true,
  waitForConnections: true,
  queueLimit: 0,
});

const query = async (sql, conn) => {
  try {
    let connection;

    if (conn !== undefined) connection = conn;
    else connection = await pool.getConnection(async (conn) => conn);

    try {
      const [rows, _] = await connection.query(sql);

      return rows;
    } catch (err) {
      throw new Error(err);
    } finally {
      // console.log(sql);
      if (conn === undefined) connection.release();
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = db = {
  query,
  pool,
};
