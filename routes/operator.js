var router = require('express').Router();
const auth = require('../middleware/auth')
const operator = require('../database/operator')

router.post('/create', auth,  (req,res) => {
    const { name } = req.body
    operator.create(name)
    .then((result) => {
        res.status(201).send({
            message: `operator added with ID: ${result.id}`,
        });
    })
    // catch error if the new operator wasn't added successfully to the database
    .catch((error) => {
        res.status(409).send({
            message: "Error creating operator, name already in use",
            error,
        });
    });
});

router.get('/list', auth, (req,res) => {
    operator.list()
    .then((result) => {
        res.status(201).send({
            message: `found ${result.length} operators`,
            result
        });
    })
    // catch error if the operator wasn't listed successfully from the database
    .catch((error) => {
        res.status(500).send({
            message: "Error listing operators",
            error,
        });
    });
});

router.post('/edit', auth,  (req,res) => {
    const { id, name, active } = req.body
    operator.edit(id, name, active)
    .then((result) => {
        res.status(201).send({
            message: `operator editted with ID: ${result.id}`,
        });
    })
    // catch error if the operator wasn't editted successfully to the database
    .catch((error) => {
        res.status(500).send({
            message: "Error editting operator",
            error,
        });
    });
});


module.exports = router;