const jwt = require('jsonwebtoken');

//model is optional

const auth = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");

    if(!token) {
        return res.status(403).send("Token is missing");
    }

    try {
        const decode = jwt.verify(token, process.env.MY_SECRET);
        console.log(decode);
        req.user = decode;
    } catch (error) {
        return res.status(401).send("Invalid token")
    }
    return next()
}

module.exports = auth;