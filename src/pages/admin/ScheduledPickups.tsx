import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Phone, 
  Clock,
  Car,
  X,
  User,
  FileText
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useBookings } from '@/contexts/BookingContext';
import { mockDrivers, rideStatuses, Booking } from '@/lib/mockData';
import { toast } from 'sonner';

const ScheduledPickups: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get('id');
  const { bookings, updateBookingStatus, assignDriver } = useBookings();
  
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
    selectedId ? bookings.find(b => b.id === selectedId) || null : null
  );
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredBookings = statusFilter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === statusFilter);

  const handleStatusChange = (bookingId: string, newStatus: Booking['status']) => {
    updateBookingStatus(bookingId, newStatus);
    if (selectedBooking?.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
    toast.success('Status updated successfully');
  };

  const handleDriverAssign = (bookingId: string, driverId: string) => {
    assignDriver(bookingId, driverId);
    if (selectedBooking?.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, assignedDriver: driverId });
    }
    toast.success('Driver assigned successfully');
  };

  const getDriver = (driverId?: string) => {
    return mockDrivers.find(d => d.id === driverId);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Scheduled Pickups
            </h1>
            <p className="text-muted-foreground">
              Manage all scheduled rides and assignments
            </p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {rideStatuses.map(status => (
                <SelectItem key={status.key} value={status.key}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bookings List */}
        <div className="grid gap-4">
          {filteredBookings.map((booking) => {
            const driver = getDriver(booking.assignedDriver);
            return (
              <Card 
                key={booking.id} 
                className="card-hover cursor-pointer"
                onClick={() => setSelectedBooking(booking)}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Left: Booking Info */}
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
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {booking.passengers} passengers
                        </span>
                      </div>
                    </div>

                    {/* Right: Driver & Actions */}
                    <div className="flex items-center gap-3">
                      {driver ? (
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{driver.name}</p>
                          <p className="text-xs text-muted-foreground">{driver.vehicleReg}</p>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">No driver assigned</span>
                      )}
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Car className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredBookings.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No bookings found for the selected filter.
              </CardContent>
            </Card>
          )}
        </div>

        {/* Booking Details Modal */}
        <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">Booking Details</DialogTitle>
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
                    Passenger Information
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Name</p>
                      <p className="font-medium">{selectedBooking.passengerName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <a href={`tel:${selectedBooking.contactPhone}`} className="font-medium text-primary">
                        {selectedBooking.contactPhone}
                      </a>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Passengers</p>
                      <p className="font-medium">{selectedBooking.passengers}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Service</p>
                      <p className="font-medium">{selectedBooking.serviceType}</p>
                    </div>
                  </div>
                </div>

                {/* Journey Info */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Journey Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500 mt-1"></div>
                      <div>
                        <p className="text-muted-foreground">Pickup</p>
                        <p className="font-medium">{selectedBooking.pickupLocation}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 mt-1"></div>
                      <div>
                        <p className="text-muted-foreground">Destination</p>
                        <p className="font-medium">{selectedBooking.destination}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <p className="font-medium">
                        {new Date(selectedBooking.pickupDateTime).toLocaleString()}
                      </p>
                    </div>
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

                {/* Assign Driver */}
                <div className="space-y-2">
                  <label className="font-semibold text-foreground">Assigned Driver</label>
                  <Select
                    value={selectedBooking.assignedDriver || ''}
                    onValueChange={(value) => handleDriverAssign(selectedBooking.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a driver" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDrivers.filter(d => d.status === 'active').map(driver => (
                        <SelectItem key={driver.id} value={driver.id}>
                          {driver.name} - {driver.vehicleReg}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Change Status */}
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

export default ScheduledPickups;
