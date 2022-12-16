const { Pool } = require('pg');
require('dotenv').config()

const config = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    max: 4,
    idleTimeoutMillis: 30000,
}

const pool = new Pool(config)
  .on('error', err => {
    console.error('idle client error', err.message, err.stack);
  });

exports.pool = pool;