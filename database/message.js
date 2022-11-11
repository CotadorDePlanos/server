const pool = require('./_database').pool

const create = async (message, type) => {
    const res = await pool.query('INSERT INTO messages (message, type) VALUES ($1, $2) RETURNING *', [message, type])
    return res.rows[0]
}

const edit = async (id, message, type) => {
    const res = await pool.query('UPDATE messages SET message = $2, type = $3 WHERE id = $1 RETURNING *', [id, message, type])
    return res.rows[0]
}

const list = async () => {
    const res = await pool.query('SELECT * FROM messages')
    return res.rows
}

const assignToOperator = async (messageId, operatorId) => {
    const res = await pool.query('INSERT INTO message_operator (message_id, operator_id) VALUES ($1, $2) RETURNING *',[messageId, operatorId])
    return res.rows[0]
}

const unsignToOperator = async (messageId, operatorId) => {
    const res = await pool.query('DELETE FROM message_operator WHERE message_id = $1 AND operator_id = $2',[messageId, operatorId])
    return res.rows[0]
}


const assignedList = async (messageId) => {
    const res = await pool.query(`
        SELECT mo.*, o.name 
        FROM message_operator AS mo 
            JOIN operators AS o 
            ON mo.operator_id = o.id 
        WHERE message_id = $1`
    ,[messageId])
    return res.rows
}

const get = async (id) => {
    const res = await pool.query('SELECT * FROM messages WHERE id = $1',[id])
    return res.rows[0]
}

const exclude = async (id) => {
    const res = await pool.query('DELETE FROM messages WHERE id = $1',[id])
    return res.rows[0]
}

module.exports = {
    create,
    list,
    assignToOperator,
    unsignToOperator,
    get,
    assignedList,
    edit,
    exclude,
}