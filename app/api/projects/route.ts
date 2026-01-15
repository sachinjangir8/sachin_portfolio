export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, getProjectsByCategory } from '@/lib/models';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const publishedOnly = searchParams.get('published') !== 'false';

    let projects;
    if (category) {
      projects = await getProjectsByCategory(category, publishedOnly);
    } else {
      projects = await getAllProjects(publishedOnly);
    }

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
