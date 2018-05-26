var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');

var app = express();

// var logger = function(req, res, next){
// 	console.log('logging...');
// 	next();
// }
// app.use(logger);

//view Engine
app.set('view engine', 'esj');
app.set('views', path.join(__dirname, 'views'));





//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Set static path
app.use(express.static(path.join(__dirname, 'public')));
var users = [
	{	
		id:1,
		first_name:'John',
		last_name:'Doe',
		email:'john@gmail.com'
	},
	{	
		id:2,
		first_name:'bob',
		last_name:'smith',
		email:'bob@gmail.com'
	},
	{	
		id:3,
		first_name:'jill',
		last_name:'jackson',
		email:'jill@gmail.com'
	}
]

app.get('/', (req, res) => {
	res.render('index.ejs',{
		title:'Customers',
		users:users
	});

});

app.post('/users/add', (req, res) => {
	var newUser = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email
	}
	console.log(newUser);
})
app.listen(3000, function(){
	console.log('server started on port 3000');
})