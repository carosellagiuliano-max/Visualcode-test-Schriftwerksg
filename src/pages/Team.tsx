import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instagram, Award, Heart, Scissors } from 'lucide-react';
import ownerImage from '@/assets/team-owner.jpg';
import stylistImage from '@/assets/team-stylist.jpg';

const Team = () => {
  const teamMembers = [
    {
      name: 'Sarah Müller',
      role: 'Inhaberin & Chefstylstin',
      image: ownerImage,
      description: 'Mit über 15 Jahren Erfahrung in der Branche hat Sarah das Schnittwerk zu dem gemacht, was es heute ist. Ihre Leidenschaft für innovative Schnitte und Farbtrends macht sie zur ersten Anlaufstelle für anspruchsvolle Kunden.',
      specialties: ['Balayage', 'Colorationen', 'Trend-Cuts', 'Beratung'],
      instagram: '@sarah_schnittwerk',
      awards: ['Swiss Hair Award 2023', 'Trinity Haircare Experte']
    },
    {
      name: 'Marco Rossi',
      role: 'Senior Stylist',
      image: stylistImage,
      description: 'Marco ist unser Experte für Herrenschnitte und moderne Stylings. Seine präzise Arbeitsweise und sein Gespür für aktuelle Trends machen ihn zu einem gefragten Stylisten.',
      specialties: ['Herrenschnitte', 'Bartpflege', 'Styling', 'Klassische Schnitte'],
      instagram: '@marco_cuts',
      awards: ['Certified Trinity Professional']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Unser Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Lernen Sie die kreativen Köpfe hinter Schnittwerk kennen - Profis mit Leidenschaft für perfekte Looks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-soft transition-elegant overflow-hidden">
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-heading text-primary">{member.name}</CardTitle>
                    <p className="text-lg text-muted-foreground font-medium">{member.role}</p>
                  </div>
                  <a
                    href={`https://www.instagram.com/${member.instagram.replace('@', '')}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-elegant"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {member.description}
                </p>
                
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Scissors className="h-4 w-4 text-primary" />
                    Spezialisierungen
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Auszeichnungen & Zertifikate
                  </h4>
                  <div className="space-y-1">
                    {member.awards.map((award, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {award}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Instagram className="h-4 w-4" />
                    Folgen Sie {member.name} auf Instagram: {member.instagram}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-2xl font-heading font-bold text-primary mb-4 flex items-center justify-center gap-2">
              <Heart className="h-6 w-6" />
              Warum unser Team besonders ist
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <h4 className="font-heading font-semibold text-foreground mb-2">Kontinuierliche Weiterbildung</h4>
                <p className="text-sm text-muted-foreground">
                  Regelmäßige Schulungen und Workshops sorgen für immer aktuelle Techniken
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-heading font-semibold text-foreground mb-2">Persönliche Beratung</h4>
                <p className="text-sm text-muted-foreground">
                  Jeder Kunde erhält eine individuelle Beratung für den perfekten Look
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-heading font-semibold text-foreground mb-2">Leidenschaft für Details</h4>
                <p className="text-sm text-muted-foreground">
                  Perfektionismus und Liebe zum Detail in jedem Schnitt und jeder Behandlung
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;