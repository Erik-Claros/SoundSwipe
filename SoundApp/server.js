const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('./database.db');

app.use(cors());
app.use(bodyParser.json());

// Create a user
app.post('/api/users', (req, res) => {
    const { phone, first_name, last_name, spotify_link } = req.body;
    db.run('INSERT INTO Users (phone, first_name, last_name, spotify_link) VALUES (?, ?, ?, ?)', [phone, first_name, last_name, spotify_link], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Get all users
app.get('/api/users', (req, res) => {
    db.all('SELECT * FROM Users', [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM Users WHERE uID = ?', id, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ deletedID: id });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});