const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.ejs');
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.post('/login', async (req, res) => {
    try{
        let email = req.body.name
        let password = req.body.password

        const user = await User.findById(email);
        if (!user){
            return res.send("No such user found!");
        } else {
            let validPassword = await bcrypt.compareSync(password, user.password)
            if (validPassword){
                return res.send("email or password is wrong");
            }
        }

        res.redirect( 'login' )

    }
    catch(err){
        console.log(err);
        return res.status(400).send("Something went wrong");
    }
});

router.get('/register', (req, res) => {
    res.render('register.ejs');
});

router.post('/register', async (req, res) => {
    try {
        // const name = req.body.name;
        // const email = req.body.email;
        // const password = req.body.password;

        // const hashedPassword = await bcrypt.hash(password, 10);

        // // Create a new user instance using the User model and an object with the properties
        // const newUser = new User({ name, email, password: hashedPassword });

        // // Save the new user to the database
        // await newUser.save();

        const successMessage = req.query.successMessage || null;
        res.render('login', { successMessage });

    } catch (err) {
        console.error(err);
        return res.status(500).send('Error registering user: ' + err.message);
    }
});

module.exports = router;
