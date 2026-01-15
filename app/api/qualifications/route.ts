export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { getAllQualifications } from '@/lib/models';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') !== 'false';

    const qualifications = await getAllQualifications(publishedOnly);

    return NextResponse.json({ qualifications });
  } catch (error) {
    console.error('Get qualifications error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
