// setting up usable express variable
const express = require("express");
const app = express();

// setting up morgan for better HTTP logging
/* remember this is middleware that must be installed */
const morgan = require("morgan");
app.use(morgan("dev"));

// setting up validator dependency to use later
const validator = require("validator");

// creating variable for port (for easier testing)
const port = 3000;

// collectibles object to be used in "/collectibles" path
const collectibles = [
	{ name: "shiny ball", price: 5.95 },
	{ name: "autographed picture of a dog", price: 10 },
	{ name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

// setting shoes object for query paramter practice later
const shoes = [
	{ name: "Birkenstocks", price: 50, type: "sandal" },
	{ name: "Air Jordans", price: 500, type: "sneaker" },
	{ name: "Air Mahomeses", price: 501, type: "sneaker" },
	{ name: "Utility Boots", price: 20, type: "boot" },
	{ name: "Velcro Sandals", price: 15, type: "sandal" },
	{ name: "Jet Boots", price: 1000, type: "boot" },
	{ name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

// syntax for below line is exp var, HTTP, route, function
app.get("/", (req, res) => {
	res.send("Welcome to the root page of this site!");
});

// setting up a greeting page with req.params
app.get("/greeting/:userName", (req, res) => {
	res.send(
		`This is custom greeting page using "req.params.userName" in server.js - meaning you don't need to define the varaible in the URL, ${req.params.userName}!`
	);
});

// setting up a greeting page with req.query
app.get("/greeting", (req, res) => {
	const userName = req.query.userName;
	res.send(
		`This is custom greeting page using "req.query.userName" in URL path, ${userName}!`
	);
});

// setting up a die roller page
app.get("/roll/:sides", (req, res) => {
	if (validator.isNumeric(req.params.sides)) {
		res.send(`${Math.ceil(Math.random() * req.params.sides)}`);
	} else {
		res.send(`Must specify a number in URL path for "roll" page.`);
	}
});

// creating a route for "collectibles" path
app.get("/collectibles", (req, res) => {
	res.send(
		`This is the root path for collectibles pages! It could also be a show page, if desired.`
	);
});

// creating subroutes for "collectibles" path
app.get("/collectibles/:indexId", (req, res) => {
	if (req.params.indexId >= collectibles.length) {
		res.send(`This item is not yet in stock. Check back soon!`);
	} else {
		const item = collectibles[req.params.indexId];
		res.send(`The ${item.name} costs $${item.price} USD!`);
	}
});

// test page for in-URL query parameters
app.get("/hello", (req, res) => {
	res.send(
		`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`
	);
});

// creates listener for HTTP requests (goes at bottom)
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
