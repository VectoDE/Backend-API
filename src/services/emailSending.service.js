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

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html,
        };
        await transporter.sendMail(mailOptions);
        console.log('E-Mail erfolgreich gesendet');
    } catch (error) {
        console.error('Fehler beim Senden der E-Mail:', error);
    }
};

exports.sendConfirmationEmail = async (to, confirmationLink) => {
    const subject = 'Bestätige deine E-Mail-Adresse';
    const html = `
    <p>Hallo,</p>
    <p>Vielen Dank für die Registrierung bei unserer Plattform! Bevor du loslegen kannst, musst du deine E-Mail-Adresse bestätigen.</p>
    <p>Klicke auf den folgenden Link, um deine E-Mail-Adresse zu bestätigen:</p>
    <p><a href="${confirmationLink}">${confirmationLink}</a></p>
    <p>Bitte beachte, dass dieser Link nur für 24 Stunden gültig ist. Wenn du dich nicht registriert hast, kannst du diese E-Mail ignorieren.</p>
    <p>Viele Grüße,<br>Das Team von [Dein Unternehmen]</p>
  `;
    await this.sendEmail(to, subject, html);
};

exports.sendTicketResponseNotification = async (to, ticketTitle, responderName) => {
    const subject = `Neue Antwort auf das Ticket: ${ticketTitle}`;
    const html = `
    <p>Hallo,</p>
    <p>Es gibt eine neue Antwort auf das Ticket "${ticketTitle}".</p>
    <p>Die Antwort wurde von ${responderName} gepostet.</p>
    <p>Du kannst das Ticket hier überprüfen: [Ticket-Link]</p>
    <p>Viele Grüße,<br>Das Team von [Dein Unternehmen]</p>
  `;
    await this.sendEmail(to, subject, html);
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