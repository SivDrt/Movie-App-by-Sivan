require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');
const Movie = require('./models/Movie');

const app = express();

app.use(cors());
app.use(express.json());

// החיבור ל-MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB! ✅'))
    .catch(err => console.error('Connection error:', err));

// הפעלת הנתיבים
app.use('/movies', movieRoutes);

// נתיב אוטומטי ליצירת נתוני בדיקה (Seed)
app.get('/seed', async (req, res) => {
    try {
        await Movie.create({
            title: "Inception",
            genre: "Sci-Fi",
            description: "A thief who steals corporate secrets through the use of dream-sharing technology."
        });
        res.send(`Test movie added! View it at /movies`);
    } catch (err) {
        res.send("Error adding test movie: " + err.message);
    }
});

app.get('/', (req, res) => res.send('Backend is running!'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));