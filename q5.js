const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const requestCount = {};

const rateLimit = (req, res, next) => {
    const clientIP = req.ip;

    if (!requestCount[clientIP]) {
        requestCount[clientIP] = {
            count: 0,
            lastReset: Date.now()
        };
    }

    const currentTime = Date.now();

    if (currentTime - requestCount[clientIP].lastReset > 60000) {
        requestCount[clientIP].count = 0;
        requestCount[clientIP].lastReset = currentTime;
    }

    requestCount[clientIP].count++;

    if (requestCount[clientIP].count > 5) {
        return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
    }

    next();
};

app.use(rateLimit);

app.get('/test', (req, res) => {
    res.send('This route is rate-limited to 5 requests per minute.');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
