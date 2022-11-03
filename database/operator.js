const pool = require('./_database').pool

const create = async (name) => {
    const res = await pool.query('INSERT INTO operators (name) VALUES ($1) RETURNING *', [name])
    console.log(res.rows[0])
    return res.rows[0]
}

module.exports = {
    create
}