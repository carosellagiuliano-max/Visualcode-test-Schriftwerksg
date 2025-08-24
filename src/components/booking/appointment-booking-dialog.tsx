import React, { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { CalendarIcon, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface AppointmentBookingDialogProps {
  children: React.ReactNode;
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
];

const hairdressers = [
  { 
    id: 'vanessa', 
    name: 'Vanessa (Inhaberin)', 
    specialty: 'Schnitt & Farbe',
    image: '/src/assets/team-owner.jpg',
    description: 'Erfahrene Friseurin mit über 10 Jahren Berufserfahrung. Spezialisiert auf moderne Schnitte und Farbbehandlungen.'
  }
];

const services = [
  { id: 'cut', name: 'Haarschnitt', duration: '60 min', price: 'ab CHF 45' },
  { id: 'color', name: 'Färben', duration: '120 min', price: 'ab CHF 85' },
  { id: 'highlights', name: 'Strähnen', duration: '150 min', price: 'ab CHF 120' },
  { id: 'wash-blow', name: 'Waschen & Föhnen', duration: '45 min', price: 'ab CHF 35' },
  { id: 'treatment', name: 'Haarkur', duration: '30 min', price: 'ab CHF 25' }
];

export function AppointmentBookingDialog({ children }: AppointmentBookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedHairdresser, setSelectedHairdresser] = useState<string>();
  const [selectedService, setSelectedService] = useState<string>();

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedHairdresser || !selectedService) {
      toast({
        title: "Bitte alle Felder ausfüllen",
        description: "Datum, Zeit, Friseur und Behandlung müssen ausgewählt werden.",
        variant: "destructive"
      });
      return;
    }

    const bookingDetails = {
      date: format(selectedDate, 'dd.MM.yyyy', { locale: de }),
      time: selectedTime,
      hairdresser: hairdressers.find(h => h.id === selectedHairdresser)?.name,
      service: services.find(s => s.id === selectedService)?.name
    };

    // For now, show success message and open WhatsApp
    const message = `Hallo, ich möchte einen Termin buchen:\n\nDatum: ${bookingDetails.date}\nUhrzeit: ${bookingDetails.time}\nFriseur: ${bookingDetails.hairdresser}\nBehandlung: ${bookingDetails.service}`;
    
    window.open(`https://wa.me/41788508595?text=${encodeURIComponent(message)}`, '_blank');
    
    toast({
      title: "Terminanfrage gesendet!",
      description: "Wir melden uns schnellstmöglich bei Ihnen zur Bestätigung.",
    });

    setOpen(false);
    // Reset form
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setSelectedHairdresser(undefined);
    setSelectedService(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Termin buchen</DialogTitle>
          <DialogDescription>
            Wählen Sie Ihr gewünschtes Datum, die Uhrzeit und Ihren Friseur aus.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Service Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Behandlung</label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="Behandlung wählen" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    <div className="flex flex-col">
                      <span>{service.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {service.duration} • {service.price}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Datum</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, 'dd.MM.yyyy', { locale: de })
                  ) : (
                    <span>Datum wählen</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                  locale={de}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Uhrzeit</label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <Clock className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Zeit wählen" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hairdresser Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Friseur/Stylist</label>
            <Select value={selectedHairdresser} onValueChange={setSelectedHairdresser}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {selectedHairdresser ? (
                    <div className="flex items-center gap-2">
                      <img 
                        src={hairdressers.find(h => h.id === selectedHairdresser)?.image} 
                        alt={hairdressers.find(h => h.id === selectedHairdresser)?.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span>{hairdressers.find(h => h.id === selectedHairdresser)?.name}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Friseur wählen</span>
                  )}
                </div>
              </SelectTrigger>
              <SelectContent>
                {hairdressers.map((hairdresser) => (
                  <SelectItem key={hairdresser.id} value={hairdresser.id}>
                    <div className="flex items-center gap-2">
                      <img 
                        src={hairdresser.image} 
                        alt={hairdresser.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <span>{hairdresser.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {hairdresser.specialty}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleBooking} 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Termin anfragen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}