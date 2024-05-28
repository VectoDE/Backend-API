const pushNotificationService = require('../services/pushNotification.service');

exports.sendNotification = async (req, res) => {
    try {
        const { deviceToken, message } = req.body;
        if (!deviceToken || !message) {
            return res.status(400).json({ error: 'Device token and message are required' });
        }
        await pushNotificationService.sendNotification(deviceToken, message);
        res.status(200).json({ success: true, message: 'Notification sent successfully' });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Failed to send notification' });
    }
};
