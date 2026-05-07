const express = require('express');
const axios = require('axios');
const router = express.Router();
const Movie = require('../models/Movie');
router.post('/generate', async (req, res) => {
    const { title, genre } = req.body;

    try {
        const response = await axios.post(
            "https://ai-gateway.vercel.sh/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini", // המודל המעודכן והנכון
                messages: [
                    { 
                        role: "system", 
                        content: "Provide a short, engaging movie description (max 150 characters) in English." 
                    },
                    { 
                        role: "user", 
                        content: `Title: ${title}, Genre: ${genre}` 
                    }
                ],
                stream: false
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.AI_GATEWAY_API_KEY}`
                }
            }
        );

        res.json({ description: response.data.choices[0].message.content });
    } catch (err) {
        // זה ידפיס לנו בטרמינל אם יש עוד בעיה
        console.error("AI Error Details:", err.response?.data || err.message);
        res.status(500).json({ message: "Failed to generate description" });
    }
});
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. נתיב לחיפוש סרטים
router.get('/search', async (req, res) => {
    const { name } = req.query;
    try {
        const movies = await Movie.find({ 
            title: { $regex: name, $options: 'i' } 
        });
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. נתיב להוספת סרט
router.post('/', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        description: req.body.description
    });
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 5. נתיב למחיקת סרט
router.delete('/:id', async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;