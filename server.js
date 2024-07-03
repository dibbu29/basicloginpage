const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

const users = [
  { username: 'john', password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' },
  { username: 'jane', password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' }
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (user) {
    const isValid = bcrypt.compareSync(password, user.password);
    if (isValid) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});