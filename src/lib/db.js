import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

// Next.js dev modunda hot-reload sırasında birden fazla bağlantı açılmasını
// engellemek için global önbellek kullanıyoruz.
const globalForDb = globalThis;

function createConnection() {
  const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), "trogworks.db");
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  const schemaPath = path.join(process.cwd(), "src", "lib", "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");
  db.exec(schema);

  return db;
}

export const db = globalForDb.__trogworksDb || createConnection();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__trogworksDb = db;
}
