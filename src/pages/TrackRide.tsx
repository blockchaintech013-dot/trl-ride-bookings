import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  CheckCircle, 
  Car, 
  Clock, 
  Users, 
  MapPin,
  Phone,
  User,
  AlertCircle
} from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBookings } from '@/contexts/BookingContext';
import { mockDrivers, rideStatuses, Booking } from '@/lib/mockData';

const TrackRide: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefilledTicket = searchParams.get('ticket') || '';
  const { getBookingByTicket } = useBookings();

  const [ticketInput, setTicketInput] = useState(prefilledTicket);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [searched, setSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (prefilledTicket) {
      handleSearch();
    }
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!ticketInput.trim()) return;

    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const found = getBookingByTicket(ticketInput.trim());
    setBooking(found || null);
    setSearched(true);
    setIsSearching(false);
  };

  const getStatusIndex = (status: string) => {
    return rideStatuses.findIndex((s) => s.key === status);
  };

  const driver = booking?.assignedDriver 
    ? mockDrivers.find((d) => d.id === booking.assignedDriver) 
    : null;

  return (
    <PublicLayout>
      <section className="py-12 bg-muted/30 min-h-[70vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10 animate-fade-in-up">
              <span className="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-4">
                Track Your Ride
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Where's My <span className="text-secondary">Ride</span>?
              </h1>
              <p className="text-muted-foreground">
                Enter your ticket ID to see your ride status and driver details.
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-10">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={ticketInput}
                    onChange={(e) => setTicketInput(e.target.value)}
                    placeholder="Enter ticket ID (e.g., TRL-2024-001)"
                    className="pl-12 h-14 text-lg"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="btn-yellow h-14 px-8"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    'Track'
                  )}
                </Button>
              </div>
            </form>

            {/* Results */}
            {searched && (
              <div className="animate-fade-in-up">
                {booking ? (
                  <div className="space-y-6">
                    {/* Ticket Info Card */}
                    <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Ticket ID</p>
                          <p className="font-display text-xl font-bold text-primary">{booking.ticketId}</p>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                          booking.status === 'completed' 
                            ? 'bg-green-100 text-green-700'
                            : 'bg-secondary/20 text-secondary-foreground'
                        }`}>
                          {rideStatuses.find((s) => s.key === booking.status)?.label}
                        </div>
                      </div>

                      {/* Journey Details */}
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Pickup</p>
                            <p className="font-medium text-foreground">{booking.pickupLocation}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-red-600" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Destination</p>
                            <p className="font-medium text-foreground">{booking.destination}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(booking.pickupDateTime).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{booking.passengers} Passengers</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Car className="w-4 h-4" />
                          <span>{booking.serviceType}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                      <h3 className="font-display font-semibold text-lg text-foreground mb-6">
                        Ride Status
                      </h3>
                      <div className="space-y-4">
                        {rideStatuses.map((status, index) => {
                          const currentIndex = getStatusIndex(booking.status);
                          const isCompleted = index <= currentIndex;
                          const isCurrent = index === currentIndex;

                          return (
                            <div key={status.key} className="flex items-start gap-4">
                              <div className="flex flex-col items-center">
                                <div className={`timeline-dot ${
                                  isCurrent ? 'active pulse-yellow' : 
                                  isCompleted ? 'completed' : 'pending'
                                }`}></div>
                                {index < rideStatuses.length - 1 && (
                                  <div className={`w-0.5 h-8 mt-1 ${
                                    isCompleted ? 'bg-primary' : 'bg-border'
                                  }`}></div>
                                )}
                              </div>
                              <div className={`pb-4 ${isCurrent ? 'opacity-100' : isCompleted ? 'opacity-70' : 'opacity-40'}`}>
                                <p className={`font-medium ${isCurrent ? 'text-primary' : 'text-foreground'}`}>
                                  {status.label}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {status.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Driver Info */}
                    {driver && (
                      <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                        <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                          Your Driver
                        </h3>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-8 h-8 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-foreground text-lg">{driver.name}</p>
                            <p className="text-muted-foreground">{driver.carModel}</p>
                            <p className="text-sm text-primary font-medium">{driver.vehicleReg}</p>
                          </div>
                          <a 
                            href={`tel:${driver.phone}`}
                            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                          >
                            <Phone className="w-5 h-5 text-primary-foreground" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-card rounded-2xl p-8 shadow-lg border border-border text-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                      Ticket Not Found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      We couldn't find a booking with ticket ID "{ticketInput}". 
                      Please check the ticket ID and try again.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Need help? Call us at{' '}
                      <a href="tel:0724210330" className="text-primary font-medium">
                        0724 210 330
                      </a>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default TrackRide;
