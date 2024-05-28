const nodemailer = require('nodemailer');
const twilio = require('twilio');
const pushNotificationService = require('./pushNotification.service');

async function sendEmailNotification(email, subject, message) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: subject,
            text: message
        };

        await transporter.sendMail(mailOptions);
        console.log('E-Mail-Benachrichtigung erfolgreich gesendet');
    } catch (error) {
        console.error('Fehler beim Senden der E-Mail-Benachrichtigung:', error);
    }
}

async function sendSMSNotification(phoneNumber, message) {
    try {
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        // SMS senden
        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber
        });
        console.log('SMS-Benachrichtigung erfolgreich gesendet');
    } catch (error) {
        console.error('Fehler beim Senden der SMS-Benachrichtigung:', error);
    }
}

async function sendPushNotification(deviceToken, message) {
    try {
        await pushNotificationService.sendNotification(deviceToken, message);
        console.log('Push-Benachrichtigung erfolgreich gesendet');
    } catch (error) {
        console.error('Fehler beim Senden der Push-Benachrichtigung:', error);
    }
}

module.exports = { sendEmailNotification, sendSMSNotification, sendPushNotification };
