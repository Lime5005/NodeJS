const mysql = require('mysql2')
    // create multiple connections by pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_complete',
    password: '' // Change the password
})

// Promise to handle asynchronous tasks, instead of callback, use `then`.
module.exports = pool.promise()