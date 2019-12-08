const mongoose = require("mongoose");

const URI = 'mongodb://localhost/mern-task';


mongoose.connect(URI)
        .then(console.info("mongoose.connect => success"))
        .catch(e => console.error("mongoose.connect =>", error));

module.exports = mongoose;