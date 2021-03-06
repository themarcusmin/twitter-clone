const User = require("../model/User");
const { createProfile } = require("../model/Profile");
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
        user.password = undefined;
        // create redis profile: redis accepts string over number
        createProfile(user._id.toString(), username, fullname);
        // set token
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

// user login: send jwt cookie and user json
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        user.password = undefined;
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

// clear jwt cookie on user logout & destroy session
module.exports.logout_get = (req, res) => {
    req.session.destroy();
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).send('User is logged out successfully');
}

// check current user through jwt & store uid in session
module.exports.currentUser_get = (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'open sesame', async (err, decodedToken) => {
            // jwt malformed or other errors
            if (err) {
                console.log(err);
                res.status(200).json({ user: null });
            } else {
                user = await User.findById(decodedToken.id);
                user.password = undefined;
                console.log("userid: ", user._id);
                // store userid in session
                if (!req.session.userID) {
                    req.session.userID = user._id;
                }
                res.status(200).json({ user });
            }
        })
        console.log("get_currentUser");
    } else {
        res.status(200).json({ user: null });
    }
}