'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Tag,
  Calendar,
  Filter,
  BookOpen,
  Music,
  Lightbulb
} from 'lucide-react';

export default function ResourcesTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    content: '',
    category: 'note'
  });

  const resources = [
    {
      id: '1',
      title: 'Setlist Concert Fête de la Musique',
      content: 'Liste des morceaux pour le concert du 21 juin:\n\n1. Intro - "Sunrise"\n2. "Dancing Queen" (ABBA cover)\n3. "Our Original Song"\n4. "Hotel California" (Eagles cover)\n5. Finale - "Don\'t Stop Me Now"',
      category: 'setlist',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12',
      tags: ['concert', 'fête de la musique', 'setlist']
    },
    {
      id: '2',
      title: 'Partition - "Midnight Blues"',
      content: 'Accords et structure de notre composition originale "Midnight Blues":\n\nIntro: Am - F - C - G\nCouplet: Am - F - C - G (x2)\nRefrain: F - C - G - Am\nPont: Dm - Am - F - G\n\nTempo: 120 BPM\nTonalité: La mineur',
      category: 'partition',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-08',
      tags: ['composition', 'blues', 'partition']
    },
    {
      id: '3',
      title: 'Contact Matériel Sonorisation',
      content: 'Informations importantes pour location matériel:\n\nSonorisation Pro - 01 42 85 96 74\n- Table de mixage 16 pistes: 150€/jour\n- Enceintes RCF: 80€/jour la paire\n- Micros Shure SM58: 15€/jour\n- Câbles et accessoires inclus\n\nLivraison possible Paris intramuros: +50€',
      category: 'contact',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-05',
      tags: ['matériel', 'sonorisation', 'contact']
    },
    {
      id: '4',
      title: 'Idées pour nouvel album',
      content: 'Brainstorming pour le prochain EP:\n\n- Thème principal: voyage et liberté\n- 5 compositions prévues\n- Style: folk-rock avec touches électroniques\n- Collaborations possibles avec Sarah pour les violons\n- Budget enregistrement: 3000-4000€\n- Timeline: enregistrement été 2024',
      category: 'idea',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-06',
      tags: ['album', 'composition', 'projet']
    }
  ];

  const categories = [
    { id: 'all', label: 'Toutes', icon: FileText, count: resources.length },
    { id: 'note', label: 'Notes', icon: BookOpen, count: resources.filter(r => r.category === 'note').length },
    { id: 'partition', label: 'Partitions', icon: Music, count: resources.filter(r => r.category === 'partition').length },
    { id: 'setlist', label: 'Setlists', icon: FileText, count: resources.filter(r => r.category === 'setlist').length },
    { id: 'contact', label: 'Contacts', icon: FileText, count: resources.filter(r => r.category === 'contact').length },
    { id: 'idea', label: 'Idées', icon: Lightbulb, count: resources.filter(r => r.category === 'idea').length }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'partition':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'setlist':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'contact':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
      case 'idea':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.label : 'Note';
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateResource = () => {
    if (newResource.title.trim() && newResource.content.trim()) {
      // Here you would typically save to your backend
      setIsCreating(false);
      setNewResource({ title: '', content: '', category: 'note' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Ressources & Pense-bête</h2>
          <p className="text-slate-400">Centralisez toutes vos notes, partitions et idées</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsCreating(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle ressource
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Rechercher dans vos ressources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const CategoryIcon = category.icon;
                  return (
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
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      {category.label} ({category.count})
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create New Resource */}
      {isCreating && (
        <Card className="bg-slate-800/50 border-slate-700 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white">Nouvelle ressource</CardTitle>
            <CardDescription className="text-slate-400">
              Créez une nouvelle note, partition ou idée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Titre de la ressource (max. 150 caractères)"
                  value={newResource.title}
                  onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                  maxLength={150}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Contenu de la ressource (max. 3000 caractères)"
                  value={newResource.content}
                  onChange={(e) => setNewResource({...newResource, content: e.target.value})}
                  className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 min-h-[200px]"
                  maxLength={3000}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {categories.slice(1).map((category) => (
                    <Button
                      key={category.id}
                      variant={newResource.category === category.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNewResource({...newResource, category: category.id})}
                      className={newResource.category === category.id 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'border-slate-600 text-slate-300 hover:bg-slate-700'
                      }
                    >
                      {category.label}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsCreating(false)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Annuler
                  </Button>
                  <Button 
                    onClick={handleCreateResource}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!newResource.title.trim() || !newResource.content.trim()}
                  >
                    Créer
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-white text-lg">{resource.title}</CardTitle>
                    <Badge className={getCategoryColor(resource.category)}>
                      {getCategoryLabel(resource.category)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-slate-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Créé le {new Date(resource.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                    {resource.updatedAt !== resource.createdAt && (
                      <div className="flex items-center space-x-1">
                        <Edit className="h-3 w-3" />
                        <span>Modifié le {new Date(resource.updatedAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-slate-300 text-sm leading-relaxed max-h-40 overflow-y-auto">
                  {resource.content.split('\n').map((line, index) => (
                    <p key={index} className={line.trim() === '' ? 'h-2' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
                
                {resource.tags && resource.tags.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Tag className="h-3 w-3 text-slate-400" />
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">Aucune ressource trouvée</h3>
              <p className="text-slate-400 mb-4">
                {searchTerm 
                  ? "Aucune ressource ne correspond à votre recherche." 
                  : "Commencez par créer votre première ressource."
                }
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setIsCreating(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Créer une ressource
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}