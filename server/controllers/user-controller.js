const {User} = require('../models/User');
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express');
const {UserInputError} = require('apollo-server-express');


module.exports = {
    
    //homepage route for displaying old scores of carbon footprint 
    async homePage(req, res) {
        try {
            const userData = await User.find({})
            .select('-__v -password')
            .populate('savedScores')
            res.render ('homepage', {userData});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //signup user and return token
    async signupUser (req, res) {
        try {
          const { name, email, password } = req.body;
      
          // Check if user already exists
          let user = await User.findOne({ email });
          if (user) {
            return res.status(400).json({ msg: 'User already exists' });
          }
      
          // Create new user
          user = new User({ name, email, password });
      
          // Hash password
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
      
          // Save user to database
          await user.save();
      
          res.json({ msg: 'User registered successfully' });
        } catch (error) {
          console.log(error);
          res.status(500).json({ msg: 'Server error' });
        }
    },

    //login user and return token
    async loginUser(req, res) {
        const user = await User.findOne({ $or: [{ name: req.body.name }, { email: req.body.email }] });
        if (!user) {
            return res.status(400).json({ message: 'Something is wrong!' });
        }
        const isMatch = await user.isCorrectPassword(req.body.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Something is wrong!' });
        }
        const token = signToken(user);
        res.json({ token, user });
    },

    //logout user
    async logoutUser(req, res) {
        try{
            const user = await User.findByID(req.user._id);
            user.tokens = user.tokens.filter((token) => {
            return token.token !== req.token
        });
        await user.save();
        
        req.clearCookie('id_token');
        res.send();
        res.json({ message: 'Logged out' });
        } catch (err) {
        res.status(500).json(err);
        }
    },

    async donation (req, res) {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                name: 'Donation',
                description: 'Thank you for your donation!',
                amount: 1000,
                currency: 'usd',
                quantity: 1,
            }],
            success_url: 'http://localhost:3001/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3001/cancel',
        });
        res.json({ id: session.id });
    },
    
    async saveScore(req, res) {
        try {
            const newScore = await Score.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { savedScores: newScore._id } },
                { new: true }
            );
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    

    //update user information
    async updateUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        const {name, email, password} = req.body;

        try {
            const user = await User.findById(req.user._id);
            if (name) user.name = name;
            if (email) user.email = email;
            if (password) user.password = password;
            await user.save();
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //delete user async function
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params._id);
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

}



