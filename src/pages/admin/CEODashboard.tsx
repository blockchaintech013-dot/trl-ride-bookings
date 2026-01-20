import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBookings } from '@/contexts/BookingContext';
import { mockDrivers, analyticsData, rideStatuses } from '@/lib/mockData';

const CEODashboard: React.FC = () => {
  const { bookings } = useBookings();

  const stats = [
    {
      label: 'Active Drivers',
      value: mockDrivers.filter(d => d.status === 'active').length,
      icon: Users,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Scheduled Pickups',
      value: bookings.filter(b => b.status !== 'completed').length,
      icon: Calendar,
      color: 'bg-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      label: 'Completed Rides',
      value: bookings.filter(b => b.status === 'completed').length,
      icon: CheckCircle,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Total Revenue',
      value: `KES ${(analyticsData.monthlyStats.revenue / 1000).toFixed(0)}K`,
      icon: TrendingUp,
      color: 'bg-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  const recentBookings = bookings.slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your operations.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="card-hover">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display">Recent Scheduled Pickups</CardTitle>
            <Link to="/trl/pickups">
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <Link
                  key={booking.id}
                  to={`/trl/pickups?id=${booking.id}`}
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
                        booking.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'en-route'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-secondary/20 text-secondary-foreground'
                      }`}>
                        {rideStatuses.find(s => s.key === booking.status)?.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {booking.pickupLocation} → {booking.destination}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(booking.pickupDateTime).toLocaleString()}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/trl/drivers">
            <Card className="card-hover h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Manage Drivers</p>
                  <p className="text-sm text-muted-foreground">View and manage driver accounts</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/trl/analytics">
            <Card className="card-hover h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">View Analytics</p>
                  <p className="text-sm text-muted-foreground">Insights and performance data</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/trl/pickups">
            <Card className="card-hover h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">All Pickups</p>
                  <p className="text-sm text-muted-foreground">Manage scheduled rides</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CEODashboard;
