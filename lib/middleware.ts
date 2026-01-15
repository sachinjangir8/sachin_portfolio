import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from './auth';

export async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  const payload = await authenticateRequest(request);
  
  if (!payload) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  return null; // Auth successful, continue
}
