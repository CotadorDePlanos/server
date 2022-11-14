var router = require('express').Router();
const user = require('../database/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post('/register', (req,res) => {
    const { name, email, password } = req.body
    console.log(name,email,password)
    bcrypt.hash(password, 10)
    .then((hashedPassword) => {
        // save the new user
        user.create(name,email,hashedPassword)
            // return success if the new user is added to the database successfully
            .then((result) => {
                res.status(201).send({
                    message: `User added with ID: ${result.id}`,
                });
            })
            // catch error if the new user wasn't added successfully to the database
            .catch((error) => {
                res.status(409).send({
                    message: "Error creating user, email already in use",
                    error,
            });
        });
    })
    // catch error if the password hash isn't successful
    .catch((error) => {
        res.status(500).send({
            message: "Password was not hashed successfully",
            error,
        });
    });
});


// login endpoint
router.post("/login", (req, res) => {
    const { email, password } = req.body
    // check if email exists
    user.findByEmail(email)
    // if email exists
    .then((user) => {
    // compare the password entered and the hashed password found
        bcrypt.compare(password, user.password)
        // if the passwords match
        .then((passwordCheck) => {
            // check if password matches
            if(!passwordCheck) {
                return res.status(400).send({
                    message: "Credentials does not match",
            });
            }

            // create JWT token
            const token = jwt.sign(
                { email },
                "RANDOM-TOKEN",
                {
                expiresIn: "24h",
                }
            );

            //   return success res
            res.status(200).send({
                message: "Login Successful",
                email: user.email,
                token,
            });
        })
    })
    // catch error if email does not exist
    .catch((error) => {
        res.status(400).send({
            message: "Credentials does not match",
            error,
        });
    });
});

module.exports = router;