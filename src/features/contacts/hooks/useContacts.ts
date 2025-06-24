import { useQuery } from '@tanstack/react-query';
import { Contact } from '@/types/contact';

async function fetchContacts(): Promise<Contact[]> {
  const res = await fetch('/api/contacts');
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

export function useContacts() {
  return useQuery({ queryKey: ['contacts'], queryFn: fetchContacts });
}
