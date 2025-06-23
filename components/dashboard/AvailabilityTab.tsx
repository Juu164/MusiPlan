'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, 
  Clock, 
  Users, 
  Check,
  X,
  Plus
} from 'lucide-react';

export default function AvailabilityTab() {
  const [selectedWeek, setSelectedWeek] = useState('2024-01-15');

  const timeSlots = [
    { id: '1', day: 'Lundi', time: '19:00-22:00', type: 'regular' },
    { id: '2', day: 'Mardi', time: '20:00-23:00', type: 'regular' },
    { id: '3', day: 'Mercredi', time: '18:30-21:30', type: 'regular' },
    { id: '4', day: 'Jeudi', time: '19:00-22:00', type: 'regular' },
    { id: '5', day: 'Vendredi', time: '20:00-23:00', type: 'regular' },
    { id: '6', day: 'Samedi', time: '14:00-18:00', type: 'regular' },
    { id: '7', day: 'Dimanche', time: '15:00-18:00', type: 'regular' },
  ];

  const members = [
    { id: '1', name: 'John Doe', instrument: 'Guitare', avatar: 'JD' },
    { id: '2', name: 'Sarah Martin', instrument: 'Chant', avatar: 'SM' },
    { id: '3', name: 'Mike Wilson', instrument: 'Batterie', avatar: 'MW' },
    { id: '4', name: 'Emma Brown', instrument: 'Basse', avatar: 'EB' },
    { id: '5', name: 'Alex Johnson', instrument: 'Clavier', avatar: 'AJ' },
  ];

  // Simulated availability data
  const availability = {
    '1': ['1', '2', '4', '5'], // Lundi: John, Sarah, Mike, Emma available
    '2': ['1', '3', '4'], // Mardi: John, Mike, Emma available
    '3': ['1', '2', '3', '5'], // Mercredi: John, Sarah, Mike, Alex available
    '4': ['2', '3', '4', '5'], // Jeudi: Sarah, Mike, Emma, Alex available
    '5': ['1', '2', '3', '4', '5'], // Vendredi: All available
    '6': ['1', '2', '4'], // Samedi: John, Sarah, Emma available
    '7': ['2', '3', '5'], // Dimanche: Sarah, Mike, Alex available
  };

  const getAvailabilityCount = (slotId: string) => {
    return availability[slotId]?.length || 0;
  };

  const getAvailabilityColor = (count: number, total: number) => {
    const percentage = (count / total) * 100;
    if (percentage >= 80) return 'text-green-400 bg-green-500/10 border-green-500/30';
    if (percentage >= 60) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    return 'text-red-400 bg-red-500/10 border-red-500/30';
  };

  const isUserAvailable = (slotId: string, userId: string) => {
    return availability[slotId]?.includes(userId) || false;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Disponibilités</h2>
          <p className="text-slate-400">Gérez les créneaux horaires de votre groupe</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau créneau
        </Button>
      </div>

      {/* Week selector */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Semaine du 15 au 21 janvier 2024
          </CardTitle>
          <CardDescription className="text-slate-400">
            Cliquez sur les cases pour modifier vos disponibilités
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Availability Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Slots */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Créneaux hebdomadaires</CardTitle>
            <CardDescription className="text-slate-400">
              Vue d'ensemble des disponibilités par créneau
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {timeSlots.map((slot) => {
                const availableCount = getAvailabilityCount(slot.id);
                const totalMembers = members.length;
                
                return (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:bg-slate-900/70 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <div>
                        <p className="font-medium text-white">{slot.day}</p>
                        <p className="text-sm text-slate-400">{slot.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getAvailabilityColor(availableCount, totalMembers)}>
                        <Users className="h-3 w-3 mr-1" />
                        {availableCount}/{totalMembers}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Member Availability Matrix */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Disponibilités par membre</CardTitle>
            <CardDescription className="text-slate-400">
              Matrice détaillée des disponibilités
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left text-slate-300 font-medium pb-3">Membre</th>
                    {timeSlots.slice(0, 4).map((slot) => (
                      <th key={slot.id} className="text-center text-slate-300 font-medium pb-3 px-2">
                        <div className="text-xs">{slot.day.substring(0, 3)}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="border-t border-slate-700">
                      <td className="py-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{member.avatar}</span>
                          </div>
                          <div>
                            <p className="text-white text-sm font-medium">{member.name}</p>
                            <p className="text-slate-400 text-xs">{member.instrument}</p>
                          </div>
                        </div>
                      </td>
                      {timeSlots.slice(0, 4).map((slot) => (
                        <td key={slot.id} className="text-center py-3 px-2">
                          <div className="flex justify-center">
                            {isUserAvailable(slot.id, member.id) ? (
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                <X className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personal Availability */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Mes disponibilités</CardTitle>
          <CardDescription className="text-slate-400">
            Gérez vos propres créneaux de disponibilité
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timeSlots.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700"
              >
                <div>
                  <p className="font-medium text-white">{slot.day}</p>
                  <p className="text-sm text-slate-400">{slot.time}</p>
                </div>
                <Checkbox
                  checked={isUserAvailable(slot.id, '1')} // Assuming current user is ID '1'
                  className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}