var router = require('express').Router();
const plan = require('../../database/plan')
const auth = require('../../middleware/auth')


        // console.log("db query res",results.rows)
        // var data = JSON.stringify({
        //   "phone": "+5511988291146",
        //   "message": "texto texto texto texto texto texto " + JSON.stringify(results.rows[0])
        // });
        
        // var config = {
        //   method: 'post',
        //   url: 'https://api.z-api.io/instances/3B3847FF8D6A20664DB6928AC4BCDF37/token/E1A47751C173CA2942BE2A7F/send-messages',
        //   headers: { 
        //     'Content-Type': 'application/json'
        //   },
        //   data : data
        // };
        
        // axios(config)
        // .then(function (response) {
        //   console.log(JSON.stringify(response.data));
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
        
router.post('/list',  (req,res) => {
    const { city,type,minPeople,ageGroup } = req.body
    plan.list(city,type,minPeople,ageGroup)
    .then((result) => {
        res.status(201).send({
            message: `found plans`,
            result
        });
    })
    // // catch error if the operator wasn't editted successfully to the database
    .catch((error) => {
        res.status(500).send({
            message: "Error getting plans",
            error,
        });
    });
});

module.exports = router;