'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  CreditCard, 
  Plus,
  Download,
  Send,
  Eye,
  Edit,
  TrendingUp,
  Calendar,
  Euro,
  FileText,
  Search,
  Filter
} from 'lucide-react';

export default function BillingTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const invoices = [
    {
      id: 'INV-2024-001',
      client: 'Mairie de Paris 12e',
      event: 'Concert Fête de la Musique',
      amount: 1500,
      status: 'paid',
      dueDate: '2024-01-15',
      paidDate: '2024-01-10',
      createdDate: '2023-12-15',
      type: 'invoice'
    },
    {
      id: 'QUO-2024-002',
      client: 'Famille Dupont',
      event: 'Mariage privé - Château de Vincennes',
      amount: 2200,
      status: 'pending',
      dueDate: '2024-02-01',
      createdDate: '2024-01-05',
      type: 'quote'
    },
    {
      id: 'INV-2024-003',
      client: 'Studio Central',
      event: 'Enregistrement EP "Nouvelles Routes"',
      amount: 800,
      status: 'sent',
      dueDate: '2024-01-25',
      createdDate: '2024-01-08',
      type: 'invoice'
    },
    {
      id: 'INV-2023-045',
      client: 'Bar Le Sunset',
      event: 'Concert acoustique - Soirée jazz',
      amount: 650,
      status: 'overdue',
      dueDate: '2023-12-30',
      createdDate: '2023-12-01',
      type: 'invoice'
    },
    {
      id: 'QUO-2024-004',
      client: 'Festival des Arts',
      event: 'Prestation festival été 2024',
      amount: 3500,
      status: 'draft',
      dueDate: '2024-03-01',
      createdDate: '2024-01-12',
      type: 'quote'
    }
  ];

  const stats = [
    {
      title: 'Chiffre d\'affaires total',
      value: '8,650€',
      description: 'Cette année',
      icon: Euro,
      color: 'text-green-400'
    },
    {
      title: 'En attente de paiement',
      value: '3,650€',
      description: '4 factures',
      icon: CreditCard,
      color: 'text-yellow-400'
    },
    {
      title: 'Factures payées',
      value: '2,150€',
      description: 'Ce mois',
      icon: TrendingUp,
      color: 'text-blue-400'
    },
    {
      title: 'Devis en cours',
      value: '5,700€',
      description: '2 devis',
      icon: FileText,
      color: 'text-violet-400'
    }
  ];

  const statusOptions = [
    { id: 'all', label: 'Toutes', count: invoices.length },
    { id: 'paid', label: 'Payées', count: invoices.filter(i => i.status === 'paid').length },
    { id: 'sent', label: 'Envoyées', count: invoices.filter(i => i.status === 'sent').length },
    { id: 'pending', label: 'En attente', count: invoices.filter(i => i.status === 'pending').length },
    { id: 'overdue', label: 'En retard', count: invoices.filter(i => i.status === 'overdue').length },
    { id: 'draft', label: 'Brouillon', count: invoices.filter(i => i.status === 'draft').length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'sent':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'overdue':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'draft':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Payée';
      case 'sent':
        return 'Envoyée';
      case 'pending':
        return 'En attente';
      case 'overdue':
        return 'En retard';
      case 'draft':
        return 'Brouillon';
      default:
        return 'Inconnu';
    }
  };

  const getTypeLabel = (type: string) => {
    return type === 'invoice' ? 'Facture' : 'Devis';
  };

  const getTypeColor = (type: string) => {
    return type === 'invoice' 
      ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
      : 'bg-violet-500/10 text-violet-400 border-violet-500/30';
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Facturation & Devis</h2>
          <p className="text-slate-400">Gérez vos devis et factures professionnels</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau devis
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-slate-400 mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Rechercher factures et devis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <Button
                    key={status.id}
                    variant={selectedStatus === status.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedStatus(status.id)}
                    className={selectedStatus === status.id 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                    }
                  >
                    {status.label} ({status.count})
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Factures et Devis</CardTitle>
          <CardDescription className="text-slate-400">
            Gérez toutes vos transactions financières
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:bg-slate-900/70 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-white">{invoice.id}</h3>
                    <Badge className={getTypeColor(invoice.type)}>
                      {getTypeLabel(invoice.type)}
                    </Badge>
                    <Badge className={getStatusColor(invoice.status)}>
                      {getStatusLabel(invoice.status)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-300">{invoice.client}</p>
                      <p className="text-xs text-slate-400">{invoice.event}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-bold text-green-400">{formatAmount(invoice.amount)}</p>
                      <p className="text-xs text-slate-400">Montant</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-300">{formatDate(invoice.createdDate)}</p>
                      <p className="text-xs text-slate-400">Créée le</p>
                    </div>
                    
                    <div>
                      {invoice.status === 'paid' && invoice.paidDate ? (
                        <>
                          <p className="text-sm text-green-400">{formatDate(invoice.paidDate)}</p>
                          <p className="text-xs text-slate-400">Payée le</p>
                        </>
                      ) : (
                        <>
                          <p className={`text-sm ${
                            invoice.status === 'overdue' ? 'text-red-400' : 'text-slate-300'
                          }`}>
                            {formatDate(invoice.dueDate)}
                          </p>
                          <p className="text-xs text-slate-400">Échéance</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Download className="h-4 w-4" />
                  </Button>
                  {invoice.status !== 'paid' && invoice.status !== 'draft' && (
                    <Button variant="outline" size="sm" className="border-green-600 text-green-400 hover:bg-green-600/10">
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredInvoices.length === 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <CreditCard className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Aucune facture trouvée</h3>
              <p className="text-slate-400 mb-4">
                {searchTerm 
                  ? "Aucune facture ne correspond à votre recherche."
                  : "Commencez par créer votre première facture ou devis."
                }
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Créer une facture
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}