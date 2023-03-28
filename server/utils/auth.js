const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

authMiddleware = async ({req}) => {
    const token = req.headers.authorization;
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    };

    if (!token) {
        return req;
    };

    try {
        const { data } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'You are not logged in' });
    }
    return req;
};


function signToken({ _id, username, email }) {
    const payload = { _id, username, email} ;
    const token = jwt.sign({data:payload}, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

//signup a user
async function signup(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    user.save()
        .then((user) => {
            const token = generateToken(user);
            res.json({ user, token });
        }
        )
        .catch((err) => {
            res.status(500).json(err);
        });
}

//login a user
async function login(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(user);
    res.json({ user, token });
}

module.exports = {
    signToken,
    signup,
    login
};
