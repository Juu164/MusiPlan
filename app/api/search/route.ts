import { NextResponse } from 'next/server';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'page' | 'article' | 'event' | 'contact' | 'resource';
  url: string;
  relevance: number;
  lastModified: string;
}

// Simulated search index
const searchIndex: SearchResult[] = [
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
  },
  {
    id: '6',
    title: 'Bienvenue sur MusiPlan',
    content: 'MusiPlan révolutionne la gestion de votre groupe avec des outils intuitifs pour planifier, coordonner et facturer.',
    type: 'page',
    url: '/',
    relevance: 0.65,
    lastModified: '2024-01-01'
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  // Simple search implementation
  const results = searchIndex
    .filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit);

  return NextResponse.json(results);
}