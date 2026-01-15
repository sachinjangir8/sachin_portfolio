export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { getQualificationById, updateQualification, deleteQualification } from '@/lib/models';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const qualification = await getQualificationById(params.id);
    
    if (!qualification) {
      return NextResponse.json(
        { error: 'Qualification not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ qualification });
  } catch (error) {
    console.error('Get qualification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (issuer !== undefined) updates.issuer = issuer;
    if (issueDate !== undefined) updates.issueDate = issueDate;
    if (expiryDate !== undefined) updates.expiryDate = expiryDate || undefined;
    if (credentialId !== undefined) updates.credentialId = credentialId || undefined;
    if (credentialUrl !== undefined) updates.credentialUrl = credentialUrl || undefined;
    if (certificateImage !== undefined) updates.certificateImage = certificateImage || undefined;
    if (description !== undefined) updates.description = description || undefined;
    if (type !== undefined) {
      if (!['education', 'certification', 'award'].includes(type)) {
        return NextResponse.json(
          { error: 'Type must be education, certification, or award' },
          { status: 400 }
        );
      }
      updates.type = type;
    }
    if (isPublished !== undefined) updates.isPublished = isPublished;

    await updateQualification(params.id, updates);
    const updated = await getQualificationById(params.id);
    
    return NextResponse.json({ qualification: updated });
  } catch (error) {
    console.error('Update qualification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    await deleteQualification(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete qualification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
