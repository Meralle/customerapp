var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
require('dotenv').config();
var expressValidator = require('express-validator');

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

//Global Vars
app.use((req, res, next) => {
	res.locals.errors = null;
	next();
})

//Express Vaidator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
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

	req.checkBody('first_name', 'First Name is Required').notEmpty();
	req.checkBody('last_name', 'Last Name is Required').notEmpty();
	req.checkBody('email', 'Email is Required').notEmpty();

	var errors = req.validationErrors();
	if(errors){
		console.log(errors);
		res.render('index.ejs',{
			title:'Customers',
			users:users,
			errors:errors
		});
		
	} else {
		var newUser = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email
		}

		console.log('SUCCESS');
	}
	
		console.log(newUser);
})
	app.listen(process.env.PORT, () => {
		console.log('server started on port 3000');
})