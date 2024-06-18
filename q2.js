const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [];

function validateUserInput(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
  
    next();
}

function processRegistration(req, res) {
    const { email, password } = req.body;
   const newUser = { email, password };
    users.push(newUser);

    res.status(200).json({ message: 'User registered successfully', user: newUser });
}

app.post('/register', validateUserInput, processRegistration);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
