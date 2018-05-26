var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// var logger = function(req, res, next){
// 	console.log('logging...');
// 	next();
// }
// app.use(logger);

//view Engine





//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Set static path
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
	res.send('hello');

});
app.listen(3000, function(){
	console.log('server started on port 3000');
})