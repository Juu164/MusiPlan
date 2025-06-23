'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Music, 
  Calendar, 
  Users, 
  FileText, 
  CreditCard, 
  Bell, 
  Settings,
  Star,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    {
      icon: Calendar,
      title: 'Disponibilités',
      description: 'Synchronisez les créneaux horaires de tous les membres automatiquement'
    },
    {
      icon: Music,
      title: 'Concerts & Événements',
      description: 'Planifiez concerts, répétitions et sessions studio en un clic'
    },
    {
      icon: Users,
      title: 'Carnet de Contacts',
      description: 'Centralisez membres, prestataires et salles dans un répertoire intelligent'
    },
    {
      icon: FileText,
      title: 'Ressources & Notes',
      description: 'Stockez partitions, paroles et notes avec éditeur de texte riche'
    },
    {
      icon: CreditCard,
      title: 'Facturation',
      description: 'Créez devis et factures professionnels avec génération PDF'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Recevez des rappels intelligents pour ne rien manquer'
    }
  ];

  const plans = [
    {
      name: 'Gratuit',
      price: '0€',
      period: '/mois',
      description: 'Parfait pour débuter',
      features: [
        'Jusqu\'à 5 membres',
        'Calendrier basique',
        'Stockage 1GB',
        'Support email'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '19€',
      period: '/mois',
      description: 'Pour les groupes sérieux',
      features: [
        'Membres illimités',
        'Calendrier avancé',
        'Stockage 50GB',
        'Facturation complète',
        'Notifications push',
        'Support prioritaire'
      ],
      popular: true
    },
    {
      name: 'Studio',
      price: '39€',
      period: '/mois',
      description: 'Pour les professionnels',
      features: [
        'Tout du plan Pro',
        'Stockage 200GB',
        'API access',
        'Intégrations avancées',
        'Analytics détaillés',
        'Support téléphonique'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">MusiPlan</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-slate-300 hover:text-white">
                  Connexion
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Essai gratuit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
              ✨ Nouvelle génération de gestion musicale
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Orchestrez votre
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                {' '}groupe musical
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              MusiPlan révolutionne la gestion de votre groupe avec des outils intuitifs pour 
              planifier, coordonner et facturer comme un professionnel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg"
                onClick={() => setIsVideoPlaying(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Voir la démo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Tout ce dont votre groupe a besoin
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Une suite complète d'outils pensés pour les musiciens, 
              par des musiciens.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Choisissez votre formule
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Commencez gratuitement, évoluez selon vos besoins
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-blue-500/10 to-violet-500/10 border-blue-500/50 scale-105' 
                    : 'bg-slate-800/50 border-slate-700'
                } hover:scale-105 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Populaire
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-slate-400">{plan.description}</CardDescription>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-slate-300">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    {plan.price === '0€' ? 'Commencer gratuitement' : 'Choisir ce plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/10 to-violet-600/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Prêt à transformer votre groupe ?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Rejoignez des milliers de musiciens qui font confiance à MusiPlan
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
              Créer mon compte gratuitement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Music className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold text-white">MusiPlan</span>
            </div>
            <p className="text-slate-400">
              © 2024 MusiPlan. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}