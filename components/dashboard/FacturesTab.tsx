'use client';

import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Invoice } from '@/types/invoice';
import { useInvoiceActions } from '@/hooks/useInvoiceActions';

export default function FacturesTab() {
  const { handleEdit } = useInvoiceActions();
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    // Ici on simule le chargement des factures.
    setInvoices([
      {
        id: 'INV-001',
        client: 'Mairie de Paris',
        event: 'Concert place de la Bastille',
        amount: 1500,
        status: 'envoyee',
        dueDate: '2024-03-10',
        createdDate: '2024-02-01',
        type: 'invoice'
      },
      {
        id: 'INV-002',
        client: 'Studio Central',
        event: 'Enregistrement EP',
        amount: 800,
        status: 'payee',
        dueDate: '2024-04-05',
        createdDate: '2024-03-15',
        paidDate: '2024-03-20',
        type: 'invoice'
      }
    ]);
  }, []);

  const formatDate = (date: string) => new Date(date).toLocaleDateString('fr-FR');
  const formatAmount = (amount: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);

  const handleEditClick = useCallback(
    (id: string) => {
      handleEdit(id);
    },
    [handleEdit]
  );

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Factures</CardTitle>
          <CardDescription className="text-slate-400">
            Gérez vos factures et devis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm text-left">
            <thead className="text-slate-400">
              <tr>
                <th className="px-4 py-2">Numéro</th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Montant</th>
                <th className="px-4 py-2">Échéance</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-t border-slate-700">
                  <td className="px-4 py-2">{invoice.id}</td>
                  <td className="px-4 py-2">{invoice.client}</td>
                  <td className="px-4 py-2">{formatAmount(invoice.amount)}</td>
                  <td className="px-4 py-2">{formatDate(invoice.dueDate)}</td>
                  <td className="px-4 py-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditClick(invoice.id)}>
                      Modifier
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
