const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors")
const logger = 

const PORT  = process.env.PORT || 8000;

// Root Route

app.use("/", require("./routes/root"));

app.all("*", (req, res) => {

})