import { describe, it, expect, vi } from 'vitest';
import React from "react";
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { InvoiceTable } from '../src/features/invoices/components/InvoiceTable';

vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([{ id: 'INV-1', client: 'A', amount: 10, status: 'paid', dueDate: '' }]) })));

describe('InvoiceTable', () => {
  it('renders invoices', async () => {
    const client = new QueryClient();
    render(
      <QueryClientProvider client={client}>
        <InvoiceTable />
      </QueryClientProvider>
    );
    expect(await screen.findByText('INV-1')).toBeInTheDocument();
  });
});
