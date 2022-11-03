var express = require('express');
var router = express.Router();
var axios = require('axios');


/* GET users listing. */
router.get('/:postal', function(req, res, next) {

    var config = {
        method: 'get',
        url: 'https://viacep.com.br/ws/'+ req.params.postal +'/json/',
        headers: { 'Content-Type': 'application/json' }
      };
      

    axios(config).then(function (response) {
        return res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
        return res.sendStatus(204);
    });

});

module.exports = router;
