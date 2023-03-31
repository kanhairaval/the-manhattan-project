const jwt = require('jsonwebtoken');


module.exports = {
authMiddleware: function ({req, res, next}) {
    let token = req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }
    if (!token) {
        return res.status(400).json({ message: 'You have no token!' });
    }
    try {
        const { data } = jwt.verify(token, process.env.JWT_SECRET, { maxAge: '1h' });
        req.user = data;
    }
    catch {
        console.log('Invalid token');
        return res.status(400).json({ message: 'Invalid token' });
    }
    next();
    },

    signToken: function (req, res, next) {
        const payload = {username, email, _id};
        const token = jwt.sign({data: payload}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    },

};

