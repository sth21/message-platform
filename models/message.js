const mongoose = require("mongoose");
const moment = require("moment");

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true, maxLength: 100 },
  user: { type: String, required: true },
  timeAdded: { type: Date, required: true },
});

MessageSchema.virtual("time").get(function () {
  return moment(this.timeAdded).format("MMMM Do YYYY, h:mm a");
});

module.exports = mongoose.model("Message", MessageSchema);
