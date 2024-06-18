const express = require('express');
const app = express();
const port = 3000;

app.get('/welcome/:userId', (req, res) => {
    const userId = req.params.userId;
    res.send(`Welcome, User ${userId}!`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
