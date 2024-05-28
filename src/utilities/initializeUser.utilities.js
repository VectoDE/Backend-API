const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

async function initializeAdminUser() {
    try {
        const adminUser = await User.findOne({ role: 'admin' });

        if (!adminUser) {
            const username = 'admin';
            const email = 'admin@admin.com';
            const password = 'adminpassword';

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                role: 'admin'
            });

            await newUser.save();
            console.log('Admin-Benutzer erfolgreich erstellt');
        } else {
            console.log('Ein Admin-Benutzer existiert bereits');
        }
    } catch (error) {
        console.error('Fehler beim Initialisieren des Admin-Benutzers:', error);
    }
}

module.exports = { initializeAdminUser };
