import { NextResponse } from 'next/server';
import { invoices } from '../data';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const invoice = invoices.find(i => i.id === params.id);
  return invoice
    ? NextResponse.json(invoice)
    : NextResponse.json({ message: 'Not found' }, { status: 404 });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const index = invoices.findIndex(i => i.id === params.id);
  if (index !== -1) {
    invoices.splice(index, 1);
    return NextResponse.json({ message: 'deleted' });
  }
  return NextResponse.json({ message: 'Not found' }, { status: 404 });
}

export async function POST(_: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: `sent ${params.id}` });
}
