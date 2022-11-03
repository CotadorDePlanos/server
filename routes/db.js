var express = require('express');
var router = express.Router();
const db = require('../database/db')

async function connect() {
    if (global.connection)
        return global.connection.connect();
 
    const { Pool } = require('pg');
    const pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'qualificador',
        password: '1234',
        port: 5432,
    })
 
    // Test connenction
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");
 
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();
 
    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}
  
// Routes
router.get('/', db.getUserById);
router.post('/quotation', db.getPlans);

module.exports = {
    router,
    connect
};