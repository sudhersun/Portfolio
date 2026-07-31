import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const TO_EMAIL = 'sudhersun346@gmail.com';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const fullName = String(body.fullName ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const email = String(body.email ?? '').trim();
  const description = String(body.description ?? '').trim();

  if (!fullName || !phone || !email || !description) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set.');
    return NextResponse.json({ error: 'Contact form is not configured yet.' }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: TO_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${fullName}`,
      text: `Name: ${fullName}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${description}`,
    });

    if (error) {
      console.error('Resend rejected the email', error);
      return NextResponse.json({ error: 'Something went wrong sending your message.' }, { status: 502 });
    }
  } catch (err) {
    console.error('Failed to send contact email', err);
    return NextResponse.json({ error: 'Something went wrong sending your message.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
