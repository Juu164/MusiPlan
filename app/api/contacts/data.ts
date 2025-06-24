import { Contact } from '@/types/contact';

export let contacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Martin',
    type: 'member',
    role: 'Chanteuse principale',
    email: 'sarah.martin@email.com',
    phone: '+33 6 12 34 56 78',
    address: '12 rue de la Musique, 75011 Paris',
    avatar: 'SM',
    status: 'active',
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Studio Central',
    type: 'venue',
    role: 'Studio de répétition',
    email: 'contact@studiocentral.fr',
    phone: '+33 1 42 85 96 74',
    address: '45 avenue des Arts, 75011 Paris',
    avatar: 'SC',
    status: 'active',
    services: ['Répétition', 'Enregistrement'],
    hourlyRate: '25€/h'
  },
  {
    id: '3',
    name: 'Mike Wilson',
    type: 'member',
    role: 'Batteur',
    email: 'mike.wilson@email.com',
    phone: '+33 6 87 65 43 21',
    address: '8 boulevard Saint-Michel, 75006 Paris',
    avatar: 'MW',
    status: 'active',
    joinDate: '2023-03-22'
  },
  {
    id: '4',
    name: 'Salle des Fêtes Mairie 12e',
    type: 'venue',
    role: 'Salle de concert',
    email: 'evenements@mairie12.paris.fr',
    phone: '+33 1 44 68 12 34',
    address: '130 avenue Daumesnil, 75012 Paris',
    avatar: 'SF',
    status: 'active',
    capacity: '200 personnes',
    services: ['Concert', 'Événement privé']
  },
  {
    id: '5',
    name: 'Jean Dupont',
    type: 'provider',
    role: 'Ingénieur du son',
    email: 'jean.dupont@soundtech.fr',
    phone: '+33 6 45 78 96 32',
    address: '23 rue Oberkampf, 75011 Paris',
    avatar: 'JD',
    status: 'active',
    services: ['Sonorisation', 'Enregistrement'],
    dailyRate: '350€/jour'
  },
  {
    id: '6',
    name: 'Emma Brown',
    type: 'member',
    role: 'Bassiste',
    email: 'emma.brown@email.com',
    phone: '+33 6 23 45 67 89',
    address: '67 rue de Charonne, 75011 Paris',
    avatar: 'EB',
    status: 'inactive',
    joinDate: '2022-11-10'
  }
];
