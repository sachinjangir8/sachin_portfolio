export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { getAllQualifications } from '@/lib/models';

export async function GET(request: NextRequest) {
  try {
    // Extract search params from the request URL
    const url = new URL(request.url);
    const searchParams = url.searchParams;
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
