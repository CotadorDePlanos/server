const db = require('./../routes/db')
const pool = db.pool


//Cliente.js
module.exports = class Operator {
    //propriedades e funções da classe aqui
    constructor(nome) {
        this.nome = nome;
    }
}


const createUser = (req, res) => {
    const { name, email, password } = req.body
  
    pool.query('INSERT INTO admin (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}
