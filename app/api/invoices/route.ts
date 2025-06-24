import { NextResponse } from 'next/server';
import { invoices } from './data';

export async function GET() {
  return NextResponse.json(invoices);
}

export async function POST(request: Request) {
  const data = await request.json();
  invoices.push({
    id: `INV-${Date.now()}`,
    client: data.client,
    event: data.event,
    amount: data.amount,
    status: 'draft',
    dueDate: data.dueDate,
    createdDate: new Date().toISOString()
  });
  return NextResponse.json(invoices[invoices.length - 1], { status: 201 });
}
