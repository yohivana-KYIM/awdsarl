export function contactEmailToTeam({ name, email, company, country, service, message }) {
  return {
    subject: `Nouveau message de contact - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #FF670E, #0173FF); padding: 20px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Nouveau Message de Contact</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; border-bottom: 2px solid #FF670E; padding-bottom: 10px;">Informations du contact</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Nom:</td>
              <td style="padding: 10px 0; color: #333;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0; color: #333;"><a href="mailto:${email}" style="color: #0173FF;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Entreprise:</td>
              <td style="padding: 10px 0; color: #333;">${company || 'Non specifie'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Pays:</td>
              <td style="padding: 10px 0; color: #333;">${country?.label || country || 'Non specifie'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Service:</td>
              <td style="padding: 10px 0; color: #333;">${service || 'Non specifie'}</td>
            </tr>
          </table>

          <h2 style="color: #333; border-bottom: 2px solid #FF670E; padding-bottom: 10px; margin-top: 30px;">Message</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #FF670E;">
            <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #888; font-size: 12px;">
            <p>Ce message a ete envoye depuis le formulaire de contact du site AWD SARL</p>
            <p>Date: ${new Date().toLocaleString('fr-FR')}</p>
          </div>
        </div>
      </div>
    `
  };
}

export function contactConfirmationEmail({ name, message }) {
  return {
    subject: `AWD SARL - Nous avons bien recu votre message`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #FF670E, #0173FF); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">AWD SARL</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333;">Bonjour ${name},</h2>
          <p style="color: #555; line-height: 1.6;">
            Nous avons bien recu votre message et nous vous remercions de nous avoir contactes.
          </p>
          <p style="color: #555; line-height: 1.6;">
            Notre equipe va analyser votre demande et vous repondra dans les plus brefs delais
            (generalement sous 24 a 48 heures).
          </p>
          <div style="background: #f0f7ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0173FF;">
            <p style="color: #333; margin: 0; font-weight: bold;">Recapitulatif de votre message :</p>
            <p style="color: #555; margin: 5px 0 0 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #555; line-height: 1.6;">
            Si vous avez des questions urgentes, n'hesitez pas a nous appeler au
            <strong>+237 656 84 96 90</strong>.
          </p>
          <p style="color: #555; line-height: 1.6;">Cordialement,<br><strong>L'equipe AWD SARL</strong></p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #888; font-size: 12px;">
            <p>AWD SARL - AKWA, RUE EQUINOXE, Douala, Cameroun</p>
            <p>support@awdpay.com | +237 656 84 96 90</p>
          </div>
        </div>
      </div>
    `
  };
}