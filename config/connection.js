// Set up MySQL connection.

// Require dependencies
var mysql = require("mysql");

// Create MySQL connection object
var connection;

// Connect to either JawsDB on Heroku or local DB
if (process.env.JAWSDB_URL) {
	// JawsDB on Heroku
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	// local DB on localhost
	connection = mysql.createConnection({
		port: 8889,
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'barbershop'
	})
};

// Make the connection to MySQL
connection.connect(function(err) {
  if (err) {
    console.error('ERROR: MySQL connection error -- ' + err.stack + '\n\n');
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId + '\n\n');
});

// Export connection for ORM use
module.exports = connection;