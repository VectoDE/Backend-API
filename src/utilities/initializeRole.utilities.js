const Role = require('../models/role.model');

async function initializeRoles() {
    try {
        const defaultRoles = [
            { name: 'user', description: 'Default User' },
            { name: 'premium', description: 'Premium Member' },
            { name: 'vip', description: 'VIP Member' },
            { name: 'affiliate', description: 'Affiliate Partner' },
            { name: 'influencer', description: 'Influencer' },
            { name: 'partner', description: 'Partnership' },
            { name: 'editor', description: 'Editor' },
            { name: 'content-creator', description: 'Content Creator' },
            { name: 'marketing', description: 'Marketing' },
            { name: 'developer', description: 'Developer' },
            { name: 'it', description: 'IT' },
            { name: 'moderator', description: 'Moderator' },
            { name: 'admin', description: 'Administrator' },
        ];

        const existingRoles = await Role.find();

        const rolesToUpdate = defaultRoles.filter(role => {
            const existingRole = existingRoles.find(existingRole => existingRole.name === role.name);
            return !existingRole || existingRole.description !== role.description;
        });

        if (rolesToUpdate.length > 0) {
            await Role.deleteMany();
            await Role.insertMany(rolesToUpdate);
            console.log('Standardrollen erfolgreich aktualisiert');
        } else {
            console.log('Die Standardrollen sind bereits aktuell');
        }
    } catch (error) {
        console.error('Fehler beim Initialisieren/aktualisieren der Standardrollen:', error);
    }
}

module.exports = { initializeRoles };
