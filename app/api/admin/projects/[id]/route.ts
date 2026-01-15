export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { getProjectById, updateProject, deleteProject } from '@/lib/models';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const project = await getProjectById(params.id);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Get project error:', error);
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
      description,
      techStack,
      category,
      liveDemoLink,
      githubLink,
      images,
      isPublished,
    } = data;

    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (techStack !== undefined) updates.techStack = Array.isArray(techStack) ? techStack : [];
    if (category !== undefined) updates.category = category;
    if (liveDemoLink !== undefined) updates.liveDemoLink = liveDemoLink;
    if (githubLink !== undefined) updates.githubLink = githubLink;
    if (images !== undefined) updates.images = Array.isArray(images) ? images : [];
    if (isPublished !== undefined) updates.isPublished = isPublished;

    await updateProject(params.id, updates);
    const updated = await getProjectById(params.id);
    
    return NextResponse.json({ project: updated });
  } catch (error) {
    console.error('Update project error:', error);
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
    await deleteProject(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
