import React, { useState } from 'react';
import { 
  Key,
  Save,
  Power,
  PowerOff
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { mockDrivers } from '@/lib/mockData';
import { toast } from 'sonner';

const DriverSettings: React.FC = () => {
  const { user } = useAuth();
  const driver = mockDrivers.find(d => d.id === user?.driverId);

  const [isAvailable, setIsAvailable] = useState(driver?.status === 'active');
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleAvailabilityToggle = (checked: boolean) => {
    setIsAvailable(checked);
    toast.success(`Status updated to ${checked ? 'Active' : 'Off'} (Mock)`);
  };

  const handleResetPassword = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (!passwords.new || passwords.new.length < 4) {
      toast.error('Password must be at least 4 characters');
      return;
    }
    toast.success('Password updated successfully (Mock)');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Availability Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                {isAvailable ? (
                  <Power className="w-5 h-5 text-green-500" />
                ) : (
                  <PowerOff className="w-5 h-5 text-muted-foreground" />
                )}
                Availability Status
              </CardTitle>
              <CardDescription>
                Toggle your availability for new ride assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                <div>
                  <p className="font-medium text-foreground">
                    {isAvailable ? 'You are Active' : 'You are Off'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isAvailable 
                      ? 'You can receive new ride assignments'
                      : 'You will not receive new assignments'
                    }
                  </p>
                </div>
                <Switch
                  checked={isAvailable}
                  onCheckedChange={handleAvailabilityToggle}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>

              <div className={`mt-4 p-4 rounded-xl border ${
                isAvailable 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-muted border-border'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    isAvailable ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground'
                  }`}></div>
                  <span className={`font-medium ${
                    isAvailable ? 'text-green-700' : 'text-muted-foreground'
                  }`}>
                    {isAvailable ? 'Online & Ready' : 'Offline'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reset Password */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Key className="w-5 h-5" />
                Reset Password
              </CardTitle>
              <CardDescription>
                Change your login password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  placeholder="Confirm new password"
                />
              </div>
              <Button onClick={handleResetPassword} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* Driver Info Card */}
          {driver && (
            <Card className="lg:col-span-2 bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold text-xl mb-4">Your Profile</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-primary-foreground/70">Name</p>
                    <p className="font-semibold">{driver.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70">Phone</p>
                    <p className="font-semibold">{driver.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70">Vehicle</p>
                    <p className="font-semibold">{driver.carModel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70">Registration</p>
                    <p className="font-semibold font-mono">{driver.vehicleReg}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default DriverSettings;
