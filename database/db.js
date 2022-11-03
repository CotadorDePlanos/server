const Pool = require('pg').Pool
const axios = require('axios')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'qualificador',
  password: '1234',
  port: 5432,
})



const getPlans = (req, res) => {
    let { city, type, min_people, age_group } = req.body

    if(type === 'PF'){
        min_people = 1
    } 
    pool.query(`SELECT * FROM plans WHERE city = $1 AND type = $2 AND min_people >= $3 AND age_group = $4`, [city, type, min_people, age_group[0]], (error, results) => {
        if (error) {
            throw error
        }

        console.log("db query res",results.rows)
        var data = JSON.stringify({
          "phone": "+5511988291146",
          "message": "texto texto texto texto texto texto " + JSON.stringify(results.rows[0])
        });
        
        var config = {
          method: 'post',
          url: 'https://api.z-api.io/instances/3B3847FF8D6A20664DB6928AC4BCDF37/token/E1A47751C173CA2942BE2A7F/send-messages',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
        

        res.status(200).json(results.rows)
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM admin WHERE id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        res.status(200).json(results.rows)
    })
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


const updateUser = (req, res) => {
    const id = parseInt(req.params.id)
    const { name, email } = req.body
  
    pool.query(
      'UPDATE admin SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('UPDATE admin SET active = FALSE WHERE id = $1', [id], (error, results) => {
        if (error) {
        throw error
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
}



module.exports = {
    getPlans,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }