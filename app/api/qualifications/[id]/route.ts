import { NextRequest, NextResponse } from 'next/server';
import { getQualificationById } from '@/lib/models';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
