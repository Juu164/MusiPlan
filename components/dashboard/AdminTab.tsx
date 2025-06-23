'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Settings, 
  Users, 
  Shield, 
  Plus,
  Edit,
  Trash2,
  Crown,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  Search
} from 'lucide-react';

export default function AdminTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const members = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      role: 'admin',
      instrument: 'Guitare',
      status: 'active',
      joinDate: '2023-01-15',
      lastLogin: '2024-01-12',
      permissions: {
        editEvents: true,
        manageBilling: true,
        manageMembers: true,
        viewResources: true,
        editResources: true
      },
      avatar: 'JD'
    },
    {
      id: '2',
      name: 'Sarah Martin',
      email: 'sarah.martin@email.com',
      role: 'member',
      instrument: 'Chant',
      status: 'active',
      joinDate: '2023-03-22',
      lastLogin: '2024-01-11',
      permissions: {
        editEvents: true,
        manageBilling: false,
        manageMembers: false,
        viewResources: true,
        editResources: true
      },
      avatar: 'SM'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      role: 'member',
      instrument: 'Batterie',
      status: 'active',
      joinDate: '2023-02-10',
      lastLogin: '2024-01-10',
      permissions: {
        editEvents: false,
        manageBilling: false,
        manageMembers: false,
        viewResources: true,
        editResources: false
      },
      avatar: 'MW'
    },
    {
      id: '4',
      name: 'Emma Brown',
      email: 'emma.brown@email.com',
      role: 'moderator',
      instrument: 'Basse',
      status: 'active',
      joinDate: '2023-04-05',
      lastLogin: '2024-01-09',
      permissions: {
        editEvents: true,
        manageBilling: false,
        manageMembers: true,
        viewResources: true,
        editResources: true
      },
      avatar: 'EB'
    },
    {
      id: '5',
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      role: 'member',
      instrument: 'Clavier',
      status: 'inactive',
      joinDate: '2023-05-18',
      lastLogin: '2023-12-15',
      permissions: {
        editEvents: false,
        manageBilling: false,
        manageMembers: false,
        viewResources: true,
        editResources: false
      },
      avatar: 'AJ'
    }
  ];

  const roles = [
    { id: 'all', label: 'Tous les rôles', count: members.length },
    { id: 'admin', label: 'Administrateurs', count: members.filter(m => m.role === 'admin').length },
    { id: 'moderator', label: 'Modérateurs', count: members.filter(m => m.role === 'moderator').length },
    { id: 'member', label: 'Membres', count: members.filter(m => m.role === 'member').length }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'moderator':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'member':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrateur';
      case 'moderator':
        return 'Modérateur';
      case 'member':
        return 'Membre';
      default:
        return 'Inconnu';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return Crown;
      case 'moderator':
        return Shield;
      default:
        return Users;
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-500/10 text-green-400 border-green-500/30'
      : 'bg-red-500/10 text-red-400 border-red-500/30';
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.instrument.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Administration</h2>
          <p className="text-slate-400">Gérez les membres, rôles et permissions du groupe</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Inviter un membre
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total membres</p>
                <p className="text-2xl font-bold text-white">{members.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Actifs</p>
                <p className="text-2xl font-bold text-white">
                  {members.filter(m => m.status === 'active').length}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Administrateurs</p>
                <p className="text-2xl font-bold text-white">
                  {members.filter(m => m.role === 'admin').length}
                </p>
              </div>
              <Crown className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Inactifs</p>
                <p className="text-2xl font-bold text-white">
                  {members.filter(m => m.status === 'inactive').length}
                </p>
              </div>
              <UserX className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Rechercher un membre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                {roles.map((role) => (
                  <Button
                    key={role.id}
                    variant={selectedRole === role.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedRole(role.id)}
                    className={selectedRole === role.id 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                    }
                  >
                    {role.label} ({role.count})
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members List */}
      <div className="space-y-4">
        {filteredMembers.map((member) => {
          const RoleIcon = getRoleIcon(member.role);
          
          return (
            <Card key={member.id} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{member.avatar}</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{member.name}</h3>
                        <Badge className={getRoleColor(member.role)}>
                          <RoleIcon className="h-3 w-3 mr-1" />
                          {getRoleLabel(member.role)}
                        </Badge>
                        <Badge className={getStatusColor(member.status)}>
                          {member.status === 'active' ? 'Actif' : 'Inactif'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-slate-300">
                          <Mail className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">{member.email}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-slate-300">
                          <Settings className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">{member.instrument}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-slate-300">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">Rejoint le {formatDate(member.joinDate)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-slate-300">
                          <UserCheck className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">Dernière connexion: {formatDate(member.lastLogin)}</span>
                        </div>
                      </div>
                      
                      {/* Permissions */}
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                        <h4 className="text-sm font-medium text-white mb-3">Permissions</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">Événements</span>
                            <Switch 
                              checked={member.permissions.editEvents} 
                              size="sm"
                              className="data-[state=checked]:bg-green-600"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">Facturation</span>
                            <Switch 
                              checked={member.permissions.manageBilling} 
                              size="sm"
                              className="data-[state=checked]:bg-green-600"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">Membres</span>
                            <Switch 
                              checked={member.permissions.manageMembers} 
                              size="sm"
                              className="data-[state=checked]:bg-green-600"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">Voir ressources</span>
                            <Switch 
                              checked={member.permissions.viewResources} 
                              size="sm"
                              className="data-[state=checked]:bg-green-600"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">Éditer ressources</span>
                            <Switch 
                              checked={member.permissions.editResources} 
                              size="sm"
                              className="data-[state=checked]:bg-green-600"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {member.role !== 'admin' && (
                      <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-600/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredMembers.length === 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Aucun membre trouvé</h3>
              <p className="text-slate-400 mb-4">
                Aucun membre ne correspond à vos critères de recherche.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Inviter un membre
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}