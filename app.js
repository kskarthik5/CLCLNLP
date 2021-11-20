const express = require("express");
const app = express();
const port = 8080;
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
//const Router = require("./routes")
const User = require('./model');
const Course = require('./cmodel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const material=require('./material.json');//study material json
app.use(express.json());
app.use('/', express.static(path.join(__dirname)))
app.use(bodyParser.json())
const JWT_SECRET="umomdasjdbajksdbaksbdeadfaojfadhsbflasjfnasjfksdbfjksbinsideioabso;fbjsbfasnjdfkanslasfgaysasbdjsdasdooogabooogaalkfjasklfn"
const uri = "mongodb+srv://admin:admin12345@mycluster.b5ij3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
); 

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
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}
	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username,
				name: user.name,
				sem: user.sem
			},
			JWT_SECRET
		)
		console.log(token)
		return res.json({ status: 'ok', data: token })
	}
	res.json({ status: 'error', error: 'Invalid username/password' })
})
app.post('/signup', async (req, res) => {
	const {name,username, password:plainTextPassword, sem, language} = req.body
	const password = await bcrypt.hash(plainTextPassword, 10)
	try {
		if (!username || typeof username !== 'string') {
			return res.json({ status: 'error', error: 'Invalid username' })
		}
		if (username == await User.findOne({ username }).lean()) {
			return res.json({ status: 'error', error: 'Invalid username' })
		}
		if (parseInt(sem)>8||parseInt(sem)<1) {
			return res.json({ status: 'error', error: 'Invalid Semester' })
		}
		const response = await User.create({
			name,
            username,
			password,
			sem,
			language
		})
		console.log('User created successfully.', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}
		return res.json({ status: 'ok' })

})
app.post('/cdb', async (req, res) => {
	const cid=req.body;
	const course= await Course.findOne(cid).lean();
	res.json({data:course});

});
app.post('/auth', async (req, res) => {
	const { token } = req.body;
	try {
		const user = jwt.verify(token, JWT_SECRET)
		const userid = user.username;
		console.log("auth success for user: "+userid);
	} catch (error) {
		res.json({ status: 'error'});
	}
})
app.post("/getSem", async (req, res) => {
	const { token } = req.body;
	try {
		const user = jwt.verify(token, JWT_SECRET)
		const sem = user.sem;
		res.json({data : sem});
	} catch (error) {
		console.log(error)
		res.json({ status: 'error'});
	}
})
app.get("/", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/html/loginpage.html',{root: __dirname });
})

app.get("/signup", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/html/signup.html',{root: __dirname });
})
app.get("/about", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/html/about.html',{root: __dirname });
})
app.get("/courses/:id", (req, res) => {
    const lang=req.params.id;
	const url = req.originalUrl;
    res.sendFile('/html/courses.html',{root: __dirname });
})
app.post("/courses/:id",async (req, res) => {
    const lang=req.params.id;
	const url = req.originalUrl;
	if(lang=='cpp'){
		const result=material.cpp;
    	res.json({data: result});
	}
	if(lang=='java'){
		const result=material.java;
    	res.json({data: result});
	}
	if(lang=='python'){
		const result=material.python;
    	res.json({data: result});
	}
	if(lang=='js'){
		const result=material.js;
		res.json({data: result});
	}
	if(lang=='sem3'){
		const result=material.sem3;
		res.json({data: result});
	}
	if(lang=='sem4'){
		const result=material.sem4;
		res.json({data: result});
	}
	if(lang=='sem5'){
		const result=material.sem5;
		res.json({data: result});
	}
	if(lang=='sem6'){
		const result=material.sem6;
		res.json({data: result});
	}
})
app.get("/dashboard", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/html/dashboard.html',{root: __dirname });
})
app.get("/courses/:id/player/:no", (req, res) => {
    const url = req.originalUrl;
    res.sendFile('/youtubeapi/index.html',{root: __dirname });
})
app.post("/courses/:id/player/:no",async (req, res) => {
    const lang=req.params.id;
	const num=req.params.no;
	const url = req.originalUrl;
	if(lang=='cpp'){
	const result=material.cpp;
    res.json({data: result[num]});
	}
	if(lang=='java'){
	const result=material.java;
    res.json({data: result[num]});
	}
	if(lang=='python'){
	const result=material.python;
    res.json({data: result[num]});
	}
	if(lang=='js'){
	const result=material.js;
	res.json({data: result[num]});
	}
	if(lang=='sem3'){
	const result=material.sem3;
	res.json({data: result[num]});
	}
	if(lang=='sem4'){
		const result=material.sem4;
		res.json({data: result[num]});
	}
	if(lang=='sem5'){
		const result=material.sem5;
		res.json({data: result[num]});
	}
	if(lang=='sem6'){
		const result=material.sem6;
		res.json({data: result[num]});
	}
})
app.post('/db', async (req, res) => {
	const { token } = req.body;
	console.log(token);
	try {
	
		const user =jwt.verify(token, JWT_SECRET)
		const username = user.username;
		const name=user.name;
		const sem=user.sem;
		console.log("user: "+username+" name: "+name+" SEM "+sem);
		res.json({ data : JSON.stringify({
			username,name,sem
		})});
	} catch (error) {
		res.json({ status: error});
	}
})
app.post('/increment',async (req,res) =>{
	const cid=req.body;
	const course= await Course.findOne(cid).lean();
	const idc=course.cid;
	const visits=(parseInt(course.visits)+1).toString();
	const newdata={ $set: {'visits': visits}};
	Course.findOneAndUpdate({'cid':idc},newdata, function(err, doc) {
		if (err) return console.log(500, {error: err});
	});
	res.json({status: 'ok'})
})
app.listen(process.env.PORT || port, () => {
	console.log("listening 8080...");
});

