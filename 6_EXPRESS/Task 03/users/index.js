const express = require("express");
const router = express.Router();
const path = require("path");

const basePath = path.join(__dirname, "../templates/users/");

router.get('/newuser', (req, res) => {
    res.sendFile(`${basePath}/newuser.html`)
});

module.exports = router;