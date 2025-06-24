import { NextResponse } from 'next/server';

const resources = [
  { id: '1', url: '/images/score.pdf' }
];

export async function GET() {
  return NextResponse.json(resources);
}
