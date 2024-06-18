const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let reviews = [];

function submitReview(req, res) {
    const { bookTitle, content } = req.body;
    
    if (!bookTitle || !content) {
        return res.status(400).json({ error: 'Book title and content are required' });
    }

    const newReview = {
        bookTitle,
        content,
        date: new Date().toISOString() 
    };

    reviews.push(newReview);

    res.status(201).json({ message: 'Review submitted successfully', review: newReview });
}

app.post('/reviews', submitReview);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
