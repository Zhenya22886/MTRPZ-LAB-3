require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM messages ORDER BY id DESC');
        const messages = result.rows;

        res.send(`
      <h1>Повідомлення</h1>
      <form method="POST" action="/messages">
        <input type="text" name="text" placeholder="Введіть повідомлення" required />
        <button type="submit">Відправити</button>
      </form>
      <h2>Список повідомлень:</h2>
      <ul>
        ${messages.map(m => `<li>${m.text}</li>`).join('')}
      </ul>
    `);
    } catch (err) {
        console.error(err);
        res.status(500).send('Помилка сервера');
    }
});

app.post('/messages', async (req, res) => {
    const text = req.body.text;
    if (!text) return res.status(400).send('Текст обов\'язковий');

    try {
        await pool.query('INSERT INTO messages (text) VALUES ($1)', [text]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Помилка бази даних');
    }
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});