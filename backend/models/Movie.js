const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 20 },
    genre: { type: String, required: true },
    description: { type: String, required: true, maxlength: 200 }
});

module.exports = mongoose.model('Movie', movieSchema);