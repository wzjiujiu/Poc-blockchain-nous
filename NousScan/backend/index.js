import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/tx/latest", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM transactions ORDER BY timestamp DESC LIMIT 5`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore DB" });
  }
});

app.listen(3001, () => console.log("Backend attivo su http://localhost:3001"));