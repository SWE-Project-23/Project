const express = require("express");
const router = express.Router();
const pages = require("../Controllers/Pages");
const questions = require("../Controllers/ctrlQuestions");

router.get("/", pages.root.basma);
router.get("/aboutus", pages.root.about);
router.get("/facilities", pages.root.facilities);
router.get("/privacyPolicy", pages.root.privacy);
router.get("/rooms", pages.root.rooms);
router.post("/askQuestion", questions.askQuestion);

module.exports = router;
