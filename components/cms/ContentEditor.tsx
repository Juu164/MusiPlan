'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Save, 
  Eye, 
  Plus,
  Edit,
  Trash2,
  FileText,
  Image,
  Video,
  Calendar,
  Tag
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  content: string;
  type: 'page' | 'article' | 'event' | 'media';
  status: 'draft' | 'published' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  featured?: boolean;
}

export default function ContentEditor() {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [contents] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Bienvenue sur MusiPlan',
      content: 'MusiPlan révolutionne la gestion de votre groupe avec des outils intuitifs...',
      type: 'page',
      status: 'published',
      author: 'Admin',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      tags: ['accueil', 'présentation'],
      featured: true
    },
    {
      id: '2',
      title: 'Nouveau concert à Paris',
      content: 'Nous sommes ravis d\'annoncer notre prochain concert...',
      type: 'article',
      status: 'published',
      author: 'Sarah Martin',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12',
      tags: ['concert', 'paris', 'actualité']
    },
    {
      id: '3',
      title: 'Répétition générale',
      content: 'Dernière répétition avant le grand concert...',
      type: 'event',
      status: 'draft',
      author: 'John Doe',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14',
      tags: ['répétition', 'préparation']
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page':
        return FileText;
      case 'article':
        return FileText;
      case 'event':
        return Calendar;
      case 'media':
        return Image;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'page':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'article':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'event':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
      case 'media':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'archived':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || content.type === filterType;
    const matchesStatus = filterStatus === 'all' || content.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Gestionnaire de Contenu</h2>
          <p className="text-slate-400">Créez et gérez le contenu de votre site</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            setSelectedContent(null);
            setIsEditing(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau contenu
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Filters */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="pt-6 space-y-4">
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-900/50 border-slate-600 text-white"
              />
              
              <div className="grid grid-cols-2 gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="all">Tous types</SelectItem>
                    <SelectItem value="page">Pages</SelectItem>
                    <SelectItem value="article">Articles</SelectItem>
                    <SelectItem value="event">Événements</SelectItem>
                    <SelectItem value="media">Médias</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="all">Tous statuts</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="archived">Archivé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Content Items */}
          <div className="space-y-3">
            {filteredContents.map((content) => {
              const TypeIcon = getTypeIcon(content.type);
              
              return (
                <Card 
                  key={content.id} 
                  className={`bg-slate-800/50 border-slate-700 cursor-pointer transition-all hover:bg-slate-800/70 ${
                    selectedContent?.id === content.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => {
                    setSelectedContent(content);
                    setIsEditing(false);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <TypeIcon className="h-4 w-4 text-slate-400" />
                        <h3 className="font-medium text-white text-sm truncate">
                          {content.title}
                        </h3>
                      </div>
                      {content.featured && (
                        <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30 text-xs">
                          Vedette
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getTypeColor(content.type)}>
                        {content.type}
                      </Badge>
                      <Badge className={getStatusColor(content.status)}>
                        {content.status}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-slate-400 truncate mb-2">
                      {content.content}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{content.author}</span>
                      <span>{new Date(content.updatedAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-2">
          {selectedContent || isEditing ? (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">
                      {isEditing ? (selectedContent ? 'Modifier' : 'Nouveau contenu') : 'Aperçu'}
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {isEditing ? 'Éditez le contenu ci-dessous' : 'Prévisualisation du contenu'}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!isEditing && selectedContent && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                    )}
                    {isEditing && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(false)}
                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Aperçu
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Sauvegarder
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-2 block">
                          Titre
                        </label>
                        <Input
                          defaultValue={selectedContent?.title || ''}
                          className="bg-slate-900/50 border-slate-600 text-white"
                          placeholder="Titre du contenu"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-2 block">
                          Type
                        </label>
                        <Select defaultValue={selectedContent?.type || 'page'}>
                          <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            <SelectItem value="page">Page</SelectItem>
                            <SelectItem value="article">Article</SelectItem>
                            <SelectItem value="event">Événement</SelectItem>
                            <SelectItem value="media">Média</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-300 mb-2 block">
                        Contenu
                      </label>
                      <Textarea
                        defaultValue={selectedContent?.content || ''}
                        className="bg-slate-900/50 border-slate-600 text-white min-h-[300px]"
                        placeholder="Rédigez votre contenu ici..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-2 block">
                          Statut
                        </label>
                        <Select defaultValue={selectedContent?.status || 'draft'}>
                          <SelectTrigger className="bg-slate-900/50 border-slate-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            <SelectItem value="draft">Brouillon</SelectItem>
                            <SelectItem value="published">Publié</SelectItem>
                            <SelectItem value="archived">Archivé</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-2 block">
                          Tags
                        </label>
                        <Input
                          defaultValue={selectedContent?.tags.join(', ') || ''}
                          className="bg-slate-900/50 border-slate-600 text-white"
                          placeholder="tag1, tag2, tag3"
                        />
                      </div>
                    </div>
                  </>
                ) : selectedContent ? (
                  <>
                    <div className="flex items-center space-x-3 mb-4">
                      <h1 className="text-2xl font-bold text-white">{selectedContent.title}</h1>
                      <Badge className={getTypeColor(selectedContent.type)}>
                        {selectedContent.type}
                      </Badge>
                      <Badge className={getStatusColor(selectedContent.status)}>
                        {selectedContent.status}
                      </Badge>
                    </div>
                    
                    <div className="prose prose-invert max-w-none">
                      <p className="text-slate-300 leading-relaxed">
                        {selectedContent.content}
                      </p>
                    </div>
                    
                    {selectedContent.tags.length > 0 && (
                      <div className="flex items-center space-x-2 pt-4 border-t border-slate-700">
                        <Tag className="h-4 w-4 text-slate-400" />
                        <div className="flex flex-wrap gap-1">
                          {selectedContent.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="border-slate-600 text-slate-400">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700 text-sm text-slate-400">
                      <span>Par {selectedContent.author}</span>
                      <span>Modifié le {new Date(selectedContent.updatedAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </>
                ) : null}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">Sélectionnez un contenu</h3>
                  <p className="text-slate-400 mb-4">
                    Choisissez un élément dans la liste pour le visualiser ou le modifier
                  </p>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => setIsEditing(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Créer un nouveau contenu
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}