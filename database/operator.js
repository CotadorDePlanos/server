const pool = require('./_database').pool

const create = async (name) => {
    const res = await pool.query('INSERT INTO operators (name) VALUES ($1) RETURNING *', [name])
    return res.rows[0]
}

const list = async () => {
    const res = await pool.query('SELECT * FROM operators ORDER BY name ASC')
    return res.rows
}

const edit = async (id,name,active) => {
    const res = await pool.query('UPDATE operators SET active = $3, name = $2 WHERE id = $1 RETURNING *',    [id,name,active])
    return res.rows[0]
}

module.exports = {
    create,
    list,
    edit
}