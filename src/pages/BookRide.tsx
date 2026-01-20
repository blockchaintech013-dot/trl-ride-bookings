import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  Car, 
  FileText,
  CheckCircle,
  Copy,
  ArrowRight
} from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBookings } from '@/contexts/BookingContext';
import { services } from '@/lib/mockData';
import { toast } from 'sonner';

const BookRide: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const { addBooking } = useBookings();
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    passengerName: '',
    contactPhone: '',
    pickupLocation: '',
    destination: '',
    pickupDate: '',
    pickupTime: '',
    passengers: '1',
    serviceType: preselectedService,
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const ticket = addBooking({
      passengerName: formData.passengerName,
      contactPhone: formData.contactPhone,
      pickupLocation: formData.pickupLocation,
      destination: formData.destination,
      pickupDateTime: `${formData.pickupDate}T${formData.pickupTime}:00`,
      passengers: parseInt(formData.passengers),
      serviceType: services.find(s => s.id === formData.serviceType)?.name || formData.serviceType,
      notes: formData.notes || undefined,
    });

    setTicketId(ticket);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const copyTicketId = () => {
    navigator.clipboard.writeText(ticketId);
    toast.success('Ticket ID copied to clipboard!');
  };

  if (isSubmitted) {
    return (
      <PublicLayout>
        <section className="py-20 bg-muted/30 min-h-[70vh]">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center animate-fade-in-up">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-muted-foreground mb-8">
                Your ride has been successfully booked. Save your ticket ID to track your ride status.
              </p>

              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border mb-8">
                <p className="text-sm text-muted-foreground mb-2">Your Ticket ID</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-display text-2xl font-bold text-primary">{ticketId}</span>
                  <button 
                    onClick={copyTicketId}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="bg-secondary/10 rounded-xl p-4 mb-8 text-left">
                <h3 className="font-semibold text-foreground mb-2">Booking Details</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><strong>Name:</strong> {formData.passengerName}</p>
                  <p><strong>Service:</strong> {services.find(s => s.id === formData.serviceType)?.name}</p>
                  <p><strong>Date:</strong> {formData.pickupDate} at {formData.pickupTime}</p>
                  <p><strong>From:</strong> {formData.pickupLocation}</p>
                  <p><strong>To:</strong> {formData.destination}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={`/track?ticket=${ticketId}`}>
                  <Button className="btn-yellow w-full sm:w-auto">
                    Track Your Ride
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10 animate-fade-in-up">
              <span className="inline-block bg-secondary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-4">
                Book Your Ride
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Schedule Your <span className="text-primary">Journey</span>
              </h1>
              <p className="text-muted-foreground">
                Fill in the details below and we'll arrange your perfect ride.
              </p>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border">
              <div className="space-y-6">
                {/* Passenger Name */}
                <div>
                  <Label htmlFor="passengerName" className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </Label>
                  <Input
                    id="passengerName"
                    name="passengerName"
                    value={formData.passengerName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Contact Phone */}
                <div>
                  <Label htmlFor="contactPhone" className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    placeholder="e.g., 0712345678"
                    required
                  />
                </div>

                {/* Pickup Location */}
                <div>
                  <Label htmlFor="pickupLocation" className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" />
                    Pickup Location
                  </Label>
                  <div className="relative">
                    <Input
                      id="pickupLocation"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      placeholder="Enter pickup address"
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Destination */}
                <div>
                  <Label htmlFor="destination" className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" />
                    Destination
                  </Label>
                  <div className="relative">
                    <Input
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="Enter destination address"
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pickupDate" className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4" />
                      Pickup Date
                    </Label>
                    <Input
                      id="pickupDate"
                      name="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pickupTime" className="flex items-center gap-2 mb-2">
                      Pickup Time
                    </Label>
                    <Input
                      id="pickupTime"
                      name="pickupTime"
                      type="time"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Passengers & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="passengers" className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4" />
                      Passengers
                    </Label>
                    <Select
                      value={formData.passengers}
                      onValueChange={(value) => setFormData({ ...formData, passengers: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Passenger' : 'Passengers'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="serviceType" className="flex items-center gap-2 mb-2">
                      <Car className="w-4 h-4" />
                      Service Type
                    </Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes" className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4" />
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any special requests or information..."
                    rows={3}
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="btn-yellow w-full text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      Confirm Booking
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default BookRide;
