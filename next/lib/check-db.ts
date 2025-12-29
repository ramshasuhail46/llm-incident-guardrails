import "dotenv/config";
import pg from "pg";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new pg.Pool({ connectionString });
  
  try {
    const client = await pool.connect();
    const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log("Tables in 'public' schema:");
    res.rows.forEach(row => console.log("- " + row.table_name));
    client.release();
  } catch (err) {
    console.error("Error connecting to DB:", err);
  } finally {
    await pool.end();
  }
}

main();
