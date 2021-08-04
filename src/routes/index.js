const express = require('express'); 
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const router = express.Router();  

router.get("/", (req, res) => res.send("Welcome to clean-blogAPI.")); 

// User Routes
router.use(userRoutes)

// Ride Routes
router.use(postRoutes);

// Request Routes
router.use(commentRoutes); 

module.exports = router;
