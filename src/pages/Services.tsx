import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Scissors, Palette, Eye, Sparkles, Clock, Euro } from 'lucide-react';
import Navigation from '@/components/ui/navigation';

const Services = () => {
  const services = [
    {
      icon: Scissors,
      title: 'Haarschnitte',
      description: 'Moderne Schnitte für Damen und Herren, individuell angepasst an Ihren Typ',
      services: [
        { name: 'Damenschnitt', price: 'CHF 65-85', duration: '60 Min' },
        { name: 'Herrenschnitt', price: 'CHF 45-65', duration: '45 Min' },
        { name: 'Kinderschnitt (bis 12 Jahre)', price: 'CHF 35', duration: '30 Min' },
        { name: 'Waschen & Föhnen', price: 'CHF 35', duration: '30 Min' }
      ]
    },
    {
      icon: Palette,
      title: 'Colorationen',
      description: 'Professionelle Haarfarbe mit hochwertigen Trinity Haircare Produkten',
      services: [
        { name: 'Vollcoloration', price: 'CHF 85-120', duration: '120 Min' },
        { name: 'Ansatzbehandlung', price: 'CHF 65-85', duration: '90 Min' },
        { name: 'Intensivtönung', price: 'CHF 75-95', duration: '90 Min' },
        { name: 'Grauabdeckung', price: 'CHF 70-90', duration: '90 Min' }
      ]
    },
    {
      icon: Sparkles,
      title: 'Balayage & Highlights',
      description: 'Natürliche Highlights für einen sun-kissed Look das ganze Jahr über',
      services: [
        { name: 'Balayage', price: 'CHF 120-180', duration: '180 Min' },
        { name: 'Foliensträhnen', price: 'CHF 100-150', duration: '150 Min' },
        { name: 'Ombré', price: 'CHF 110-160', duration: '150 Min' },
        { name: 'Babylights', price: 'CHF 130-190', duration: '180 Min' }
      ]
    },
    {
      icon: Eye,
      title: 'Wimpern & Brauen',
      description: 'Perfekte Augenpartie durch professionelle Wimpern- und Augenbrauenbehandlung',
      services: [
        { name: 'Wimpern färben', price: 'CHF 25', duration: '20 Min' },
        { name: 'Brauen zupfen', price: 'CHF 30', duration: '20 Min' },
        { name: 'Brauen färben', price: 'CHF 25', duration: '15 Min' },
        { name: 'Komplettbehandlung', price: 'CHF 65', duration: '45 Min' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Leistungen & Preise
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professionelle Haarpflege und Beauty-Behandlungen mit hochwertigen Trinity Haircare Produkten
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((category, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-soft transition-elegant">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-secondary rounded-lg">
                    <category.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-heading">{category.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.services.map((service, serviceIndex) => (
                    <div key={serviceIndex} className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                      <div>
                        <h4 className="font-medium text-foreground">{service.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {service.duration}
                        </div>
                      </div>
                      <Badge variant="secondary" className="font-medium">
                        {service.price}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">
              Wichtige Hinweise
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Alle Preise verstehen sich als Richtpreise. Der finale Preis wird nach der persönlichen Beratung und Haaranalyse festgelegt.
              </p>
              <p>
                Bei langen oder sehr dicken Haaren können Aufschläge anfallen.
              </p>
              <p>
                Termine können bis 24 Stunden vorher kostenfrei storniert werden.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Badge variant="outline">Trinity Haircare Premium Produkte</Badge>
              <Badge variant="outline">Professionelle Beratung inklusive</Badge>
              <Badge variant="outline">Moderne Techniken</Badge>
              <Badge variant="outline">Garantie auf alle Leistungen</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;