export const dynamic = "force-dynamic";
import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/models';

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
