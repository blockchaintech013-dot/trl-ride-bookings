import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Car, 
  Calendar,
  CheckCircle,
  XCircle,
  MapPin
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockDrivers, Driver } from '@/lib/mockData';

const Drivers: React.FC = () => {
  const [drivers] = useState<Driver[]>(mockDrivers);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Drivers Management
            </h1>
            <p className="text-muted-foreground">
              View and manage driver information
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              {drivers.filter(d => d.status === 'active').length} Active
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              {drivers.filter(d => d.status === 'off').length} Off
            </Badge>
          </div>
        </div>

        {/* Drivers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((driver) => (
            <Card key={driver.id} className="card-hover">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <User className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-lg">{driver.name}</p>
                      <a 
                        href={`tel:${driver.phone}`}
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        {driver.phone}
                      </a>
                    </div>
                  </div>
                  <Badge 
                    variant={driver.status === 'active' ? 'default' : 'secondary'}
                    className={driver.status === 'active' ? 'bg-green-500' : ''}
                  >
                    {driver.status === 'active' ? (
                      <><CheckCircle className="w-3 h-3 mr-1" /> Active</>
                    ) : (
                      <><XCircle className="w-3 h-3 mr-1" /> Off</>
                    )}
                  </Badge>
                </div>

                {/* Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">ID Number</span>
                    <span className="font-medium">{driver.idNumber}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Car className="w-4 h-4" />
                      Vehicle
                    </span>
                    <span className="font-medium">{driver.carModel}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Registration</span>
                    <span className="font-medium font-mono">{driver.vehicleReg}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Enrolled
                    </span>
                    <span className="font-medium">
                      {new Date(driver.enrollmentDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Completed Trips
                    </span>
                    <span className="font-bold text-primary text-lg">{driver.completedTrips}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-semibold text-xl mb-1">Fleet Overview</h3>
                <p className="text-primary-foreground/80">
                  Total of {drivers.length} drivers with {drivers.reduce((acc, d) => acc + d.completedTrips, 0)} completed trips
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold">{drivers.filter(d => d.status === 'active').length}</p>
                  <p className="text-sm text-primary-foreground/70">Available Now</p>
                </div>
                <div className="w-px h-12 bg-primary-foreground/20"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{drivers.length}</p>
                  <p className="text-sm text-primary-foreground/70">Total Drivers</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Drivers;
