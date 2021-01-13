const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your username"],
        unique: true,
        minlength: 6,
    },
    fullname: {
        type: String,
        required: [true, "Please enter your full name"],
        minlength: 6,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: [6, "Minimum password length is 6 characters"],
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// fire a function before doc is saved to DB
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email')
}

const User = mongoose.model("user", userSchema)

module.exports = User;