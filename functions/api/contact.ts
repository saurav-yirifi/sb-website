// Contact form handler — Cloudflare Pages Function
// Sends email via ZeptoMail API

interface Env {
  ZEPTOMAIL_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { name, email, message } = await context.request.json() as {
    name?: string;
    email?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'All fields are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = context.env.ZEPTOMAIL_API_KEY;
  if (!apiKey) {
    console.error('ZEPTOMAIL_API_KEY not configured');
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const payload = {
    from: { address: 'noreply@sauravbhatia.com', name: 'sauravbhatia.com' },
    to: [{ email_address: { address: 'hello@sauravbhatia.com', name: 'Saurav Bhatia' } }],
    reply_to: [{ address: email, name }],
    subject: `Contact form: ${name}`,
    textbody: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    htmlbody: `
      <h3>New message from sauravbhatia.com</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    const response = await fetch('https://api.zeptomail.com/v1.1/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('ZeptoMail error:', err);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Send error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
