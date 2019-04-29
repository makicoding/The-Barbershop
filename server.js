// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
// require("./routes/post-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({
  // force: true 
}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});



// ----------------------------------------------------------------------------------------------------
// INSTRUCTIONS AND ADDITIONAL NOTES

/*
.gitignore file

For when uploading folder to a GitHub repository.

Create .gitignore file at start of project and include inside it the following lines of code:
node_modules
.DS_Store

It's good practice to always include node_modules in the .gitignore file because this folder can get huge.
We have coded to "require" npm install of any packages necessary for this node app, so if someone clones this repo from
GitHub, all they have to do is npm install any necessary packages for the app to work. Therefore the node_modules folder 
doesn't need to be uploaded to GitHub.



--------------------
RUN SQL FILE TO CREATE DATABASE

From the Mac Finder, open the schema.sql file in Sequel Pro.

From the middle right of the page where there is a drop down menu that says "Run Previous",
select "Run All Queries" from the drop down list. This will create the database.



--------------------
REFRESH DATABASE CONTENT

To refresh the database content in Sequel Pro, press the "refresh table contents" button at the bottom
of the "Content section" of the databse.  You could also press on your keyboard:
// command r



--------------------
COMMAND LINE commands

Before running server.js file in node, install package dependencies listed in package.json
by typing either of the following into the command line:
// npm i            // this is just a shorthand version of npm install
// npm install



To run node for server.js, type into the command line:
// node server             // No need to type in .js, although node server.js will work too.



If you need to exit at any point, type into the command line:
// control c



--------------------
NODEMON

Install (just once on your computer):
npm install -g nodemon      // -g will install to the computer's root directory (system file) so it will be available globally outside the folder you are working on (i.e. from any folder on your computer)

By using nodemon any changes you make to the server JS file will update on the server without having to restart the server every time.

Run nodemon by typing into terminal:
nodemon server.js (or nodemon server)



--------------------
IN THE BROWSER

After running either node server or nodemon server, go to the Chrome Browser and type in:
http://localhost:8080
to connect to port 8080



*/