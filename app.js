const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.sendFile("./index.html");
})

app.listen(process.env.PORT || port, () => {
	console.log("listening 8080...");
});