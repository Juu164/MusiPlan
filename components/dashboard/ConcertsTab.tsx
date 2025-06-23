'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Music,
  Plus,
  Eye,
  Edit,
  Star
} from 'lucide-react';

export default function ConcertsTab() {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  const events = [
    {
      id: '1',
      title: 'Fête de la Musique 2024',
      type: 'concert',
      date: '2024-06-21',
      time: '21:00',
      endTime: '23:30',
      location: 'Place de la République',
      address: '75003 Paris',
      attendees: 10,
      status: 'confirmed',
      fee: '1500€',
      description: 'Concert en plein air pour la fête de la musique. Set de 2h30.',
      setlist: ['Song 1', 'Song 2', 'Song 3'],
      priority: 'high'
    },
    {
      id: '2',
      title: 'Répétition générale',
      type: 'rehearsal',
      date: '2024-01-15',
      time: '19:00',
      endTime: '22:00',
      location: 'Studio Central',
      address: '12 rue de la Musique, 75011 Paris',
      attendees: 8,
      status: 'confirmed',
      fee: null,
      description: 'Dernière répétition avant le concert de samedi.',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Session d\'enregistrement',
      type: 'recording',
      date: '2024-01-22',
      time: '14:00',
      endTime: '18:00',
      location: 'Studio Waves',
      address: '45 avenue des Studios, 75020 Paris',
      attendees: 5,
      status: 'pending',
      fee: '800€',
      description: 'Enregistrement de 3 nouvelles compositions.',
      priority: 'high'
    },
    {
      id: '4',
      title: 'Concert privé - Mariage',
      type: 'concert',
      date: '2024-02-14',
      time: '20:00',
      endTime: '01:00',
      location: 'Château de Vincennes',
      address: 'Avenue de Paris, 94300 Vincennes',
      attendees: 6,
      status: 'confirmed',
      fee: '2200€',
      description: 'Prestation pour mariage, ambiance jazz et variété française.',
      priority: 'high'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmé';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulé';
      default:
        return 'Inconnu';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Concerts & Événements</h2>
          <p className="text-slate-400">Planifiez et gérez tous vos événements musicaux</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
            className="bg-slate-700 border-slate-600"
          >
            Liste
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            onClick={() => setViewMode('calendar')}
            className="bg-slate-700 border-slate-600"
          >
            Calendrier
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel événement
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total événements</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Ce mois</p>
                <p className="text-2xl font-bold text-white">5</p>
              </div>
              <Clock className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Concerts</p>
                <p className="text-2xl font-bold text-white">8</p>
              </div>
              <Music className="h-8 w-8 text-violet-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Revenus</p>
                <p className="text-2xl font-bold text-white">8,500€</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-bold text-white">{event.title}</h3>
                    <Badge className={getEventTypeColor(event.type)}>
                      {getEventTypeLabel(event.type)}
                    </Badge>
                    <Badge className={getStatusColor(event.status)}>
                      {getStatusLabel(event.status)}
                    </Badge>
                    {event.priority === 'high' && (
                      <Star className="h-4 w-4 text-yellow-400" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium">{formatDate(event.date)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-sm">{event.time} - {event.endTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-slate-300">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium">{event.location}</p>
                        <p className="text-xs text-slate-400">{event.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Users className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="text-sm">{event.attendees} participants</p>
                        {event.fee && (
                          <p className="text-sm font-bold text-green-400">{event.fee}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {event.description && (
                    <p className="text-slate-400 text-sm mb-4">{event.description}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}