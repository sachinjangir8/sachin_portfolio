import nodemailer from 'nodemailer';

const RESET_EMAIL = process.env.ADMIN_EMAIL || 'sachinjangir1319@gmail.com';

function getTransport() {
  const user = process.env.SMTP_USER || RESET_EMAIL;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error('SMTP_USER and SMTP_PASS must be set in environment for password reset emails.');
  }

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendPasswordResetEmail(otp: string) {
  const transporter = getTransport();

  const fromAddress = process.env.SMTP_FROM || `Portfolio Admin <${process.env.SMTP_USER || RESET_EMAIL}>`;

  const mailOptions = {
    from: fromAddress,
    to: RESET_EMAIL,
    subject: 'Your Admin Password Reset Code',
    text: `Your password reset code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you did not request this, you can ignore this email.`,
    html: `<p>Your password reset code is:</p>
           <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
           <p>This code will expire in 10 minutes.</p>
           <p>If you did not request this, you can ignore this email.</p>`,
  };

  await transporter.sendMail(mailOptions);
}

export const RESET_TARGET_EMAIL = RESET_EMAIL;

