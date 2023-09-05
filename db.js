import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

class MySQLDB {
  constructor() {
    this.pool = null;
  }

  initDB() {
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    });
    console.log("connected to DB");
  }

  async executeSqlQuery(sql, values) {
    try {
      const [rows] = await this.pool.query(sql, values);
      return rows;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }
}

const db = new MySQLDB();
export default db;
