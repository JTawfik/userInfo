const express = require('express')
const app = express()
const port = 2500


//import - reading .json file
const fs = require('fs')

//Import bordy parder
const bodyParser = require('body-parser')

//Import template engine
app.set('view engine', 'ejs');

//form url include
app.use(bodyParser.urlencoded({ extended: true}));

// json allows the server to read the json file
let jim = JSON.parse(fs.readFileSync('users.json', 'utf8'))





// ROUTES

// Makes public folder available
app.use(express.static(__dirname + '/public'));

// aRoutes to homepage
app.get('/index', ((req, res) => res.render('index', {data: jim})))

// aRoutes starting homepage
app.get('/', ((req, res) => res.render('index', {data: jim})))

//aRoutes to search page
app.get('/search', ((req, res) => res.render('search')))

//aRoutes to result page
app.get('/result', ((req, res) => res.render('result', {data: jim})))

//aRoutes to useradd page
app.get('/add', ((req, res) => res.render('add')))


app.post('/add', ((req, res) =>{

	// console.log(req.body)
	// request the information
	
	jim.push(req.body)

	let x = JSON.stringify(jim, null, 2);

	fs.writeFileSync('users.json', x)

	res.render('userResult', {data: jim})

}))

app.get('/userResult', ((req, res) => res.render('userResult', {data: jim})))



app.post('/search', ((req, res) => {

	//input check - if it log's correctly 
	// console.log(`checking ${req.body.search}`)

	res.render('result', {input: req.body.myusername, data: jim})
	

}))

// AJAX MATCH SEARCH ENGINE

app.post('/ajax', (req, res) => {
  let potentialMatch = []
  let userInput = req.body.myusername 
// pulling data from the search bar

  for (var i = 0; i < jim.length; i++) {
  
// Loops through the database - json file
  
  let fullName = jim[i].firstname + ' ' + jim[i].lastname;
 
// Compares the userinput with the database on different ways

  if(jim[i].firstname.toLowerCase().indexOf(userInput.toLowerCase()) > -1 || 
    jim[i].lastname.toLowerCase().indexOf(userInput.toLowerCase())  > -1 || 
    fullName.toLowerCase() === userInput.toLowerCase()) {
    
    potentialMatch.push(jim[i])
    
    }
  }
  

  res.send(potentialMatch)

})





// 
//Start Server
// 
//  message 
app.listen(port, () => console.log(`Hellow World ${port}`))

