import { ReactNode } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { QueryProvider } from '@/lib/QueryProvider';
import { Toaster } from '@/components/ui/toaster';

export default function DashboardRoot({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <DashboardLayout>{children}</DashboardLayout>
      <Toaster />
    </QueryProvider>
  );
}