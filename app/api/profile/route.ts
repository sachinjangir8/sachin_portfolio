export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { getProfile } from '@/lib/models';

export async function GET() {
  try {
    const profile = await getProfile();
    return NextResponse.json({ profile: profile || null });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
