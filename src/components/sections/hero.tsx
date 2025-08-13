import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star } from 'lucide-react';
import heroImage from '@/assets/salon-hero.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-primary/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
              Schnittwerk
            </h1>
            <p className="text-2xl md:text-3xl font-heading font-medium text-white/90">
              Dein Look. Dein Schnittwerk.
            </p>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Moderner Coiffeur im Silberturm St. Gallen für Damen und Herren. 
              Hochwertige Behandlungen mit Trinity Haircare Produkten.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <MapPin className="h-8 w-8 text-white mb-3 mx-auto" />
              <h3 className="font-heading font-semibold text-lg mb-2">Standort</h3>
              <p className="text-white/80 text-sm">
                Rorschacherstrasse 152<br />
                9000 St. Gallen
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <Clock className="h-8 w-8 text-white mb-3 mx-auto" />
              <h3 className="font-heading font-semibold text-lg mb-2">Öffnungszeiten</h3>
              <p className="text-white/80 text-sm">
                Mo-Di, Do-Fr: 09:00-18:30<br />
                Sa: 09:00-15:00
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <Star className="h-8 w-8 text-white mb-3 mx-auto" />
              <h3 className="font-heading font-semibold text-lg mb-2">Services</h3>
              <p className="text-white/80 text-sm">
                Schnitte, Colorationen<br />
                Balayage, Wimpern & Brauen
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-medium px-8 py-4 text-lg"
              onClick={() => window.open('https://wa.me/41718019265?text=Hallo, ich möchte einen Termin vereinbaren.', '_blank')}
            >
              Termin buchen
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black font-medium px-8 py-4 text-lg"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Leistungen ansehen
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;