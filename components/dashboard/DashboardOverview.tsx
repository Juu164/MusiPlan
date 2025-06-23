'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  Music, 
  TrendingUp,
  Clock,
  MapPin,
  Plus,
  AlertCircle
} from 'lucide-react';

export default function DashboardOverview() {
  const stats = [
    {
      title: 'Prochains concerts',
      value: '3',
      description: 'Dans les 30 prochains jours',
      icon: Music,
      color: 'text-blue-400'
    },
    {
      title: 'Membres actifs',
      value: '8/10',
      description: 'Disponibilités renseignées',
      icon: Users,
      color: 'text-green-400'
    },
    {
      title: 'Répétitions planifiées',
      value: '5',
      description: 'Ce mois-ci',
      icon: Calendar,
      color: 'text-violet-400'
    },
    {
      title: 'Chiffre d\'affaires',
      value: '2,850€',
      description: '+12% ce mois',
      icon: TrendingUp,
      color: 'text-yellow-400'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Répétition générale',
      date: '2024-01-15',
      time: '19:00',
      location: 'Studio Central',
      type: 'rehearsal',
      attendees: 7
    },
    {
      title: 'Concert - Fête de la Musique',
      date: '2024-01-18',
      time: '21:00',
      location: 'Place de la République',
      type: 'concert',
      attendees: 10
    },
    {
      title: 'Session d\'enregistrement',
      date: '2024-01-22',
      time: '14:00',
      location: 'Studio Waves',
      type: 'recording',
      attendees: 5
    }
  ];

  const notifications = [
    {
      message: 'Sarah n\'a pas encore confirmé sa disponibilité pour dimanche',
      type: 'warning',
      time: '2h'
    },
    {
      message: 'Nouvelle facture générée pour le concert du 18/01',
      type: 'info',
      time: '5h'
    },
    {
      message: 'Rappel: Répétition demain à 19h',
      type: 'reminder',
      time: '1j'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'concert':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'rehearsal':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'recording':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'concert':
        return 'Concert';
      case 'rehearsal':
        return 'Répétition';
      case 'recording':
        return 'Enregistrement';
      default:
        return 'Événement';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Événements à venir</CardTitle>
                <CardDescription className="text-slate-400">
                  Vos prochains rendez-vous musicaux
                </CardDescription>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-white">{event.title}</h4>
                      <Badge className={getEventTypeColor(event.type)}>
                        {getEventTypeLabel(event.type)}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.date} à {event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{event.attendees} participants</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Notifications</CardTitle>
            <CardDescription className="text-slate-400">
              Restez informé des dernières actualités
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700"
                >
                  <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-300">{notification.message}</p>
                    <p className="text-xs text-slate-500 mt-1">Il y a {notification.time}</p>
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
            Accédez rapidement aux fonctionnalités principales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2 border-slate-600 text-slate-300 hover:bg-slate-700">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Nouvelle répétition</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 border-slate-600 text-slate-300 hover:bg-slate-700">
              <Music className="h-5 w-5" />
              <span className="text-sm">Ajouter concert</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 border-slate-600 text-slate-300 hover:bg-slate-700">
              <Users className="h-5 w-5" />
              <span className="text-sm">Inviter membre</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2 border-slate-600 text-slate-300 hover:bg-slate-700">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">Nouvelle facture</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}