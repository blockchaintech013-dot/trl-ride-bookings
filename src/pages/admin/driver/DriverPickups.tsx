import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Phone, 
  Clock,
  Navigation,
  User,
  FileText
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useBookings } from '@/contexts/BookingContext';
import { rideStatuses, Booking } from '@/lib/mockData';
import { toast } from 'sonner';

const DriverPickups: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get('id');
  const { user } = useAuth();
  const { bookings, updateBookingStatus } = useBookings();
  
  const myBookings = bookings.filter(b => b.assignedDriver === user?.driverId);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
    selectedId ? myBookings.find(b => b.id === selectedId) || null : null
  );

  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    updateBookingStatus(bookingId, newStatus);
    if (selectedBooking?.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
    toast.success('Status updated successfully');
  };

  const openMaps = (location: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            My Pickups
          </h1>
          <p className="text-muted-foreground">
            View and manage your assigned rides
          </p>
        </div>

        {/* Bookings List */}
        <div className="grid gap-4">
          {myBookings.length > 0 ? (
            myBookings.map((booking) => (
              <Card 
                key={booking.id} 
                className="card-hover cursor-pointer"
                onClick={() => setSelectedBooking(booking)}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-sm text-primary">{booking.ticketId}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'en-route' || booking.status === 'picked'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-secondary/20 text-secondary-foreground'
                        }`}>
                          {rideStatuses.find(s => s.key === booking.status)?.label}
                        </span>
                      </div>
                      <p className="font-semibold text-foreground mb-1">{booking.passengerName}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {booking.pickupLocation}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(booking.pickupDateTime).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openMaps(booking.pickupLocation);
                      }}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Navigate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No pickups assigned to you yet</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Booking Details Modal */}
        <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">Pickup Details</DialogTitle>
            </DialogHeader>
            {selectedBooking && (
              <div className="space-y-6">
                {/* Ticket ID */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg font-semibold text-primary">
                    {selectedBooking.ticketId}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedBooking.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-secondary/20 text-secondary-foreground'
                  }`}>
                    {rideStatuses.find(s => s.key === selectedBooking.status)?.label}
                  </span>
                </div>

                {/* Passenger Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Passenger
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{selectedBooking.passengerName}</p>
                      <p className="text-sm text-muted-foreground">{selectedBooking.passengers} passengers</p>
                    </div>
                    <a 
                      href={`tel:${selectedBooking.contactPhone}`}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </a>
                  </div>
                </div>

                {/* Journey Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Journey
                  </h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => openMaps(selectedBooking.pickupLocation)}
                      className="w-full flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left"
                    >
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Pickup</p>
                        <p className="font-medium text-foreground">{selectedBooking.pickupLocation}</p>
                      </div>
                      <Navigation className="w-4 h-4 text-green-600" />
                    </button>
                    <button
                      onClick={() => openMaps(selectedBooking.destination)}
                      className="w-full flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-left"
                    >
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">Destination</p>
                        <p className="font-medium text-foreground">{selectedBooking.destination}</p>
                      </div>
                      <Navigation className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(selectedBooking.pickupDateTime).toLocaleString()}</span>
                  </div>
                </div>

                {/* Notes */}
                {selectedBooking.notes && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Notes
                    </h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                      {selectedBooking.notes}
                    </p>
                  </div>
                )}

                {/* Update Status */}
                <div className="space-y-2">
                  <label className="font-semibold text-foreground">Update Status</label>
                  <Select
                    value={selectedBooking.status}
                    onValueChange={(value) => handleStatusChange(selectedBooking.id, value as Booking['status'])}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {rideStatuses.map(status => (
                        <SelectItem key={status.key} value={status.key}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default DriverPickups;
