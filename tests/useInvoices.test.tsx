import { describe, expect, it, vi } from 'vitest';
import React from "react";
import { useInvoices } from '../src/features/invoices/hooks/useInvoices';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) })));

describe('useInvoices', () => {
  it('fetches invoices', async () => {
    const client = new QueryClient();
    const { result } = renderHook(() => useInvoices(), {
      wrapper: ({ children }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([]);
  });
});
