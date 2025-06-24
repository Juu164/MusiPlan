import { useQuery } from '@tanstack/react-query';
import { Invoice } from '@/types/invoice';

async function fetchInvoices(): Promise<Invoice[]> {
  const res = await fetch('/api/invoices');
  if (!res.ok) throw new Error('Failed');
  return res.json();
}

/**
 * Liste des factures via React Query
 */
export function useInvoices() {
  return useQuery({ queryKey: ['invoices'], queryFn: fetchInvoices });
}
