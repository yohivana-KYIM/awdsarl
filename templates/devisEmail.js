export function devisEmailToTeam({ name, email, phone, company, country, service, projectType, budget, deadline, description, requirements }) {
  return {
    subject: `Nouvelle demande de devis - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #FF670E, #0173FF); padding: 20px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Nouvelle Demande de Devis</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">

          <h2 style="color: #333; border-bottom: 2px solid #FF670E; padding-bottom: 10px;">Informations client</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold; width: 40%;">Nom:</td>
              <td style="padding: 10px 0; color: #333;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0; color: #333;"><a href="mailto:${email}" style="color: #0173FF;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Telephone:</td>
              <td style="padding: 10px 0; color: #333;">${phone || 'Non specifie'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Entreprise:</td>
              <td style="padding: 10px 0; color: #333;">${company || 'Non specifie'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Pays:</td>
              <td style="padding: 10px 0; color: #333;">${country || 'Non specifie'}</td>
            </tr>
          </table>

          <h2 style="color: #333; border-bottom: 2px solid #0173FF; padding-bottom: 10px; margin-top: 30px;">Details du projet</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold; width: 40%;">Service:</td>
              <td style="padding: 10px 0; color: #333;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Type de projet:</td>
              <td style="padding: 10px 0; color: #333;">${projectType || 'Non specifie'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Budget:</td>
              <td style="padding: 10px 0; color: #333; font-weight: bold; color: #FF670E;">${budget || 'Non specifie'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-weight: bold;">Delai souhaite:</td>
              <td style="padding: 10px 0; color: #333;">${deadline || 'Non specifie'}</td>
            </tr>
          </table>

          <h2 style="color: #333; border-bottom: 2px solid #FF670E; padding-bottom: 10px; margin-top: 30px;">Description du projet</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #FF670E;">
            <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${description}</p>
          </div>

          ${requirements ? `
          <h2 style="color: #333; border-bottom: 2px solid #0173FF; padding-bottom: 10px; margin-top: 30px;">Fonctionnalites souhaitees</h2>
          <div style="background: #f0f7ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0173FF;">
            <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${requirements}</p>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #888; font-size: 12px;">
            <p>Cette demande a ete envoyee depuis le formulaire de devis du site AWD SARL</p>
            <p>Date: ${new Date().toLocaleString('fr-FR')}</p>
          </div>
        </div>
      </div>
    `
  };
}

export function devisConfirmationEmail({ name, service, projectType, budget, deadline }) {
  return {
    subject: `AWD SARL - Votre demande de devis a ete recue`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background: linear-gradient(135deg, #FF670E, #0173FF); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">AWD SARL</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333;">Bonjour ${name},</h2>
          <p style="color: #555; line-height: 1.6;">
            Nous avons bien recu votre demande de devis et nous vous remercions de votre confiance.
          </p>
          <p style="color: #555; line-height: 1.6;">
            Notre equipe d'experts va etudier votre projet en detail et vous enverra un devis
            personnalise sous <strong>24 a 48 heures</strong>.
          </p>

          <div style="background: #fff7ed; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF670E;">
            <p style="color: #333; margin: 0; font-weight: bold;">Recapitulatif de votre demande :</p>
            <ul style="color: #555; margin: 10px 0 0 0; padding-left: 20px;">
              <li><strong>Service :</strong> ${service}</li>
              ${projectType ? `<li><strong>Type :</strong> ${projectType}</li>` : ''}
              ${budget ? `<li><strong>Budget :</strong> ${budget}</li>` : ''}
              ${deadline ? `<li><strong>Delai :</strong> ${deadline}</li>` : ''}
            </ul>
          </div>

          <p style="color: #555; line-height: 1.6;">
            Si vous avez des questions entre-temps, n'hesitez pas a nous appeler au
            <strong>+225 07 67 00 64 33</strong> ou par email a <strong>support@awdsarl.com</strong>.
          </p>
          <p style="color: #555; line-height: 1.6;">Cordialement,<br><strong>L'equipe AWD SARL</strong></p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #888; font-size: 12px;">
            <p>AWD SARL - AKWA, RUE EQUINOXE, Douala, Cameroun</p>
            <p>support@awdsarl.com | +225 07 67 00 64 33</p>
          </div>
        </div>
      </div>
    `
  };
}