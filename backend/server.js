const pool = require('./db');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Signup route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
if (password.length < 6) {
  return res.send('Password must be at least 6 characters');
}
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );

    res.send('Signup successful');

  } catch (err) {
    console.error(err.message);

    // Duplicate username/email
    if (err.code === '23505') {
      res.send('Username or email already exists');
    } else {
      res.send('Signup error');
    }
  }
});
//login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    // No user found
    if (result.rows.length === 0) {
      return res.send('User not found');
    }

    const user = result.rows[0];

    // Compare hashed password
    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (validPassword) {
      res.send('Login successful');
    } else {
      res.send('Incorrect password');
    }

  } catch (err) {
    console.error(err.message);
    res.send('Login error');
  }
});

app.post('/reset-password', async (req, res) => {

  const { email, newPassword } = req.body;

  try {

    // Check if user exists
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.send('Email not found');
    }

    // Hash new password
    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    // Update password
    await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2',
      [hashedPassword, email]
    );

    res.send('Password reset successful');

  } catch (err) {

    console.error(err.message);

    res.send('Password reset error');
  }
});

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});