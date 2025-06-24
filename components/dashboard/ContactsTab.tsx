'use client';

import { useState, useEffect } from 'react';
import { Contact } from '@/types/contact';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Search, 
  Plus,
  Phone,
  Mail,
  MapPin,
  Filter,
  User,
  Building,
  Music
} from 'lucide-react';

export default function ContactsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    fetch('/api/contacts')
      .then(res => res.json())
      .then(data => setContacts(data));
  }, []);

  const handleAddContact = async () => {
    const body = {
      name: newName,
      email: newEmail,
      role: newRole,
      type: 'member'
    };
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (res.ok) {
      const created = await res.json();
      setContacts(prev => [...prev, created]);
      setShowForm(false);
      setNewName('');
      setNewEmail('');
      setNewRole('');
    }
  };

  const categories = [
    { id: 'all', label: 'Tous', count: contacts.length },
    { id: 'member', label: 'Membres', count: contacts.filter(c => c.type === 'member').length },
    { id: 'venue', label: 'Lieux', count: contacts.filter(c => c.type === 'venue').length },
    { id: 'provider', label: 'Prestataires', count: contacts.filter(c => c.type === 'provider').length }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'member':
        return User;
      case 'venue':
        return Building;
      case 'provider':
        return Music;
      default:
        return User;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'member':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'venue':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'provider':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'member':
        return 'Membre';
      case 'venue':
        return 'Lieu';
      case 'provider':
        return 'Prestataire';
      default:
        return 'Contact';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-500/10 text-green-400 border-green-500/30'
      : 'bg-red-500/10 text-red-400 border-red-500/30';
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || contact.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Carnet de Contacts</h2>
          <p className="text-slate-400">Gérez tous vos contacts musicaux en un seul endroit</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau contact
        </Button>
      </div>

      {showForm && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6 space-y-4">
            <Input
              placeholder="Nom"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-slate-900/50 border-slate-600 text-white"
            />
            <Input
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="bg-slate-900/50 border-slate-600 text-white"
            />
            <Input
              placeholder="Rôle"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="bg-slate-900/50 border-slate-600 text-white"
            />
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddContact}>
              Ajouter
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Rechercher un contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                    }
                  >
                    {category.label} ({category.count})
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => {
          const TypeIcon = getTypeIcon(contact.type);
          
          return (
            <Card key={contact.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{contact.avatar}</span>
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{contact.name}</CardTitle>
                      <CardDescription className="text-slate-400">{contact.role}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(contact.status)}>
                    {contact.status === 'active' ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={getTypeColor(contact.type)}>
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {getTypeLabel(contact.type)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span className="text-sm">{contact.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-slate-300">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-slate-300">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-sm">{contact.address}</span>
                    </div>
                  </div>

                  {/* Additional info based on type */}
                  {contact.type === 'member' && contact.joinDate && (
                    <div className="pt-2 border-t border-slate-700">
                      <p className="text-xs text-slate-400">
                        Membre depuis: {new Date(contact.joinDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  )}

                  {contact.type === 'venue' && (contact.capacity || contact.services) && (
                    <div className="pt-2 border-t border-slate-700">
                      {contact.capacity && (
                        <p className="text-xs text-slate-400 mb-1">Capacité: {contact.capacity}</p>
                      )}
                      {contact.services && (
                        <div className="flex flex-wrap gap-1">
                          {contact.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-400">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {contact.type === 'provider' && (contact.dailyRate || contact.hourlyRate || contact.services) && (
                    <div className="pt-2 border-t border-slate-700">
                      {(contact.dailyRate || contact.hourlyRate) && (
                        <p className="text-xs text-green-400 mb-1 font-medium">
                          {contact.dailyRate || contact.hourlyRate}
                        </p>
                      )}
                      {contact.services && (
                        <div className="flex flex-wrap gap-1">
                          {contact.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-400">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredContacts.length === 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Aucun contact trouvé</h3>
              <p className="text-slate-400 mb-4">
                Aucun contact ne correspond à vos critères de recherche.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un contact
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}