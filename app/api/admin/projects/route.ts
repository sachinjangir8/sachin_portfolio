export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { createProject, getAllProjects } from '@/lib/models';
import { Project } from '@/types';

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const projects = await getAllProjects(false);
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Get projects error:', error);
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
      description,
      techStack,
      category,
      liveDemoLink,
      githubLink,
      images,
      isPublished,
    } = data;

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: 'Title, description, and category are required' },
        { status: 400 }
      );
    }

    const project: Omit<Project, '_id'> = {
      title,
      description,
      techStack: Array.isArray(techStack) ? techStack : [],
      category,
      liveDemoLink: liveDemoLink || '',
      githubLink: githubLink || '',
      images: Array.isArray(images) ? images : [],
      isPublished: isPublished ?? false,
    };

    const created = await createProject(project);
    return NextResponse.json({ project: created }, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
