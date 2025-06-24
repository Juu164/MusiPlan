'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  FileText, 
  Users, 
  Calendar, 
  Music,
  ArrowRight,
  Clock
} from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'page' | 'article' | 'event' | 'contact' | 'resource';
  url: string;
  relevance: number;
  lastModified: string;
}

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Simulated search data
  const searchData: SearchResult[] = [
    {
      id: '1',
      title: 'Fête de la Musique 2024',
      content: 'Concert en plein air pour la fête de la musique. Set de 2h30 avec nos plus grands succès.',
      type: 'event',
      url: '/dashboard?tab=concerts',
      relevance: 0.95,
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      title: 'Sarah Martin - Chanteuse',
      content: 'Chanteuse principale du groupe, spécialisée dans le jazz et la variété française.',
      type: 'contact',
      url: '/dashboard?tab=contacts',
      relevance: 0.88,
      lastModified: '2024-01-12'
    },
    {
      id: '3',
      title: 'Partition - Midnight Blues',
      content: 'Accords et structure de notre composition originale en La mineur, tempo 120 BPM.',
      type: 'resource',
      url: '/dashboard?tab=resources',
      relevance: 0.82,
      lastModified: '2024-01-10'
    },
    {
      id: '4',
      title: 'Studio Central - Location',
      content: 'Studio de répétition équipé, 25€/h, disponible tous les soirs de la semaine.',
      type: 'contact',
      url: '/dashboard?tab=contacts',
      relevance: 0.75,
      lastModified: '2024-01-08'
    },
    {
      id: '5',
      title: 'Répétition générale',
      content: 'Dernière répétition avant le concert de samedi, révision complète du setlist.',
      type: 'event',
      url: '/dashboard?tab=concerts',
      relevance: 0.70,
      lastModified: '2024-01-05'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = searchData
        .filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.content.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 6);
      
      setResults(filtered);
      setIsOpen(true);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page':
      case 'article':
        return FileText;
      case 'event':
        return Calendar;
      case 'contact':
        return Users;
      case 'resource':
        return Music;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'page':
      case 'article':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'event':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'contact':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
      case 'resource':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'page':
        return 'Page';
      case 'article':
        return 'Article';
      case 'event':
        return 'Événement';
      case 'contact':
        return 'Contact';
      case 'resource':
        return 'Ressource';
      default:
        return 'Contenu';
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-400/20 text-yellow-300 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Rechercher dans MusiPlan..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500"
        />
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 border-slate-700 backdrop-blur-xl z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent mx-auto"></div>
                <p className="text-slate-400 text-sm mt-2">Recherche en cours...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result) => {
                  const TypeIcon = getTypeIcon(result.type);
                  
                  return (
                    <a
                      key={result.id}
                      href={result.url}
                      className="block px-4 py-3 hover:bg-slate-700/50 transition-colors border-b border-slate-700/50 last:border-b-0"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <TypeIcon className="h-4 w-4 text-slate-400 flex-shrink-0" />
                            <h3 className="font-medium text-white text-sm truncate">
                              {highlightText(result.title, query)}
                            </h3>
                            <Badge className={getTypeColor(result.type)}>
                              {getTypeLabel(result.type)}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-2 mb-2">
                            {highlightText(result.content, query)}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <Clock className="h-3 w-3" />
                            <span>Modifié le {new Date(result.lastModified).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400 ml-2 flex-shrink-0" />
                      </div>
                    </a>
                  );
                })}
                
                {results.length === 6 && (
                  <div className="px-4 py-2 border-t border-slate-700/50">
                    <p className="text-xs text-slate-400 text-center">
                      Affichage des 6 premiers résultats
                    </p>
                  </div>
                )}
              </div>
            ) : query.length >= 2 ? (
              <div className="p-4 text-center">
                <Search className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">Aucun résultat trouvé</p>
                <p className="text-slate-500 text-xs mt-1">
                  Essayez avec d'autres mots-clés
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </div>
  );
}