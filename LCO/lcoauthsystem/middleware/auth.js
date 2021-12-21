const jwt = require('jsonwebtoken');

// model is optional

const auth = (req, res, next) => {
    console.log(req.cookies);
    const token = 
    req.cookies.token || 
    req.body.token ||
    req.header('Authorization').replace('Bearer ', '');

    if(!token){
        return res.status(403).send('Access denied. No token provided.');
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decode);
        req.user = decode;
        //bring in the information from the DB as well
    } catch(error) {
        return res.status(401).send('Invalid token.');
    }
    return next();
}

module.exports = auth;