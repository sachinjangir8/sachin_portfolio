export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { getAllTechStacks } from '@/lib/models';

export async function GET(request: NextRequest) {
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

