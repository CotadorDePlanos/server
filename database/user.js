const pool = require('./_database').pool

const create = async (name, email, password) => {
    const res = await pool.query('INSERT INTO admin (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password])
    console.log(res.rows[0])
    return res.rows[0]
}

const findByEmail = async (email) => {
    const res = await pool.query('SELECT * FROM admin WHERE email =  $1', [email])
    return res.rows[0]
}

module.exports = {
    create,
    findByEmail
}