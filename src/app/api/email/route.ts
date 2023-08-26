import { handleError } from '@/utils/functions';
import { SendEmailData } from '@/utils/types/globals';
import sendgrid from '@sendgrid/mail';
import { NextRequest, NextResponse } from 'next/server';

//TODO validate all inputs

export const POST = async (request: NextRequest) => {
  //check sendgrid api key
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'no api key found' }, { status: 401 });
  }
  sendgrid.setApiKey(apiKey);
  const body: SendEmailData = await request.json();

  //check email sender environment variable
  const sender = process.env.EMAIL_SENDER;
  if (!sender) {
    return NextResponse.json(
      { error: 'no email sender environment variable found' },
      { status: 401 }
    );
  }

  //validate inputs

  try {
    //send email
    await sendgrid.send({
      to: body.recipient,
      from: sender,
      subject: body.subject,
      text: body.text,
      html: body.html,
    });
    //save email data in database

    return NextResponse.json({ status: 200 });
  } catch (error) {
    const { message, status } = handleError(error);
    return NextResponse.json({ error: message }, { status: status });
  }
};
