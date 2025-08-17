import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Clock, 
  Award, 
  Users, 
  Scissors,
  Heart,
  Star,
  Calendar
} from 'lucide-react';
import ownerImage from '@/assets/team-owner.jpg';
import stylistImage from '@/assets/team-stylist.jpg';

const About = () => {
  const stats = [
    { icon: Users, number: '500+', label: 'Zufriedene Kunden' },
    { icon: Scissors, number: '15+', label: 'Jahre Erfahrung' },
    { icon: Award, number: '100%', label: 'Trinity Haircare' },
    { icon: Star, number: '4.9', label: 'Google Bewertung' }
  ];

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

  const values = [
    {
      icon: Heart,
      title: 'Leidenschaft',
      description: 'Wir leben für die Schönheit und setzen unsere ganze Leidenschaft in jeden Schnitt und jede Behandlung.'
    },
    {
      icon: Award,
      title: 'Qualität',
      description: 'Nur die besten Produkte und Techniken kommen bei uns zum Einsatz - für perfekte Ergebnisse.'
    },
    {
      icon: Users,
      title: 'Individualität',
      description: 'Jeder Kunde ist einzigartig. Wir hören zu und entwickeln den perfekten Look für Ihren Typ.'
    },
    {
      icon: Clock,
      title: 'Zuverlässigkeit',
      description: 'Pünktlichkeit und Verbindlichkeit sind für uns selbstverständlich - Ihr Termin ist uns wichtig.'
    }
  ];

  const openingHours = [
    { day: 'Montag', hours: '09:00 - 18:30' },
    { day: 'Dienstag', hours: '09:00 - 18:30' },
    { day: 'Mittwoch', hours: 'Geschlossen' },
    { day: 'Donnerstag', hours: '09:00 - 18:30' },
    { day: 'Freitag', hours: '09:00 - 18:30' },
    { day: 'Samstag', hours: '09:00 - 15:00' },
    { day: 'Sonntag', hours: 'Geschlossen' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Über uns
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Lernen Sie Schnittwerk kennen - Ihr moderner Coiffeur im Herzen von St. Gallen
          </p>
        </div>

        {/* Firmendaten */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-primary flex items-center gap-2">
                <Scissors className="h-6 w-6" />
                Schnittwerk
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Adresse</p>
                    <p className="text-muted-foreground">
                      Rorschacherstrasse 152<br />
                      9000 St. Gallen<br />
                      Schweiz
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Telefon</p>
                    <a href="tel:+41718019265" className="text-muted-foreground hover:text-primary transition-colors">
                      +41 71 801 92 65
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Instagram className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Instagram</p>
                    <a 
                      href="https://www.instagram.com/schnittwerksg/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      @schnittwerksg
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Slogan:</strong> "Dein Look. Dein Schnittwerk."
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Dein Coiffeur im Silberturm St. Gallen
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-primary flex items-center gap-2">
                <Clock className="h-6 w-6" />
                Öffnungszeiten
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {openingHours.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                    <span className="font-medium text-foreground">{item.day}</span>
                    <span className={`${item.hours === 'Geschlossen' ? 'text-muted-foreground' : 'text-primary'} font-medium`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">
                  Termine sind auch außerhalb der Öffnungszeiten nach Vereinbarung möglich.
                </p>
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => window.open('https://wa.me/41718019265?text=Hallo, ich möchte einen Termin vereinbaren.', '_blank')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Jetzt Termin buchen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Studio Geschichte */}
        <div className="mb-16">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-primary text-center">
                Unsere Geschichte
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                Schnittwerk wurde mit der Vision gegründet, jedem Kunden einen individuellen und perfekten Look zu verleihen. 
                Als moderner Coiffeur im Silberturm St. Gallen verbinden wir traditionelle Handwerkskunst mit den neuesten Trends 
                und Techniken. Unser Team aus erfahrenen Stylisten arbeitet ausschließlich mit hochwertigen Trinity Haircare Produkten, 
                um Ihnen das bestmögliche Ergebnis zu garantieren. Wir sind spezialisiert auf Haarschnitte, Colorationen, Balayage 
                sowie Wimpern- und Augenbrauenbehandlungen für Damen und Herren.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Statistiken */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-border bg-card text-center">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Unsere Werte */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-8">
            Unsere Werte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-border bg-card text-center">
                <CardHeader>
                  <value.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg font-heading">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-8">
            Unser Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center mb-12">
            Lernen Sie die kreativen Köpfe hinter Schnittwerk kennen - Profis mit Leidenschaft für perfekte Looks
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
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

          <div className="text-center">
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

        {/* Produkte & Services */}
        <div className="text-center">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-primary">
                Qualität, die Sie spüren
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
                Wir verwenden ausschließlich Trinity Haircare Produkte - Premium Haarpflege für professionelle Ergebnisse. 
                Zusätzlich bieten wir Online-Buchung, einen Produktshop und Gutscheine für das perfekte Geschenk.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="text-sm">Trinity Haircare Premium Partner</Badge>
                <Badge variant="outline" className="text-sm">Online Buchungssystem</Badge>
                <Badge variant="outline" className="text-sm">Produktshop verfügbar</Badge>
                <Badge variant="outline" className="text-sm">Geschenkgutscheine</Badge>
                <Badge variant="outline" className="text-sm">Moderne Ausstattung</Badge>
                <Badge variant="outline" className="text-sm">Zentrale Lage</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;