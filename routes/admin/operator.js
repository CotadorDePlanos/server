var router = require('express').Router();
const auth = require('../../middleware/auth')
const operator = require('../../database/operator')

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
        res.status(500).send({
            message: "Error creating operator",
            error,
        });
    });
});

module.exports = router;