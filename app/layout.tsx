import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MusiPlan - Gestion de groupes musicaux',
  description: 'MusiPlan révolutionne la gestion de votre groupe avec des outils intuitifs pour planifier, coordonner et facturer comme un professionnel.',
  keywords: 'musique, groupe, gestion, planning, concerts, répétitions, facturation',
  authors: [{ name: 'MusiPlan Team' }],
  openGraph: {
    title: 'MusiPlan - Gestion de groupes musicaux',
    description: 'La solution complète pour gérer votre groupe de musique',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MusiPlan - Gestion de groupes musicaux',
    description: 'La solution complète pour gérer votre groupe de musique',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}