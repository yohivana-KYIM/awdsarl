import { Router } from 'express';
import transporter from '../config/smtp.js';
import { contactEmailToTeam, contactConfirmationEmail } from '../templates/contactEmail.js';

const router = Router();

router.post('/contact', async (req, res) => {
  try {
    const { name, email, company, country, service, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez remplir tous les champs obligatoires'
      });
    }

    // Email to AWD SARL team
    const teamEmail = contactEmailToTeam({ name, email, company, country, service, message });
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.SMTP_FROM_EMAIL,
      replyTo: email,
      subject: teamEmail.subject,
      html: teamEmail.html
    };

    // Confirmation email to the sender
    const confirmation = contactConfirmationEmail({ name, message });
    const confirmationMail = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: confirmation.subject,
      html: confirmation.html
    };

    // Send both emails
    const info = await transporter.sendMail(mailOptions);
    console.log('Contact email sent:', info.messageId);

    // Send confirmation (don't fail if this one fails)
    try {
      await transporter.sendMail(confirmationMail);
      console.log('Confirmation email sent to:', email);
    } catch (confirmError) {
      console.error('Failed to send confirmation email:', confirmError.message);
    }

    res.json({
      success: true,
      message: 'Message envoye avec succes ! Nous vous repondrons dans les plus brefs delais.',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending contact email:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi du message. Veuillez reessayer.'
    });
  }
});

export default router;