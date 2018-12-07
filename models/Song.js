const mongoose = require('mongoose');

let SongSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    artists: {
      type: [String],
      required: true
    },
    year: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Song', SongSchema);
