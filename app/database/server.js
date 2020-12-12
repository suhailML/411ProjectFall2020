const express = require('express')
require('dotenv').config();

const app = express();

app.listen(parseInt(process.env.PORT), () => console.log("we live on port "))

app.get("/", (req, res) => {
    res.send ("Hello world...");
});

