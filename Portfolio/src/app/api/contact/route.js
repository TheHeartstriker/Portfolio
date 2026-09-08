import { Resend } from "resend";

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getTextField(formData, name) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const resend = new Resend(apiKey);

    //
    // Get data
    const formData = await request.formData();
    const firstName = getTextField(formData, "firstName");
    const lastName = getTextField(formData, "lastName");
    const email = getTextField(formData, "email");
    const business = getTextField(formData, "business");
    const message = getTextField(formData, "message");
    //
    // Validate data
    if (!firstName || !lastName || !email || !message || !business) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    //Validate length
    if (
      firstName.length > 150 ||
      lastName.length > 150 ||
      email.length > 150 ||
      business.length > 150 ||
      message.length > 2500
    ) {
      return Response.json(
        { error: "Input exceeds maximum length" },
        { status: 400 },
      );
    }
    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email address" }, { status: 400 });
    }
    //
    // Send email
    const { error } = await resend.emails.send({
      from: "Website <website@kadenwildauer.com>",
      to: ["kaden@kadenwildauer.com"],
      subject: `New message from ${firstName} ${lastName}`,
      replyTo: email,
      html: `
        <h2>New contact form submission</h2>

        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Business:</strong> ${escapeHtml(business)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message)}</p>
      `,
    });
    //
    // Check and send of errors
    if (error) {
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return new Response(null, { status: 200 });
  } catch {
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
