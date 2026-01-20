import React, { useState } from 'react';
import { 
  UserPlus, 
  Trash2, 
  Key,
  Save,
  AlertTriangle
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const [newDriver, setNewDriver] = useState({
    name: '',
    phone: '',
    idNumber: '',
    carModel: '',
    vehicleReg: '',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleCreateDriver = () => {
    if (!newDriver.name || !newDriver.phone) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success(`Driver account created for ${newDriver.name} (Mock)`);
    setNewDriver({ name: '', phone: '', idNumber: '', carModel: '', vehicleReg: '' });
  };

  const handleResetPassword = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error('Passwords do not match');
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
            Manage accounts and system preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Create Driver Account */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Create Driver Account
              </CardTitle>
              <CardDescription>
                Add a new driver to the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="driverName">Full Name *</Label>
                  <Input
                    id="driverName"
                    value={newDriver.name}
                    onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="driverPhone">Phone *</Label>
                  <Input
                    id="driverPhone"
                    value={newDriver.phone}
                    onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                    placeholder="0712345678"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="driverIdNumber">ID Number</Label>
                <Input
                  id="driverIdNumber"
                  value={newDriver.idNumber}
                  onChange={(e) => setNewDriver({ ...newDriver, idNumber: e.target.value })}
                  placeholder="12345678"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="carModel">Car Model</Label>
                  <Input
                    id="carModel"
                    value={newDriver.carModel}
                    onChange={(e) => setNewDriver({ ...newDriver, carModel: e.target.value })}
                    placeholder="Toyota Prado"
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleReg">Vehicle Reg</Label>
                  <Input
                    id="vehicleReg"
                    value={newDriver.vehicleReg}
                    onChange={(e) => setNewDriver({ ...newDriver, vehicleReg: e.target.value })}
                    placeholder="KAB 123X"
                  />
                </div>
              </div>
              <Button onClick={handleCreateDriver} className="w-full btn-yellow">
                <UserPlus className="w-4 h-4 mr-2" />
                Create Driver Account
              </Button>
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
                Change your admin password
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

          {/* Delete Driver Account */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2 text-destructive">
                <Trash2 className="w-5 h-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible actions. Please proceed with caution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                <div>
                  <p className="font-medium text-foreground">Delete Driver Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently remove a driver from the system
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Driver
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        Delete Driver Account
                      </DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete the driver account 
                        and remove all associated data.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Label htmlFor="deleteDriverName">Enter driver name to confirm</Label>
                      <Input id="deleteDriverName" placeholder="Driver name" className="mt-2" />
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button 
                        variant="destructive"
                        onClick={() => toast.success('Driver account deleted (Mock)')}
                      >
                        Delete Account
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
