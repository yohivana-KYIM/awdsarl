import { Router } from 'express';
import transporter from '../config/smtp.js';
import { devisEmailToTeam, devisConfirmationEmail } from '../templates/devisEmail.js';

const router = Router();

router.post('/devis', async (req, res) => {
  // Ensure JSON response even on unexpected errors
  try {
    const { name, email, phone, company, country, service, projectType, budget, deadline, description, requirements } = req.body;

    // Validation
    if (!name || !email || !service || !description) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez remplir tous les champs obligatoires'
      });
    }

    // Map service values (handle "service1", "service2", etc.)
    const serviceMap = {
      'service1': 'Développement Web',
      'service2': 'Développement Mobile',
      'service3': 'Solutions E-commerce',
      'service4': 'Maintenance & Support',
      'service5': 'Consulting IT',
      'service6': 'Autre'
    };
    const serviceName = serviceMap[service] || service;

    // Email to AWD SARL team
    const teamEmail = devisEmailToTeam({ 
      name, 
      email, 
      phone, 
      company, 
      country, 
      service: serviceName, 
      projectType, 
      budget, 
      deadline, 
      description, 
      requirements 
    });
    
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.SMTP_FROM_EMAIL,
      replyTo: email,
      subject: teamEmail.subject,
      html: teamEmail.html
    };

    // Confirmation email to the client
    const confirmation = devisConfirmationEmail({ 
      name, 
      service: serviceName, 
      projectType, 
      budget, 
      deadline 
    });
    
    const confirmationMail = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: confirmation.subject,
      html: confirmation.html
    };

    // Send email to team
    const info = await transporter.sendMail(mailOptions);
    console.log('Devis email sent:', info.messageId);

    // Send confirmation to client (don't fail if this one fails)
    try {
      await transporter.sendMail(confirmationMail);
      console.log('Devis confirmation sent to:', email);
    } catch (confirmError) {
      console.error('Failed to send devis confirmation:', confirmError.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Votre demande de devis a ete envoyee avec succes ! Nous vous repondrons sous 24-48h.',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending devis email:', error);
    // Always return JSON, even on unexpected errors
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi de la demande. Veuillez reessayer.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;