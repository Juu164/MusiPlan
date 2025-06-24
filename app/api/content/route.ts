import { NextResponse } from 'next/server';

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
  slug?: string;
  metaDescription?: string;
}

// Simulated content database
let contentItems: ContentItem[] = [
  {
    id: '1',
    title: 'Bienvenue sur MusiPlan',
    content: 'MusiPlan révolutionne la gestion de votre groupe avec des outils intuitifs pour planifier, coordonner et facturer comme un professionnel.',
    type: 'page',
    status: 'published',
    author: 'Admin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    tags: ['accueil', 'présentation'],
    featured: true,
    slug: 'bienvenue',
    metaDescription: 'Découvrez MusiPlan, la solution complète pour gérer votre groupe de musique.'
  },
  {
    id: '2',
    title: 'Nouveau concert à Paris',
    content: 'Nous sommes ravis d\'annoncer notre prochain concert qui aura lieu le 21 juin 2024 à Paris pour la Fête de la Musique. Ce sera une soirée exceptionnelle avec un setlist de nos plus grands succès.',
    type: 'article',
    status: 'published',
    author: 'Sarah Martin',
    createdAt: '2024-01-10T14:20:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    tags: ['concert', 'paris', 'actualité', 'fête de la musique'],
    slug: 'concert-paris-2024',
    metaDescription: 'Rejoignez-nous pour un concert exceptionnel à Paris le 21 juin 2024.'
  },
  {
    id: '3',
    title: 'Répétition générale',
    content: 'Dernière répétition avant le grand concert de samedi. Nous réviserons l\'ensemble du setlist et peaufinerons les derniers détails techniques.',
    type: 'event',
    status: 'draft',
    author: 'John Doe',
    createdAt: '2024-01-14T16:45:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    tags: ['répétition', 'préparation', 'concert'],
    slug: 'repetition-generale-janvier',
    metaDescription: 'Répétition générale avant le concert - préparation finale.'
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const status = searchParams.get('status');
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  let filteredItems = contentItems;

  if (type && type !== 'all') {
    filteredItems = filteredItems.filter(item => item.type === type);
  }

  if (status && status !== 'all') {
    filteredItems = filteredItems.filter(item => item.status === status);
  }

  const paginatedItems = filteredItems
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(offset, offset + limit);

  return NextResponse.json({
    items: paginatedItems,
    total: filteredItems.length,
    hasMore: offset + limit < filteredItems.length
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: data.title || 'Nouveau contenu',
      content: data.content || '',
      type: data.type || 'article',
      status: data.status || 'draft',
      author: data.author || 'Utilisateur',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: data.tags || [],
      featured: data.featured || false,
      slug: data.slug || data.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      metaDescription: data.metaDescription || ''
    };

    contentItems.push(newItem);
    
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création du contenu' },
      { status: 400 }
    );
  }
}