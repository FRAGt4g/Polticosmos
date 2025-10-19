import { Pool } from "pg";

const db = new Pool({
  host: "75.81.64.177",
  port: 5432,
  user: "postgres",
  password: "dev",
  database: "postgres",
});

export default db;
