const express = require('express');
const router = express.Router();

//Item Model
const User = require('../../models/User');

// @route GET api/users
//@desc GET All users
//@acess Public
router.get('/', (req, res) => {
    User.find()
        .sort({
            username: -1
        })
        .then(users => res.json(users));
});

// @route POST api/users
//@desc Create A User
//@acess Public
router.post('/', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });

    newUser.save().then(user => res.json(user));
});

// @route DELETE api/items/:id
//@desc Delete A User
//@acess Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({
            sucess: true
        })))
        .catch(err => res.status(404).json({
            sucess: false
        }));
});

module.exports = router;