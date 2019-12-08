const mongoose = require("mongoose");
const { Schema } = mongoose;

const objTaskSchema = {
  title: { type: String, required: true },
  description: { type: String, required: true }
}
module.exports =  mongoose.model("Task",objTaskSchema);