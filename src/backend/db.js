import mysql from "mysql2/promise";

const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "qweasd123",
  database: "fullstack_cafe",
  waitForConnections: true,
  connectionLimit: 10
});

export default db;
