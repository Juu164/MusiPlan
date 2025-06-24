import { NextResponse } from 'next/server';

// This would typically connect to your database
// For demo purposes, we'll use the same mock data structure

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // In a real app, fetch from database
  // const content = await db.content.findUnique({ where: { id: params.id } });
  
  return NextResponse.json({
    id: params.id,
    title: 'Contenu exemple',
    content: 'Contenu détaillé...',
    type: 'article',
    status: 'published',
    author: 'Admin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    tags: ['exemple'],
    slug: 'contenu-exemple'
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    
    // In a real app, update in database
    // const updatedContent = await db.content.update({
    //   where: { id: params.id },
    //   data: { ...data, updatedAt: new Date() }
    // });
    
    return NextResponse.json({
      id: params.id,
      ...data,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // In a real app, delete from database
    // await db.content.delete({ where: { id: params.id } });
    
    return NextResponse.json({ message: 'Contenu supprimé avec succès' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression' },
      { status: 400 }
    );
  }
}