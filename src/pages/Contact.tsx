import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Clock, 
  Navigation,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

const Contact = () => {
  const openingHours = [
    { day: 'Montag', hours: '09:00 - 18:30', isOpen: true },
    { day: 'Dienstag', hours: '09:00 - 18:30', isOpen: true },
    { day: 'Mittwoch', hours: 'Geschlossen', isOpen: false },
    { day: 'Donnerstag', hours: '09:00 - 18:30', isOpen: true },
    { day: 'Freitag', hours: '09:00 - 18:30', isOpen: true },
    { day: 'Samstag', hours: '09:00 - 15:00', isOpen: true },
    { day: 'Sonntag', hours: 'Geschlossen', isOpen: false }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Telefon',
      content: '+41 71 801 92 65',
      action: () => window.location.href = 'tel:+41718019265',
      buttonText: 'Anrufen'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: 'Schnelle Terminvereinbarung',
      action: () => window.open('https://wa.me/41718019265?text=Hallo, ich möchte einen Termin vereinbaren.', '_blank'),
      buttonText: 'WhatsApp öffnen'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      content: '@schnittwerksg',
      action: () => window.open('https://www.instagram.com/schnittwerksg/', '_blank'),
      buttonText: 'Folgen'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Kontakt
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Wir freuen uns auf Ihren Besuch! Vereinbaren Sie noch heute Ihren Termin bei Schnittwerk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Kontaktinformationen */}
          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-primary flex items-center gap-2">
                  <MapPin className="h-6 w-6" />
                  Standort
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Adresse</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Rorschacherstrasse 152<br />
                      9000 St. Gallen<br />
                      Schweiz
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Lage</h3>
                    <p className="text-muted-foreground text-sm">
                      Im Silberturm St. Gallen - zentral gelegen und gut erreichbar mit öffentlichen Verkehrsmitteln oder dem Auto.
                    </p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open('https://maps.google.com/?q=Rorschacherstrasse+152,+9000+St.+Gallen', '_blank')}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Route planen
                  </Button>
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
                      <span className={`font-medium ${item.isOpen ? 'text-primary' : 'text-muted-foreground'}`}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Hinweis:</strong> Termine sind auch außerhalb der Öffnungszeiten nach Vereinbarung möglich.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Kontaktmöglichkeiten */}
          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border-border bg-card hover:shadow-soft transition-elegant">
                <CardHeader>
                  <CardTitle className="text-xl font-heading text-primary flex items-center gap-3">
                    <div className="p-2 bg-secondary rounded-lg">
                      <method.icon className="h-6 w-6" />
                    </div>
                    {method.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{method.content}</p>
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={method.action}
                  >
                    {method.buttonText}
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            {/* Terminbuchung Highlight */}
            <Card className="border-primary bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">
                    Schnelle Terminbuchung
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Buchen Sie Ihren Termin ganz einfach per WhatsApp - wir antworten in der Regel innerhalb weniger Minuten.
                  </p>
                  <Button 
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => window.open('https://wa.me/41718019265?text=Hallo, ich möchte einen Termin vereinbaren.', '_blank')}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Jetzt Termin buchen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mb-16">
          <Card className="border-border bg-card overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-primary text-center">
                So finden Sie uns
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-96 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2679.8654746465!2d9.390564315520849!3d47.42315397917518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479b0b0bbb6c6b6b%3A0x0!2sRorschacherstrasse%20152%2C%209000%20St.%20Gallen!5e0!3m2!1sde!2sch!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Schnittwerk Standort"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Anfahrt & Parken */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-xl font-heading text-primary">
                Anfahrt mit dem Auto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  Autobahn A1 Ausfahrt St. Gallen-Winkeln
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  Richtung Stadtzentrum fahren
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  Parkplätze im Silberturm verfügbar
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-xl font-heading text-primary">
                Öffentliche Verkehrsmittel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  Bus Haltestelle "Silberturm" direkt vor dem Gebäude
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  5 Minuten Fußweg vom Hauptbahnhof St. Gallen
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                  Bushaltestelle der Linien 1, 2, 7, 8
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;