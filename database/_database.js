const colors = require('colors');
const { Pool } = require('pg');

const [dbName, maxCon] =
  process.env.DOLPHIN_TEST ?
    ['qualificador', 1] :
    ['qualificador', 4];

const config = {
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    port: 5432,
    database: dbName,
    max: maxCon,
    idleTimeoutMillis: 30000,
}

const pool = new Pool(config)
  .on('error', err => {
    console.error('idle client error', err.message, err.stack);
  });

async function initDb() {
  await pool.query('SELECT $1::int AS number', [1]);

  console.log(colors.grey(
    `Postgres is online using ${client.database} as user ${client.user}\n` +
    `and is listening on ${client.host}`));
}

exports.pool = pool;
exports.initDb = initDb;