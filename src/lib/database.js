const mysql = require('mysql');
const { promisify } = require('util');
const KEYS = require('./keys');

const connection = mysql.createConnection(KEYS);

connection.connect();

connection.query = promisify(connection.query);

module.exports = connection;
