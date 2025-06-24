import { Invoice } from '@/types/invoice';

export let invoices: Invoice[] = [
  {
    id: 'INV-001',
    client: 'Acme Corp',
    event: 'Concert annuel',
    amount: 5000,
    status: 'paid',
    dueDate: '2024-01-10',
    createdDate: '2023-12-01'
  },
  {
    id: 'INV-002',
    client: 'Studio Central',
    event: 'Enregistrement',
    amount: 2000,
    status: 'sent',
    dueDate: '2024-02-15',
    createdDate: '2024-01-05'
  }
];
