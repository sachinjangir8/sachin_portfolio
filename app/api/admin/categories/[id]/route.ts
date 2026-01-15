export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { getCategoryById, updateCategory, deleteCategory } from '@/lib/models';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { name, description } = await request.json();
    const updates: any = {};

    if (name !== undefined) {
      const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      updates.name = name;
      updates.slug = slug;
    }
    if (description !== undefined) updates.description = description;

    await updateCategory(params.id, updates);
    const updated = await getCategoryById(params.id);
    
    return NextResponse.json({ category: updated });
  } catch (error) {
    console.error('Update category error:', error);
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
    await deleteCategory(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
