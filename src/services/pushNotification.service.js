const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function sendPushNotification(token, title, body) {
  try {
    const message = {
      token: token,
      notification: {
        title: title,
        body: body,
      },
    };

    const response = await admin.messaging().send(message);
    console.log('Push-Benachrichtigung erfolgreich gesendet:', response);
    return response;
  } catch (error) {
    console.error('Fehler beim Senden der Push-Benachrichtigung:', error);
    throw error;
  }
}

module.exports = { sendPushNotification };
