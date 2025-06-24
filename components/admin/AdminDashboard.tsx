'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp,
  Activity,
  Eye,
  Download,
  Settings,
  Shield,
  Database,
  Globe
} from 'lucide-react';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      title: 'Utilisateurs actifs',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      description: 'Cette semaine'
    },
    {
      title: 'Pages vues',
      value: '45,678',
      change: '+8%',
      changeType: 'positive',
      icon: Eye,
      description: 'Cette semaine'
    },
    {
      title: 'Contenu publié',
      value: '89',
      change: '+5',
      changeType: 'positive',
      icon: FileText,
      description: 'Nouveaux articles'
    },
    {
      title: 'Événements créés',
      value: '23',
      change: '+3',
      changeType: 'positive',
      icon: Calendar,
      description: 'Ce mois'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      user: 'Sarah Martin',
      action: 'a publié un nouvel article',
      target: 'Concert à Paris',
      time: 'Il y a 2h',
      type: 'content'
    },
    {
      id: '2',
      user: 'John Doe',
      action: 'a créé un événement',
      target: 'Répétition générale',
      time: 'Il y a 4h',
      type: 'event'
    },
    {
      id: '3',
      user: 'Mike Wilson',
      action: 'a modifié ses disponibilités',
      target: 'Semaine du 15 janvier',
      time: 'Il y a 6h',
      type: 'availability'
    },
    {
      id: '4',
      user: 'Emma Brown',
      action: 'a ajouté un contact',
      target: 'Studio Waves',
      time: 'Il y a 8h',
      type: 'contact'
    },
    {
      id: '5',
      user: 'Admin',
      action: 'a généré une facture',
      target: 'INV-2024-001',
      time: 'Il y a 1j',
      type: 'billing'
    }
  ];

  const systemHealth = [
    {
      name: 'Base de données',
      status: 'healthy',
      value: '99.9%',
      description: 'Temps de réponse moyen: 45ms'
    },
    {
      name: 'API',
      status: 'healthy',
      value: '100%',
      description: 'Toutes les routes fonctionnelles'
    },
    {
      name: 'Stockage',
      status: 'warning',
      value: '78%',
      description: '2.1GB utilisés sur 2.7GB'
    },
    {
      name: 'CDN',
      status: 'healthy',
      value: '99.8%',
      description: 'Temps de chargement optimal'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'content':
        return FileText;
      case 'event':
        return Calendar;
      case 'availability':
        return Activity;
      case 'contact':
        return Users;
      case 'billing':
        return TrendingUp;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'content':
        return 'bg-blue-500/10 text-blue-400';
      case 'event':
        return 'bg-green-500/10 text-green-400';
      case 'availability':
        return 'bg-violet-500/10 text-violet-400';
      case 'contact':
        return 'bg-yellow-500/10 text-yellow-400';
      case 'billing':
        return 'bg-red-500/10 text-red-400';
      default:
        return 'bg-slate-500/10 text-slate-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'error':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Tableau de bord Admin</h2>
          <p className="text-slate-400">Vue d'ensemble de votre plateforme MusiPlan</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-xs font-medium ${
                  stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs text-slate-400">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Activité récente</CardTitle>
            <CardDescription className="text-slate-400">
              Dernières actions des utilisateurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const ActivityIcon = getActivityIcon(activity.type);
                
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                      <ActivityIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300">
                        <span className="font-medium text-white">{activity.user}</span>
                        {' '}{activity.action}{' '}
                        <span className="font-medium text-blue-400">{activity.target}</span>
                      </p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">État du système</CardTitle>
            <CardDescription className="text-slate-400">
              Surveillance des performances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((system, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {system.name === 'Base de données' && <Database className="h-4 w-4 text-slate-400" />}
                      {system.name === 'API' && <Globe className="h-4 w-4 text-slate-400" />}
                      {system.name === 'Stockage' && <Activity className="h-4 w-4 text-slate-400" />}
                      {system.name === 'CDN' && <TrendingUp className="h-4 w-4 text-slate-400" />}
                      <span className="font-medium text-white">{system.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">{system.value}</p>
                      <p className="text-xs text-slate-400">{system.description}</p>
                    </div>
                    <Badge className={getStatusColor(system.status)}>
                      {system.status === 'healthy' ? 'OK' : 
                       system.status === 'warning' ? 'Attention' : 'Erreur'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Actions rapides</CardTitle>
          <CardDescription className="text-slate-400">
            Accès direct aux fonctions d'administration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2 border-slate-600 text-slate-300 hover:bg-slate-700">
              <Users className="h-5 w-5" />
              <span className="text-sm">Gérer utilisateurs</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 border-slate-600 text-slate-300 hover:bg-slate-700">
              <FileText className="h-5 w-5" />
              <span className="text-sm">Modérer contenu</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 border-slate-600 text-slate-300 hover:bg-slate-700">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Sécurité</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 border-slate-600 text-slate-300 hover:bg-slate-700">
              <Database className="h-5 w-5" />
              <span className="text-sm">Sauvegarde</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}