const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const {validateUser, validateLogin} = require('../validation/validation');
router.post('/register', async (req, res) => {

    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {name, email, password} = _.pick(req.body, ['name', 'email', 'password']);

    const checkUser = await User.findOne({email: email});
    if (checkUser) return res.status(400).send('Email Already Exist,try new One');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
    });
    try {
        await user.save();
        res.send(_.pick(user, ['_id', 'email']));
    } catch (err) {
        res.status(400).send(err);
    }
});

//login
router.post('/login', async (req, res) => {
    const {error} = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {email, password} = _.pick(req.body, ['email', 'password']);
    const user = await User.findOne({email: email});
    if (!user) return res.status(400).send('Email or Password is not matched');
    //password is correct
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid Password');
    console.log(process.env.TOKEN_SECRET);
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('x-auth-token', token).send(token);
})


module.exports = router;
