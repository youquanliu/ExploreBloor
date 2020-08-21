const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require("passport");

module.exports = {
    index,
    login,
    register,
    postLogin,
    postRegister,
    // addFact,
    // delFact
};

function index(req, res, next) {
    console.log(req.query)
    // Make the query object to use with Student.find based up
    // the user has submitted the search form or now
    let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
    // Default to sorting by name
    let sortKey = req.query.sort || 'name';
    User.find(modelQuery)
        .sort(sortKey).exec(function (err, users) {
            if (err) return next(err);
            // Passing search values, name & sortKey, for use in the EJS
            res.render('user/index', {
                users,
                name: req.query.name,
                sortKey,
                user: req.user
                //If nobody is logged in, user will be undefined.
            });
        });
}

function login(req, res) {
    res.render('user/login');
}

function postLogin(req, res, next) {
    passport.authenticate("local",
        {
            successRedirect: "/main",
            failureRedirect: "/user/login",
            failureFlash: true
        })(req, res, next);
}

function register(req, res) {
    res.render('user/register');
}

function postRegister(req, res) {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    if (!name || !email || !password || !password2) errors.push({ msg: 'Please fill in all fields' });
    if (password2 !== password) errors.push({ msg: 'Passwords do not match' });
    if (password.length < 4) errors.push({ msg: 'Password should be at least 4 characters' });
    if (errors.length > 0) {
        res.render('user/register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        //validation pass
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    //user exist
                    errors.push({ msg: 'Email is already registed' });
                    res.render('user/register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name: name, email: email, password: password
                    });
                    //Hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //set password to hashed
                            newUser.password = hash;
                            //save user
                            newUser.save(function (err) {
                                if (err) console.log(err);
                                req.flash('success', 'You are now registed nad can log in');
                                res.redirect('/user/login');
                            })
                        })
                    })
                }
            })
    }
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //res.redirect('/auth/google');
        res.redirect('/user/login');
    }
}
// function addFact(req, res, next) {
//     req.user.facts.push(req.body);
//     req.user.save(function (err) {
//         res.redirect('/user');
//     });
// }


