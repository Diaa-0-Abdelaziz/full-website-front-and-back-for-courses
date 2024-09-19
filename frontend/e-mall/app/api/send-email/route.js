// import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend';
import { EmailTemplate } from '../../email-template/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [body.email],
      subject: "Orders From zizo",
      react: EmailTemplate({ body }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
