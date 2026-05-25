// Templates HTML pour les emails envoyés via Resend.
// Contraintes email : CSS inline obligatoire, layout en <table>, pas de webfonts.
// Logo : doit être une URL absolue publique pointant vers une version BLANCHE du logo.
// Placer sceau.webp dans public/ et définir SITE_URL dans .env une fois le domaine connu.
// Sans SITE_URL, le logo est remplacé par le nom en texte.

const INK = "#0E0E0E";
const PAPER = "#F5F3EE";
const GOLD = "#C8A646";
const SURFACE = "#1A1A1A";

// Si SITE_URL est défini (.env), utilise le logo blanc ; sinon fallback texte.
// Ajouter dans .env : SITE_URL=https://artsoul.fr  +  public/sceau.webp
function sceauHtml(): string {
  const siteUrl = process.env.SITE_URL ?? "";
  if (siteUrl) {
    return `<img src="${siteUrl}/sceau.png" alt="ArtSoul" width="80" height="80"
      style="display:block;border:0;outline:none;text-decoration:none;" />`;
  }
  return `<p style="margin:0;font-family:Georgia,serif;font-size:24px;color:${PAPER};letter-spacing:0.08em;">ArtSoul</p>`;
}

function base(content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:${INK};font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${INK};padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:${INK};">

          <!-- En-tête -->
          <tr>
            <td style="padding:36px 40px 28px;border-bottom:1px solid ${GOLD};background:${INK};">
              ${sceauHtml()}
              <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:${GOLD};letter-spacing:0.35em;text-transform:uppercase;">Justine — Artiste émotionnelle</p>
            </td>
          </tr>

          <!-- Contenu -->
          ${content}

          <!-- Pied de page -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid ${SURFACE};">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:${PAPER};opacity:0.25;text-align:center;letter-spacing:0.05em;">
                ArtSoul · Message reçu via le formulaire de contact
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Email de notification envoyé à Justine ────────────────────────────────────
// Reçu à chaque soumission du formulaire de contact.
export function notificationEmail(params: {
  name: string;
  prenom: string;
  email: string;
  message: string;
}): string {
  const { name, prenom, email, message } = params;

  const content = `
          <!-- Intro -->
          <tr>
            <td style="padding:36px 40px 0;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${GOLD};letter-spacing:0.3em;text-transform:uppercase;">Nouveau message</p>
              <p style="margin:12px 0 0;font-family:Georgia,serif;font-size:22px;color:${PAPER};line-height:1.3;">
                ${escHtml(prenom)} ${escHtml(name)} vous a écrit
              </p>
            </td>
          </tr>

          <!-- Bloc expéditeur -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:${SURFACE};border-left:3px solid ${GOLD};">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:${GOLD};letter-spacing:0.25em;text-transform:uppercase;">De</p>
                    <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:18px;color:${PAPER};">${escHtml(prenom)} ${escHtml(name)}</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${PAPER};opacity:0.55;">${escHtml(email)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:32px 40px 0;">
              <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:${GOLD};letter-spacing:0.3em;text-transform:uppercase;">Message</p>
              <p style="margin:0;font-family:Georgia,serif;font-size:16px;color:${PAPER};line-height:1.9;white-space:pre-wrap;">${escHtml(message)}</p>
            </td>
          </tr>

          <!-- Bouton répondre -->
          <tr>
            <td style="padding:40px 40px 36px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:${GOLD};border-radius:3px;">
                    <a href="mailto:${escHtml(email)}?subject=Re%3A%20votre%20message%20%C3%A0%20ArtSoul"
                      style="display:inline-block;padding:14px 32px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:bold;color:${INK};text-decoration:none;letter-spacing:0.2em;text-transform:uppercase;">
                      Répondre à ${escHtml(prenom)}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;

  return base(content);
}

// ── Échappe les caractères HTML ───────────────────────────────────────────────
export function escHtml(str: string): string {
  return str.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c] ?? c),
  );
}
