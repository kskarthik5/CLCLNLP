const express = require("express");
const app = express();
const port = 8080;
const path = require('path');

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.listen(process.env.PORT || port, () => {
	console.log("listening 8080...");
});