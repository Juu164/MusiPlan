'use client';

import { useCallback } from 'react';

export function useInvoiceActions() {
  const handleEdit = useCallback((id: string) => {
    // Placeholder: in real app open modal or navigate
    console.log('Edit invoice', id);
  }, []);

  return {
    handleEdit,
  };
}
