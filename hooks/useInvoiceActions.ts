'use client';

import { useCallback } from 'react';

export interface UseInvoiceActions {
  /** Prévisualiser une facture */
  handlePreview: (id: string) => void;
  /** Envoyer une facture au client */
  handleSend: (id: string) => Promise<void>;
  /** Imprimer une facture */
  handlePrint: (id: string) => void;
  /** Modifier une facture */
  handleEdit: (id: string) => void;
  /** Supprimer une facture */
  handleDelete: (id: string) => Promise<void>;
}

export function useInvoiceActions(): UseInvoiceActions {
  const handlePreview = useCallback((id: string) => {
    // Placeholder: open a preview modal or navigate
    console.log('Preview invoice', id);
  }, []);

  const handleSend = useCallback(async (id: string) => {
    // Placeholder: send invoice to the customer
    console.log('Send invoice', id);
  }, []);

  const handlePrint = useCallback((id: string) => {
    // Placeholder: trigger browser print
    console.log('Print invoice', id);
  }, []);

  const handleEdit = useCallback((id: string) => {
    // Placeholder: open edit form
    console.log('Edit invoice', id);
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    // Placeholder: delete invoice
    console.log('Delete invoice', id);
  }, []);

  return {
    handlePreview,
    handleSend,
    handlePrint,
    handleEdit,
    handleDelete,
  };
}
