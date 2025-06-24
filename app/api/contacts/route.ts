import { NextResponse } from 'next/server';
import { contacts } from './data';
import { Contact } from '@/types/contact';

export async function GET() {
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  const data = (await request.json()) as Partial<Contact>;
  const newContact: Contact = {
    id: Date.now().toString(),
    name: data.name || '',
    type: data.type || 'member',
    role: data.role,
    email: data.email,
    phone: data.phone,
    address: data.address,
    avatar: data.avatar || (data.name ? data.name.split(' ').map(w => w[0]).join('').toUpperCase() : ''),
    status: data.status || 'active',
    joinDate: new Date().toISOString().split('T')[0],
    services: data.services,
    hourlyRate: data.hourlyRate,
    dailyRate: data.dailyRate,
    capacity: data.capacity,
  };
  contacts.push(newContact);
  return NextResponse.json(newContact, { status: 201 });
}
