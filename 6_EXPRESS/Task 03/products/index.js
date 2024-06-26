const express = require("express");
const router = express.Router();
const path = require("path");

const basePath = path.join(__dirname, "../templates/products/");

router.get('/newproduct', (req, res) => {
    res.sendFile(`${basePath}/newproduct.html`)
});

module.exports = router;