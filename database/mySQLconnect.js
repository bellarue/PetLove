var mysql      = require('mysql');

/*
var connection = mysql.createConnection({
//    debug: true,

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});
*/

var connection = mysql.createConnection({
//    debug: true,

    host: '127.0.0.1',
    port: 3306,
    user: 'pdo',
    password: 'Iheartsql',
    database: 'pet_love'
});

module.exports = connection;
