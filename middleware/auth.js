const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        // get the token from the authorization header
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        //check if the token matches the supposed origin
        const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
        // retrieve the user details of the logged in user
        const user = await decodedToken;
        // pass the the user down to the endpoints here
        req.user = user;
        // pass down functionality to the endpoint
        next();
        
    } catch (error) {
        res.status(401).json({
        error: "Not Authorized!",
        });
    }
};