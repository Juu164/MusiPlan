'use client';
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

export interface UseInvoiceActions {
  handlePreview: (id: string) => void;
  handleSend: (id: string) => Promise<void>;
  handlePrint: (id: string) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => Promise<void>;
}

export function useInvoiceActions(): UseInvoiceActions {
  const client = useQueryClient();

  const handlePreview = useCallback((id: string) => {
    window.open(`/invoices/${id}`, '_blank');
  }, []);

  const handleSend = useCallback(async (id: string) => {
    const res = await fetch(`/api/invoices/${id}`, { method: 'POST' });
    if (res.ok) toast({ title: 'Envoyée', description: id });
  }, []);

  const handlePrint = useCallback((id: string) => {
    window.print();
  }, []);

  const handleEdit = useCallback((id: string) => {
    window.location.href = `/invoices/${id}`;
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    const res = await fetch(`/api/invoices/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast({ title: 'Supprimée', description: id });
      client.invalidateQueries({ queryKey: ['invoices'] });
    }
  }, [client]);

  return { handlePreview, handleSend, handlePrint, handleEdit, handleDelete };
}
