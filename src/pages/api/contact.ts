import type { APIRoute } from "astro";
import { Resend } from "resend";
import { notificationEmail } from "../../lib/emails";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name")?.toString().trim();
  const email = data.get("email")?.toString().trim();
  const message = data.get("message")?.toString().trim();

  if (!name || !email || !message) {
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

  // En développement sans clé Resend : log console uniquement
  if (!import.meta.env.RESEND_API_KEY) {
    console.log("[contact] Mode dev — email non envoyé :", { name, email, message });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: import.meta.env.CONTACT_FROM_EMAIL,
    to: import.meta.env.CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `ArtSoul — Message de ${name}`,
    html: notificationEmail({ name, email, message }),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return new Response(JSON.stringify({ error: "L'envoi a échoué. Réessayez plus tard." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
