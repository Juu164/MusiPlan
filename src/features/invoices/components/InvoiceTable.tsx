'use client';
import React from 'react';
import { useInvoices } from '../hooks/useInvoices';
import { useInvoiceActions } from '@/hooks/useInvoiceActions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Eye, Send, Printer, Trash2 } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

export function InvoiceTable() {
  const { data, isLoading } = useInvoices();
  const actions = useInvoiceActions();

  if (isLoading) return <Spinner />;

  return (
    <Table className="text-white">
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Montant</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map(inv => (
          <TableRow key={inv.id}>
            <TableCell>
              <Link href={`/invoices/${inv.id}`} className="underline">
                {inv.id}
              </Link>
            </TableCell>
            <TableCell>{inv.client}</TableCell>
            <TableCell>{inv.amount}€</TableCell>
            <TableCell>
              <Badge>{inv.status}</Badge>
            </TableCell>
            <TableCell className="space-x-2">
              <Button size="icon" variant="ghost" onClick={() => actions.handlePreview(inv.id)} aria-label="Prévisualiser">
                <Eye className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => actions.handleSend(inv.id)} aria-label="Envoyer">
                <Send className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => actions.handlePrint(inv.id)} aria-label="Imprimer">
                <Printer className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => actions.handleDelete(inv.id)} aria-label="Supprimer">
                <Trash2 className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
