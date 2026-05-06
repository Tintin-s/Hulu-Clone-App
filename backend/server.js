const pool = require('./db');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, password]
    );

    res.send('User saved to database');
  } catch (err) {
    console.error(err.message);
    res.send('Error saving user');
  }
});
//login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.send('User not found');
    }

    const user = result.rows[0];

    if (user.password === password) {
      res.send('Login successful');
    } else {
      res.send('Incorrect password');
    }

  } catch (err) {
    console.error(err.message);
    res.send('Login error');
  }
});

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});