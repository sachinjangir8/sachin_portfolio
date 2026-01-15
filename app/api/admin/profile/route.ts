import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { getProfile, updateProfile } from '@/lib/models';

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

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

export async function PUT(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const data = await request.json();
    const {
      name,
      bio,
      githubLink,
      linkedinLink,
      twitterLink,
      resumeLink,
      contactEmail,
    } = data;

    if (!contactEmail) {
      return NextResponse.json(
        { error: 'Contact email is required' },
        { status: 400 }
      );
    }

    await updateProfile({
      name,
      bio,
      githubLink,
      linkedinLink,
      twitterLink,
      resumeLink,
      contactEmail,
    });

    const updated = await getProfile();
    return NextResponse.json({ profile: updated });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
