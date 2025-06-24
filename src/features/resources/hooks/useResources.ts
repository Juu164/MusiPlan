import { useQuery } from '@tanstack/react-query';

interface Resource {
  id: string;
  url: string;
}

async function fetchResources(): Promise<Resource[]> {
  const res = await fetch('/api/resources');
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

export function useResources() {
  return useQuery({ queryKey: ['resources'], queryFn: fetchResources });
}
