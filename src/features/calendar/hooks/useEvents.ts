import { useQuery } from '@tanstack/react-query';

interface Event {
  id: string;
  title: string;
  date: string;
  invoiceId?: string;
}

async function fetchEvents(): Promise<Event[]> {
  const res = await fetch('/api/events');
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

export function useEvents() {
  return useQuery({ queryKey: ['events'], queryFn: fetchEvents });
}
