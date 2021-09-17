const express = require("express")
const mongoose = require('mongoose');
const app = express()


mongoose
    .connect("mongodb://josep.andreu%40e-campus.uab.cat:celdoni@192.168.144.2:27017/?authSource=admin")
    .then(() => console.log("succesfully connected to DB"))
    .catch((e) => console.log(e));

app.get("/", (req, res) => {
    res.send("<h2>Hi There!!!</h2>");
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`))