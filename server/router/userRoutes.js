const express = require("express");
const { signup, login } = require("../controller/userController");
const { authenticateToken } = require("../middleware/middleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
