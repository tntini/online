
var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb"
});

con.connect(function(err) {
   if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE clients (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(200), name VARCHAR(200),surname VARCHAR(200), IdNumber VARCHAR(13), telephoneNumberWork VARCHAR(13), mobileNumber VARCHAR(13), email VARCHAR(200), postalAddress1 VARCHAR(200), postalAddress2 VARCHAR(200), postalAddress3 VARCHAR(200), postalCode VARCHAR(5), password VARCHAR(20), passwordR VARCHAR(20), checkBox VARCHAR(10))";
  //var sql = "CREATE TABLE contactUsComments (id INT AUTO_INCREMENT PRIMARY KEY, myEmail VARCHAR(200), subject VARCHAR(200), comments VARCHAR(400))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tables created");
  });
  // con.query("SELECT * FROM clients", function (err, result) {
  //   if (err) throw err;
  //   console.log("Result: " + result);
  // });

});