import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Instagram, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Startseite' },
    { href: '/leistungen', label: 'Leistungen & Preise' },
    { href: '/team', label: 'Team' },
    { href: '/galerie', label: 'Galerie' },
    { href: '/ueber-uns', label: 'Über uns' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <nav className="bg-accent/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-heading font-bold text-primary">
              Schnittwerk
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-elegant text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA & Social */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://www.instagram.com/schnittwerksg/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-elegant"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="tel:+41718019265"
              className="text-muted-foreground hover:text-primary transition-elegant"
            >
              <Phone className="h-5 w-5" />
            </a>
            <Button 
              size="sm" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => window.open('https://wa.me/41718019265?text=Hallo, ich möchte einen Termin vereinbaren.', '_blank')}
            >
              Termin buchen
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary transition-elegant"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-accent/98 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary transition-elegant rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 py-2 space-y-2">
              <div className="flex items-center space-x-4">
                <a
                  href="https://www.instagram.com/schnittwerksg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-elegant"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="tel:+41718019265"
                  className="text-muted-foreground hover:text-primary transition-elegant"
                >
                  <Phone className="h-5 w-5" />
                </a>
              </div>
              <Button 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  window.open('https://wa.me/41718019265?text=Hallo, ich möchte einen Termin vereinbaren.', '_blank');
                  setIsOpen(false);
                }}
              >
                Termin buchen
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;