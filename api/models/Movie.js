const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String
    },
    img: {
        type: String
    },
    imgJumbotron: {
        type: String
    },
    trailer: {
        type: String
    },
    video: {
        type: String
    },
    duration: {
        type: String
    },
    year: {
        type: String
    },
    category: {
        type: String
    },
    limit: {
        type: String
    },
    isSeries: {
        type: Boolean,
        default: false
    },
    comingsoon: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Movie", MovieSchema);