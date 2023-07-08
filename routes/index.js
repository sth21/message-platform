const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const createError = require("http-errors");

async function getMessages(req, res, next) {
  try {
    const messages = await Message.find().sort({ timeAdded: -1 });
    console.log(messages);
    req.messages = messages;
    next();
  } catch (e) {
    console.log(e.message);
    next(createError(404));
  }
}

router.use("/", getMessages);

router.get("/", function (req, res) {
  res.render("index", { messages: req.messages });
});

router.get("/new", function (req, res) {
  res.render("new");
});

router.post("/new", async function (req, res) {
  try {
    await Message.create({
      text: req.body.text,
      user: req.body.user,
      timeAdded: Date.now(),
    });
    res.redirect("../");
  } catch (e) {
    console.log(e.message);
    res.render("new", { user: req.body.user, text: req.body.text });
  }
});

module.exports = router;
