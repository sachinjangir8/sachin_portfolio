export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { getFirstAdmin, updateAdminById } from '@/lib/models';
import { sendPasswordResetEmail, RESET_TARGET_EMAIL } from '@/lib/email';

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("RESET BODY:", body);

    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }


    // For security, we don't reveal whether email exists.
    if (email !== RESET_TARGET_EMAIL) {
      return NextResponse.json({
        success: true,
        message: 'If this email is registered, a reset code has been sent.',
      });
    }

    const admin = await getFirstAdmin();
    if (!admin || !admin._id) {
      return NextResponse.json(
        { error: 'Admin account not found' },
        { status: 400 }
      );
    }

    const otp = generateOtp();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await updateAdminById(admin._id.toString(), {
      resetOtp: otp,
      resetOtpExpires: expires,
      email: RESET_TARGET_EMAIL,
    });

    await sendPasswordResetEmail(otp);

    return NextResponse.json({
      success: true,
      message: 'If this email is registered, a reset code has been sent.',
    });
  } catch (error) {
    console.error('Request reset error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

