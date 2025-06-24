'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AvailabilityTab from '@/components/dashboard/AvailabilityTab';
import ConcertsTab from '@/components/dashboard/ConcertsTab';
import ContactsTab from '@/components/dashboard/ContactsTab';
import ResourcesTab from '@/components/dashboard/ResourcesTab';
import BillingTab from '@/components/dashboard/BillingTab';
import AdminTab from '@/components/dashboard/AdminTab';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import ContentEditor from '@/components/cms/ContentEditor';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'availability':
        return <AvailabilityTab />;
      case 'concerts':
        return <ConcertsTab />;
      case 'contacts':
        return <ContactsTab />;
      case 'resources':
        return <ResourcesTab />;
      case 'billing':
        return <BillingTab />;
      case 'cms':
        return <ContentEditor />;
      case 'admin':
        return <AdminTab />;
      case 'super-admin':
        return <AdminDashboard />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </DashboardLayout>
  );
}