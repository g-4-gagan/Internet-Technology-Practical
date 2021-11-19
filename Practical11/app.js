const mysql = require('mysql');
const express = require('express');
const path = require('path');
const port = 80;

const app = express();
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));


const con = mysql.createConnection({
	host: "localhost",
	user: "username",
	password: "password",
	database: 'login',
});

con.connect(function (err) {
	if (err) {
		console.log('err');
	}
	else {
		console.log("Connected!");
	}
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/static/index.html'));
})

app.post('/signUp', (req, res) => {
	const params = req.body;
	if (params.name == "" || params.signUpUsername == "" || params.signUpPassword == "" || params.phone == "") {
		res.end(`<h1>Fields are empty</h1>
        <a href="/">back to main page</a>`);
	}
	else {
		res.sendFile(path.join(__dirname, '/static/signUp.html'));
		con.query(`insert into users values ('${params.name}','${params.signUpUsername}','${params.signUpPassword}','${params.phone}')`, (err, result) => {
			if (err) {
				console.log('Error occur...');
			}
			else {
				console.log(result);
			}
		})
	}
})

app.post('/signIn', (req, res) => {
	let check = false;
	const username = req.body.signInUsername;
	const password = req.body.signInPassword;
	if (username == "" || password == "") {
		res.end(`<h1>Fields are empty</h1>
        <a href="/">back to main page</a>`);
	}
	else {
		con.query('select username,password from users', (err, result) => {
			if (err) {
				console.log('Error occur...');
			}
			else {
				result.forEach(element => {
					if (username == element.username && password == element.password) {
						check = true;
					}
				});
				if (check == true) {
					res.sendFile(path.join(__dirname, '/static/signIn.html'));
				}
				else {
					res.sendFile(path.join(__dirname, '/static/error.html'));
				}
			}
		})
	}
})

app.get('/success', (req, res) => {
	res.sendFile(path.join(__dirname, '/static/signIn.html'));
})

app.get('/error', (req, res) => {
	res.sendFile(path.join(__dirname, '/static/error.html'));
})


app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})



