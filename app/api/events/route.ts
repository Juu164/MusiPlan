import { NextResponse } from 'next/server';

const events = [
  { id: '1', title: 'Répétition', date: '2024-01-20' },
  { id: '2', title: 'Concert', date: '2024-02-02', invoiceId: 'INV-001' }
];

export async function GET() {
  return NextResponse.json(events);
}
