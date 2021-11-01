const express = require("express");
const app = express();
const port = 8080;
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
//const Router = require("./routes")

app.use(express.json());
app.use('/', express.static(path.join(__dirname)))
app.use(bodyParser.json())

const uri = "mongodb+srv://admin:admin12345@mycluster.b5ij3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
); 
const User = require('./model');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.get("/", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/html/loginpage.html',{root: __dirname });
})

app.get("/signup", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/html/signup.html',{root: __dirname });
})
app.get("/dashboard", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/html/dashboard.html',{root: __dirname });
})
app.post('/', async (req, res) => {
	const { username, password } = req.body
    console
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (password === user.password) {
		// the username, password combination is successful

		return res.json({ status: 'ok' })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})
app.post('/signup', async (req, res) => {
	const {name, username, password} = req.body

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}
	if (username == await User.findOne({ username }).lean()) {
		return res.json({ status: 'error', error: 'Invalid username' })
	}


	try {
		const response = await User.create({
			name,
            username,
			password
		})
		console.log('User created successfully.', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})
app.listen(process.env.PORT || port, () => {
	console.log("listening 8080...");
});

