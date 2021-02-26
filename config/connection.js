// Set up MySQL connection.
const mysql = require('mysql');
let connection;
if (process.env.JAWSDB_MARIA_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL)

} else {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'oldauth',
        // NOTE: Be sure to add your MySQL password here!
        password: 'Seagirt8715$',
        database: 'burger_db',
    });
}

// Make connection.
connection.connect((err) => {
    if (err) {
        console.error(`error connecting: ${err.stack}`);
        return;
    }
    console.log(`connected as id ${connection.threadId}`);
});

// Export connection for our ORM to use.
module.exports = connection;