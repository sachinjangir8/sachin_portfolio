export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { adminExists, createAdmin } from '@/lib/models';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Only allow setup if no admin exists
    const exists = await adminExists();
    if (exists) {
      return NextResponse.json(
        { error: 'Admin already exists' },
        { status: 400 }
      );
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    await createAdmin({
      username,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: 'Admin created successfully',
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
