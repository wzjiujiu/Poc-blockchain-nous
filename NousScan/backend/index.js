import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(cors({
  origin: "http://localhost:3100", // frontend React
  credentials: true,               // permette invio cookie
}));
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

app.get("/auth/check", async (req, res) => {
  try {
    // Cerca UTENTI loggati
    const result = await pool.query(
      `SELECT id, email, meta, is_logged_in
       FROM users
       WHERE is_logged_in = TRUE
       LIMIT 1`
    );

    // Nessun utente loggato
    if (result.rows.length === 0) {
      return res.json({
        loggedIn: false
      });
    }

    // Utente loggato trovato
    const user = result.rows[0];

    return res.json({
      loggedIn: true
    });

  } catch (err) {
    console.error("Errore auth/check:", err);
    res.status(500).json({ error: "Errore server" });
  }
});

app.listen(3001, () => console.log("Backend attivo su http://localhost:3001"));