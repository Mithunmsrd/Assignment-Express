const express = require('express');
const app = express();

const log = ((req, res, next) =>{
  console.log(`[${new Date().toISOString()} ${req.method} ${req.url}]`);
  next();
});

app.use(log);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is  running on http://localhost:${port}`);
});