import { NextRequest, NextResponse } from 'next/server';
import { getFirstAdmin, updateAdminById } from '@/lib/models';
import { hashPassword } from '@/lib/auth';
import { RESET_TARGET_EMAIL } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, otp, newPassword } = await request.json();

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { error: 'Email, code, and new password are required' },
        { status: 400 }
      );
    }

    if (email !== RESET_TARGET_EMAIL) {
      return NextResponse.json(
        { error: 'Invalid code or email' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const admin = await getFirstAdmin();
    if (!admin || !admin._id) {
      return NextResponse.json(
        { error: 'Admin account not found' },
        { status: 400 }
      );
    }

    if (!admin.resetOtp || !admin.resetOtpExpires) {
      return NextResponse.json(
        { error: 'No active reset request. Please request a new code.' },
        { status: 400 }
      );
    }

    const now = new Date();
    const expires = new Date(admin.resetOtpExpires);

    if (now > expires || admin.resetOtp !== otp) {
      return NextResponse.json(
        { error: 'Invalid or expired code' },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(newPassword);

    await updateAdminById(admin._id.toString(), {
      password: hashed,
      resetOtp: undefined,
      resetOtpExpires: undefined,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: 'Password has been reset. You can now log in with your new password.',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

