import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle, 
  Clock,
  ArrowRight,
  MapPin
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useBookings } from '@/contexts/BookingContext';
import { mockDrivers, rideStatuses } from '@/lib/mockData';

const DriverDashboard: React.FC = () => {
  const { user } = useAuth();
  const { bookings } = useBookings();

  const driver = mockDrivers.find(d => d.id === user?.driverId);
  const myBookings = bookings.filter(b => b.assignedDriver === user?.driverId);
  const pendingBookings = myBookings.filter(b => b.status !== 'completed');
  const completedBookings = myBookings.filter(b => b.status === 'completed');

  const stats = [
    {
      label: 'Assigned Pickups',
      value: pendingBookings.length,
      icon: Calendar,
      color: 'bg-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      label: 'Completed Journeys',
      value: driver?.completedTrips || completedBookings.length,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Welcome, {driver?.name || user?.name}
            </h1>
            <p className="text-muted-foreground">
              Here's your schedule for today
            </p>
          </div>
          {driver && (
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">Vehicle:</span>
              <span className="font-semibold text-foreground">{driver.vehicleReg}</span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="card-hover">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Pickups */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display">Your Assigned Pickups</CardTitle>
            <Link to="/trl/driver/pickups">
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {pendingBookings.length > 0 ? (
              <div className="space-y-4">
                {pendingBookings.slice(0, 3).map((booking) => (
                  <Link
                    key={booking.id}
                    to={`/trl/driver/pickups?id=${booking.id}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground truncate">
                          {booking.passengerName}
                        </p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === 'en-route'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-secondary/20 text-secondary-foreground'
                        }`}>
                          {rideStatuses.find(s => s.key === booking.status)?.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {booking.pickupLocation}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(booking.pickupDateTime).toLocaleString()}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No pickups assigned yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default DriverDashboard;
