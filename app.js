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

app.use('/html', express.static(path.join(__dirname, "html")));
app.use('/css', express.static(path.join(__dirname, "css")));
app.use('/js', express.static(path.join(__dirname, "js")));
app.use('/img', express.static(path.join(__dirname, "img")));
app.use('/style.css', express.static(path.join(__dirname, "style.css")))
