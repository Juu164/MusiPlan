import { notFound } from 'next/navigation';
import { Invoice } from '@/types/invoice';

async function getInvoice(id: string): Promise<Invoice | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/invoices/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function InvoiceDetail({ params }: { params: { id: string } }) {
  const invoice = await getInvoice(params.id);
  if (!invoice) return notFound();
  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Facture {invoice.id}</h1>
      <pre className="bg-slate-800 p-4 rounded-lg text-sm">{JSON.stringify(invoice, null, 2)}</pre>
    </div>
  );
}
