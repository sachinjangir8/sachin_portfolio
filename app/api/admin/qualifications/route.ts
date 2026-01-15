export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { createQualification, getAllQualifications } from '@/lib/models';
import { Qualification } from '@/types';

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const qualifications = await getAllQualifications(false);
    return NextResponse.json({ qualifications });
  } catch (error) {
    console.error('Get qualifications error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const data = await request.json();
    const {
      title,
      issuer,
      issueDate,
      expiryDate,
      credentialId,
      credentialUrl,
      certificateImage,
      description,
      type,
      isPublished,
    } = data;

    if (!title || !issuer || !issueDate || !type) {
      return NextResponse.json(
        { error: 'Title, issuer, issue date, and type are required' },
        { status: 400 }
      );
    }

    if (!['education', 'certification', 'award'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be education, certification, or award' },
        { status: 400 }
      );
    }

    const qualification: Omit<Qualification, '_id'> = {
      title,
      issuer,
      issueDate,
      expiryDate: expiryDate || undefined,
      credentialId: credentialId || undefined,
      credentialUrl: credentialUrl || undefined,
      certificateImage: certificateImage || undefined,
      description: description || undefined,
      type: type as 'education' | 'certification' | 'award',
      isPublished: isPublished ?? false,
    };

    const created = await createQualification(qualification);
    return NextResponse.json({ qualification: created }, { status: 201 });
  } catch (error) {
    console.error('Create qualification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
