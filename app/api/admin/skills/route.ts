export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { createTechStack, getAllTechStacks } from '@/lib/models';
import { TechStack } from '@/types';

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const skills = await getAllTechStacks();
    return NextResponse.json({ skills });
  } catch (error) {
    console.error('Get skills error:', error);
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
      name,
      category,
      level,
      yearsExperience,
      description,
      icon,
      isFeatured,
      order,
    } = data;

    if (!name || !category || !level) {
      return NextResponse.json(
        { error: 'Name, category, and level are required' },
        { status: 400 }
      );
    }

    const allowedCategories: TechStack['category'][] = [
      'frontend',
      'backend',
      'data-science',
      'devops',
      'mobile',
      'ui-ux',
      'other',
    ];

    const allowedLevels: TechStack['level'][] = [
      'beginner',
      'intermediate',
      'advanced',
      'expert',
    ];

    if (!allowedCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    if (!allowedLevels.includes(level)) {
      return NextResponse.json(
        { error: 'Invalid level' },
        { status: 400 }
      );
    }

    const skill: Omit<TechStack, '_id'> = {
      name,
      category,
      level,
      yearsExperience: yearsExperience ?? undefined,
      description: description || undefined,
      icon: icon || undefined,
      isFeatured: isFeatured ?? true,
      order: order ?? 0,
    };

    const created = await createTechStack(skill);
    return NextResponse.json({ skill: created }, { status: 201 });
  } catch (error) {
    console.error('Create skill error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

