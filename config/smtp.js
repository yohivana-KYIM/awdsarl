import nodemailer from 'nodemailer';

// Create transporter with better error handling
const createTransporter = () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      },
      // Add timeout to prevent hanging
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000
    });

    // Verify SMTP connection (non-blocking)
    transporter.verify((error, success) => {
      if (error) {
        console.error('SMTP Connection Error:', error.message);
        console.error('Please check your SMTP configuration in .env file');
      } else {
        console.log('SMTP Server is ready to send emails');
      }
    });

    return transporter;
  } catch (error) {
    console.error('Failed to create SMTP transporter:', error.message);
    // Return a dummy transporter that will fail gracefully
    return {
      sendMail: async () => {
        throw new Error('SMTP not configured properly. Please check your environment variables.');
      }
    };
  }
};

const transporter = createTransporter();

export default transporter;