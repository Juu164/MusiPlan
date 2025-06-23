'use client';

import { useCallback, useEffect, useState } from 'react';
import { Eye, Send, Printer, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useInvoiceActions } from '@/hooks/useInvoiceActions';
import { Invoice } from '@/types/invoice';

/**
 * Onglet de gestion des factures et devis.
 * Fournit un aperçu de chaque facture avec des actions rapides.
 */
export default function FacturesTab() {
  const {
    handlePreview,
    handleSend,
    handlePrint,
    handleEdit,
    handleDelete,
  } = useInvoiceActions();

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // Chargement d'exemple pour démonstration
  useEffect(() => {
    setInvoices([
      {
        id: 'INV-001',
        client: 'Mairie de Paris',
        event: 'Concert place de la Bastille',
        amount: 1500,
        status: 'envoyee',
        dueDate: '2024-03-10',
        createdDate: '2024-02-01',
        type: 'invoice',
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
        type: 'invoice',
      },
    ]);
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('fr-FR');
  const formatAmount = (amount: number) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);

  const onPreview = useCallback((id: string) => handlePreview(id), [handlePreview]);
  const onSend = useCallback((id: string) => {
    handleSend(id).catch(console.error);
  }, [handleSend]);
  const onPrint = useCallback((id: string) => handlePrint(id), [handlePrint]);
  const onEdit = useCallback((id: string) => handleEdit(id), [handleEdit]);
  const onDelete = useCallback((id: string) => {
    handleDelete(id).catch(console.error);
  }, [handleDelete]);

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
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Prévisualiser la facture"
                        onClick={() => onPreview(invoice.id)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Envoyer la facture"
                        onClick={() => onSend(invoice.id)}
                        className="border-green-600 text-green-400 hover:bg-green-600/10"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Imprimer la facture"
                        onClick={() => onPrint(invoice.id)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Modifier la facture"
                        onClick={() => onEdit(invoice.id)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Supprimer la facture"
                        onClick={() => onDelete(invoice.id)}
                        className="border-red-600 text-red-400 hover:bg-red-600/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
