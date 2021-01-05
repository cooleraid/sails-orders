/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwt = require('jsonwebtoken')
const { expiry, secret } = sails.config.settings.jwt;
module.exports = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email) return res.status(400).json({ status: "error", message: "Email is required.", data: false });
            if (!password) return res.status(400).json({ status: "error", message: "Password is required.", data: false });
            const emailExists = await User.findOne({ email });
            if (emailExists) return res.status(400).json({ status: "error", message: "Email is already registered.", data: false });
            const user = await User.create({ email, password }).fetch();
            return res.status(201).json({ status: "success", message: "user created successfully.", data: user });
        } catch (err) {
            return res.serverError(err);
        }
    },

    login: async (req, res) => {
        try {
            let { email, password } = req.body;
            password = String(password)
            if (!email) return res.status(400).json({ status: "error", message: "Email is required.", data: false });
            if (!password) return res.status(400).json({ status: "error", message: "Password is required.", data: false });
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ status: "error", message: "User not found.", data: false });
            if (!User.verifyPassword(user, password)) return res.status(401).json({ status: "error", message: "Invalid Password.", data: false });

            const token = jwt.sign({ id: user.id }, secret, { expiresIn: expiry })
            return res.status(200).json({ status: "success", message: "login successful.", data: { user, token } });
        } catch (err) {
            return res.serverError(err);
        }
    },
};

