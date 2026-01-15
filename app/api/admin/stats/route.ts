import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import { getProjectStats, getAllCategories, getAllProjects } from '@/lib/models';

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const projectStats = await getProjectStats();
    const categories = await getAllCategories();
    const recentProjects = await getAllProjects(false);
    
    return NextResponse.json({
      projects: projectStats,
      categories: {
        total: categories.length,
        list: categories,
      },
      recentProjects: recentProjects.slice(0, 5),
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
