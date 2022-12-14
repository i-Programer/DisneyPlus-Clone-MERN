const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

// Create Movie
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch {
            res.status(500).json(err);
        }
    } else {
        res.status(500).json(err);
    }
})

// Get All Movie
router.get("/", verify, async (req, res) => {
    if(req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse());
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
})

// Get Spesific Movie
router.get("/find/:id", verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch(err){
        res.status(500).json(err);
    }
})

// Get Count Movie
router.get("/count", verify, async (req, res) => {
    if(req.user.isAdmin){
        try {
            const count = await Movie.countDocuments();
            res.status(200).json(count);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed to do this!");
    }
})

// Delete Movie
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("The movie has been deleted...");
        } catch {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed");
    }
});

// Update Movie
router.put("/:id", verify, async (req, res) => {
    if(req.user.isAdmin){
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id, {
                    $set: req.body,
                }, {
                    new: true
                }
            )
            res.status(200).json(updatedMovie);
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed!")
    }
})

module.exports = router;