//|------------------------------------------------------------------------------------|
//|                                                                                    |
//|                                                                                    |
//|                                     CREATOR                                        |
//|                                                                                    |
//|                                Vecto. (Tim Hauke)                                  |
//|                                                                                    |
//|                                                                                    |
//|                                    FRAMEWORKS                                      |
//|                                                                                    |
//|                                    Express.js                                      |
//|                                    BodyParser                                      |
//|                                      Bcrypt                                        |
//|                                   JSONWebToken                                     |
//|                                                                                    |
//|                                                                                    |
//|                                Copyright (c) 2024                                  |
//|                                                                                    |
//|                                                                                    |
//|------------------------------------------------------------------------------------|

const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('../utilities/jwt.utilities');
const BlacklistedToken = require('../models/blacklistedToken.model');
const { sendConfirmationEmail } = require('../services/emailSending.service');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Benutzer existiert bereits' });
        }

        user = new User({ username, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const tokenPayload = { user: { id: user.id } };
        const confirmationToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '24h' });

        const confirmationLink = `${process.env.BASE_URL}/api/auth/confirm-email/${confirmationToken}`;

        await sendConfirmationEmail(user.email, confirmationLink);

        res.json({ msg: 'Registrierung erfolgreich. Bitte bestätige deine E-Mail-Adresse' });
    } catch (error) {
        console.error('Fehler bei der Registrierung:', error);
        res.status(500).send('Fehler bei der Registrierung');
    }
};

exports.confirmEmail = async (req, res) => {
    const confirmationToken = req.params.token;

    try {
        const decoded = jwt.verify(confirmationToken, process.env.JWT_SECRET);
        const userId = decoded.user.id;
        
        await User.findByIdAndUpdate(userId, { confirmed: true });

        res.json({ msg: 'E-Mail-Adresse erfolgreich bestätigt' });
    } catch (error) {
        console.error('Fehler bei der Bestätigung der E-Mail-Adresse:', error);
        res.status(500).send('Fehler bei der Bestätigung der E-Mail-Adresse');
    }
};

exports.login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });

        if (!user) {
            return res.status(400).send('Invalid username or email');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send('Invalid password');
        }

        const token = jwt.sign({ id: user._id });
        res.json({ token });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
};


exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const blacklistedToken = new BlacklistedToken({ token });
        await blacklistedToken.save();

        res.status(200).send('Logout successful');
    } catch (error) {
        res.status(500).send('Error logging out');
    }
};

//|------------------------------------------------------------------------------------|
//|                                                                                    |
//|                                                                                    |
//|                                     CREATOR                                        |
//|                                                                                    |
//|                                Vecto. (Tim Hauke)                                  |
//|                                                                                    |
//|                                                                                    |
//|                                    FRAMEWORKS                                      |
//|                                                                                    |
//|                                    Express.js                                      |
//|                                    BodyParser                                      |
//|                                      Bcrypt                                        |
//|                                   JSONWebToken                                     |
//|                                                                                    |
//|                                                                                    |
//|                                Copyright (c) 2024                                  |
//|                                                                                    |
//|                                                                                    |
//|------------------------------------------------------------------------------------|