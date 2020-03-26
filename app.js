/**
 * Module dependencies.
 */
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser')
var csrf = require('csurf')
var bodyParser = require("body-parser");
var app = express();
var engines = require('consolidate');

//var request = require('request');


app.set('port', process.env.PORT || 3001);
//app.set('views', path.join(__dirname, 'views'));
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))


app.use(bodyParser.json())
//app.use(require('connect').bodyParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use('/', router);
app.use(express.json());
app.use(express.static('views'));
//app.use(express.static(path.join(__dirname, "views")));

app.get('/register', function(req, res) {
  res.sendFile('./register.html');
});

app.get('/', (req, res) => {
  res.render('signup')
})

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb"
});

con.connect(function(err) {
   if (err) throw err;
  console.log("Connected!");
  
  con.query("SELECT * FROM clients", function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });

app.post('/signup', (req, res) => {
    console.log(req.body);
     id = null;
     username = req.body.username;
     name = req.body.name;
     surname = req.body.surname;
     idNumber = req.body.idNumber;
     telephoneNumberWork = req.body.telephoneNumberWork;
     mobileNumber = req.body.mobileNumber;
     email = req.body.email;
     postalAddress1 = req.body.postalAddress1;
     postalAddress2 = req.body.postalAddress2;
     postalAddress3 = req.body.postalAddress3;
     postalCode = req.body.postalCode;
     password = req.body.password;
     passwordR = req.body.passwordR;
     checkBox = req.body.password;

    var database = "INSERT INTO clients (id, userName, name, surname, idNumber, telephoneNumberWork, mobileNumber, email, postalAddress1, postalAddress2, postalAddress3, postalCode, password, passwordR, checkBox) VALUES (NULL, '"+username+"', '"+name+"', '"+surname+"', '"+idNumber+"', '"+telephoneNumberWork+"', '"+mobileNumber+"', '"+email+"', '"+postalAddress1+"', '"+postalAddress2+"', '"+postalAddress3+"', '"+postalCode+"', '"+password+"', '"+passwordR+"', '"+checkBox+"')";

  con.query(database, function (err, result) { 
    if (err) throw err; 
    console.log("Recorded Successfully");          
}); 
    res.redirect('login.html');
    //res.send(username + ' Submitted Successfully!');
  res.end();
})

app.get('/signup', (req, res) => {
  
})

app.get('/', function(req, res){
  res.render('auth');
});

app.post('/auth', function(req, res) {
	username = req.body.username;
  password = req.body.password;
	if (username && password != null) {
    var data = "SELECT * FROM clients WHERE username = '"+username+"' and password = '"+password+"'";
		con.query(data, function(error, results, fields) {
			if (results) {
				//request.session.loggedin = true;
        req.session.username = username;
        req.session.password = password;
        res.send(username + ' Login Successfully!');
        console.log(username + " " + password);
				//response.redirect('/home');
			} else {
        console.log(username + " " + password);
        res.send('Incorrect Username / Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

app.listen(app.get('port'), function(){
  console.log('server is listening to ' + app.get('port'));
});
});