var router = require('express').Router();
const auth = require('../middleware/auth')
const message = require('../database/message')

router.post('/create', auth,  (req,res) => {
    const { data, type } = req.body
    message.create(data, type)
    .then((result) => {
        res.status(201).send({
            message: `message added with ID: ${result.id}`,
            result
        });
    })
    // catch error if the new message wasn't added successfully to the database
    .catch((error) => {
        res.status(500).send({
            message: "Error creating message",
            error,
        });
    });
});

router.post('/edit', auth,  (req,res) => {
    const {  id, data, type} = req.body
    message.edit(id, data, type)
    .then((result) => {
        res.status(201).send({
            message: `message edited with ID: ${result.id}`,
        });
    })
    // catch error if the new message wasn't edited successfully to the database
    .catch((error) => {
        res.status(500).send({
            message: "Error editting message",
            error,
        });
    });
});

router.get('/list', auth, (req,res) => {
    message.list()
    .then((result) => {
        res.status(201).send({
            message: `found ${result.length} messages`,
            result
        });
    })
    // catch error if the message wasn't listed successfully from the database
    .catch((error) => {
        res.status(500).send({
            message: "Error listing messages",
            error,
        });
    });
});

router.post('/assign', auth, (req,res) => {
    const { messageId, operatorId } = req.body
    message.assignToOperator(messageId, operatorId)
    .then((result) => {
        res.status(201).send({
            message: `assign message`,
            result
        });
    })
    // catch error if the message wasn't assign successfully to the operator
    .catch((error) => {
        res.status(500).send({
            message: "Error assign message",
            error,
        });
    });
});

router.post('/unsign', auth, (req,res) => {
    console.log(req.body)
    const { messageId, operatorId } = req.body
    message.unsignToOperator(messageId, operatorId)
    .then((result) => {
        res.status(201).send({
            message: `unsigned message`,
            result
        });
    })
    // catch error if the message wasn't assign successfully to the operator
    .catch((error) => {
        res.status(500).send({
            message: "Error unsign message",
            error,
        });
    });
});


router.get('/get/:id', function(req, res) {
    message.get(req.params.id)
    .then((result) => {
        res.status(201).send({
            message: `Get message ${result.id}`,
            result
        });
    })
    // catch error if the message wasn't getted successfully from the database
    .catch((error) => {
        res.status(404).send({
            message: "Message Not Found",
            error,
        });
    });
});

router.get('/assigned/:id', function(req, res) {
    message.assignedList(req.params.id)
    .then((result) => {
        res.status(201).send({
            message: `Get Operators assigned to message ${result.id}`,
            result
        });
    })
    // catch error if the message wasn't getted successfully from the database
    .catch((error) => {
        res.status(500).send({
            message: "Error getting Operators assigned to message",
            error,
        });
    });
});

router.delete('/exclude/:id', function(req, res) {
    message.exclude(req.params.id)
    .then((result) => {
        res.status(201).send({
            message: `Deleted message with id: ${req.params.id}`,
            result
        });
    })
    // catch error if the message wasn't getted successfully from the database
    .catch((error) => {
        res.status(500).send({
            message: "Error deleting message",
            error,
        });
    });
});



module.exports = router;