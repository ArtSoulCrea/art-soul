import type { APIRoute } from "astro";
import { Resend } from "resend";
import { notificationEmail, autoReplyEmail } from "../../lib/emails";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  // Honeypot : champ invisible côté client. Si rempli → bot.
  // On retourne 200 silencieusement pour ne pas révéler la détection.
  if (data.get("website")?.toString().trim()) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const name = data.get("name")?.toString().trim();
  const prenom = data.get("prenom")?.toString().trim();
  const email = data.get("email")?.toString().trim();
  const message = data.get("message")?.toString().trim();

  if (!name || !prenom || !email || !message) {
    return new Response(JSON.stringify({ error: "Tous les champs sont requis." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!email.includes("@")) {
    return new Response(JSON.stringify({ error: "Adresse email invalide." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.CONTACT_FROM_EMAIL;
  const toEmail = import.meta.env.CONTACT_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    const missing = ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL"]
      .filter((k) => !import.meta.env[k])
      .join(", ");
    console.error(`[contact] Variables d'environnement manquantes : ${missing}`);
    return new Response(JSON.stringify({ error: "Le service d'envoi n'est pas configuré." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `ArtSoul — Message de ${prenom} ${name}`,
    html: notificationEmail({ name, prenom, email, message }),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return new Response(JSON.stringify({ error: "L'envoi a échoué. Réessayez plus tard." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Réponse automatique à l'expéditeur — erreur non bloquante
  const { error: replyError } = await resend.emails.send({
    from: fromEmail,
    to: email,
    replyTo: toEmail,
    subject: `ArtSoul — Merci pour votre message, ${prenom}`,
    html: autoReplyEmail({ prenom }),
  });
  if (replyError) console.error("[contact] Auto-reply error:", replyError);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
