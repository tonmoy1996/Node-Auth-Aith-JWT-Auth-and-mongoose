const router = require('express').Router();
const User = require('../models/user');
const auth = require('../config/verifyToken');
const _ = require('lodash');
router.get('/', auth, async (req, res) => {
    const user = await User.findOne({_id: req.user._id})
    res.send({
        posts: [
            {
                title: "i love you",
                user: _.pick(user, ['name', 'email'])
            },

        ]
    });
})
module.exports = router;