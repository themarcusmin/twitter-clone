const User = require("../model/User");
const jwt = require("jsonwebtoken");

// Handle Errors related to Signup
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { username: "", fullname: "", email: "", password: "" };

    // Login error: incorrect email || incorrect password
    if (err.message === 'Incorrect Email') {
        errors.email = 'That email is not registered';
    }
    if (err.message === 'Incorrect Password') {
        errors.password = 'Incorrect Password';
    }

    // catch unique field errors (username || email) and populate json
    if (err.code === 11000) {
        if (err.message.includes("email")) {
            errors.email = "Email already exists"
        } else {
            errors.username = "Username already exists"
        }
        return errors;
    }
    // catch validation errors and populate json
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}

// Time in seconds (3 days)
const maxAge = 3 * 24 * 60 * 60;

// JWT tokens (payload, secret, options)
const createToken = (id) => {
    return jwt.sign({ id }, 'open sesame', {
        expiresIn: maxAge
    })
}

// Handle POST request on Account Signup
module.exports.signup_post = async (req, res) => {
    const { username, fullname, email, password } = req.body;

    try {
        // User.create() is a promise
        const user = await User.create({ username, fullname, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

// Handle POST request on Account Login
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { domain: 'localhost:3000', httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}