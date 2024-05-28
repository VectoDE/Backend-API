const analyticsService = require('../services/analytics.service');

exports.trackEvent = async (req, res) => {
    try {
        const eventDetails = req.body;
        const result = await analyticsService.trackEvent(eventDetails);
        res.status(200).json(result);
    } catch (error) {
        console.error('Fehler beim Verfolgen des Ereignisses:', error);
        res.status(500).json({ error: 'Fehler beim Verfolgen des Ereignisses' });
    }
};
