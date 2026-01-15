import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { getTechStackById, updateTechStack, deleteTechStack } from '@/lib/models';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const skill = await getTechStackById(params.id);

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ skill });
  } catch (error) {
    console.error('Get skill error:', error);
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
      name,
      category,
      level,
      yearsExperience,
      description,
      icon,
      isFeatured,
      order,
    } = data;

    const updates: any = {};
    if (name !== undefined) updates.name = name;
    if (category !== undefined) updates.category = category;
    if (level !== undefined) updates.level = level;
    if (yearsExperience !== undefined) updates.yearsExperience = yearsExperience;
    if (description !== undefined) updates.description = description || undefined;
    if (icon !== undefined) updates.icon = icon || undefined;
    if (isFeatured !== undefined) updates.isFeatured = isFeatured;
    if (order !== undefined) updates.order = order;

    await updateTechStack(params.id, updates);
    const updated = await getTechStackById(params.id);

    return NextResponse.json({ skill: updated });
  } catch (error) {
    console.error('Update skill error:', error);
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
    await deleteTechStack(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete skill error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

