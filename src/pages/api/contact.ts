import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name")?.toString().trim();
  const email = data.get("email")?.toString().trim();
  const message = data.get("message")?.toString().trim();

  // Validation basique
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
    subject: `Art Soul — Message de ${name}`,
    html: `
      <p><strong>Nom :</strong> ${escHtml(name)}</p>
      <p><strong>Email :</strong> ${escHtml(email)}</p>
      <p><strong>Message :</strong></p>
      <p style="white-space: pre-wrap">${escHtml(message)}</p>
    `,
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

// Échappe les caractères HTML pour éviter l'injection dans le corps de l'email
function escHtml(str: string): string {
  return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c] ?? c));
}
