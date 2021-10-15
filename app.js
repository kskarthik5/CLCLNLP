const express = require("express");
const app = express();
const port = 8080;
const path = require('path');

app.get("/", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('html/homepage.html',{root: __dirname });
})
app.get("/login", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/html/loginpage.html',{root: __dirname });
})
app.get("/dashboard", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('html/dashboard.html',{root: __dirname });
})

app.listen(process.env.PORT || port, () => {
	console.log("listening 8080...");
});

