// Mock Data for TRL Prototype

export interface Driver {
  id: string;
  name: string;
  phone: string;
  idNumber: string;
  carModel: string;
  vehicleReg: string;
  enrollmentDate: string;
  completedTrips: number;
  status: 'active' | 'off';
  avatar?: string;
}

export interface Booking {
  id: string;
  ticketId: string;
  passengerName: string;
  contactPhone: string;
  pickupLocation: string;
  destination: string;
  pickupDateTime: string;
  passengers: number;
  serviceType: string;
  notes?: string;
  status: 'confirmed' | 'driver-on-way' | 'waiting' | 'picked' | 'en-route' | 'completed';
  assignedDriver?: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  role: 'ceo' | 'driver';
  name: string;
  driverId?: string;
}

export const mockUsers: User[] = [
  { id: '1', username: 'ephy', password: 'trl', role: 'ceo', name: 'Ephy - CEO' },
  { id: '2', username: 'driver1', password: 'trl', role: 'driver', name: 'James Mwangi', driverId: 'd1' },
  { id: '3', username: 'driver2', password: 'trl', role: 'driver', name: 'Peter Ochieng', driverId: 'd2' },
];

export const mockDrivers: Driver[] = [
  {
    id: 'd1',
    name: 'James Mwangi',
    phone: '0722345678',
    idNumber: '28456789',
    carModel: 'Toyota Prado TX',
    vehicleReg: 'KCB 456X',
    enrollmentDate: '2023-03-15',
    completedTrips: 156,
    status: 'active',
  },
  {
    id: 'd2',
    name: 'Peter Ochieng',
    phone: '0733456789',
    idNumber: '29567890',
    carModel: 'Mercedes V-Class',
    vehicleReg: 'KDD 789Y',
    enrollmentDate: '2023-06-20',
    completedTrips: 98,
    status: 'active',
  },
  {
    id: 'd3',
    name: 'David Kamau',
    phone: '0744567890',
    idNumber: '30678901',
    carModel: 'Land Cruiser VX',
    vehicleReg: 'KCE 123Z',
    enrollmentDate: '2024-01-10',
    completedTrips: 45,
    status: 'off',
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    ticketId: 'TRL-2024-001',
    passengerName: 'Sarah Njoki',
    contactPhone: '0712345678',
    pickupLocation: 'Westlands, Nairobi',
    destination: 'JKIA Terminal 1',
    pickupDateTime: '2024-01-20T08:00:00',
    passengers: 2,
    serviceType: 'Airport Transfers',
    status: 'confirmed',
    assignedDriver: 'd1',
    createdAt: '2024-01-19T14:30:00',
  },
  {
    id: 'b2',
    ticketId: 'TRL-2024-002',
    passengerName: 'Michael Otieno',
    contactPhone: '0723456789',
    pickupLocation: 'Karen, Nairobi',
    destination: 'Masai Mara Reserve',
    pickupDateTime: '2024-01-21T06:00:00',
    passengers: 4,
    serviceType: 'Game Drive',
    notes: 'Safari trip for the weekend',
    status: 'driver-on-way',
    assignedDriver: 'd2',
    createdAt: '2024-01-18T10:00:00',
  },
  {
    id: 'b3',
    ticketId: 'TRL-2024-003',
    passengerName: 'Grace Wanjiku',
    contactPhone: '0734567890',
    pickupLocation: 'CBD, Nairobi',
    destination: 'Kilimani Office Park',
    pickupDateTime: '2024-01-20T07:30:00',
    passengers: 1,
    serviceType: 'Corporate Rides',
    status: 'en-route',
    assignedDriver: 'd1',
    createdAt: '2024-01-19T18:00:00',
  },
  {
    id: 'b4',
    ticketId: 'TRL-2024-004',
    passengerName: 'John Kimani',
    contactPhone: '0745678901',
    pickupLocation: 'Lavington, Nairobi',
    destination: 'Lake Naivasha',
    pickupDateTime: '2024-01-22T09:00:00',
    passengers: 6,
    serviceType: 'Family Drive',
    notes: 'Family outing with kids',
    status: 'confirmed',
    assignedDriver: 'd3',
    createdAt: '2024-01-19T20:00:00',
  },
  {
    id: 'b5',
    ticketId: 'TRL-2024-005',
    passengerName: 'Emily Achieng',
    contactPhone: '0756789012',
    pickupLocation: 'Upperhill, Nairobi',
    destination: 'Diani Beach',
    pickupDateTime: '2024-01-25T05:00:00',
    passengers: 3,
    serviceType: 'Road Trips',
    status: 'completed',
    assignedDriver: 'd2',
    createdAt: '2024-01-15T12:00:00',
  },
];

export const rideStatuses = [
  { key: 'confirmed', label: 'Booking Confirmed', description: 'Your ride has been confirmed' },
  { key: 'driver-on-way', label: 'Driver on the Way', description: 'Driver is heading to pickup location' },
  { key: 'waiting', label: 'Waiting for Passengers', description: 'Driver has arrived and is waiting' },
  { key: 'picked', label: 'Passengers Picked', description: 'All passengers have boarded' },
  { key: 'en-route', label: 'En Route', description: 'Journey in progress' },
  { key: 'completed', label: 'Journey Completed', description: 'You have arrived at your destination' },
];

export const services = [
  {
    id: 'corporate',
    name: 'Corporate Rides',
    description: 'Professional transportation for business executives and corporate events. Reliable, punctual, and comfortable.',
    icon: 'Briefcase',
  },
  {
    id: 'airport',
    name: 'Airport Transfers',
    description: 'Seamless airport pickups and drop-offs. We track your flight and adjust timing accordingly.',
    icon: 'Plane',
  },
  {
    id: 'game-drive',
    name: 'Game Drive',
    description: 'Experience Kenya\'s wildlife with our safari-ready vehicles and experienced drivers.',
    icon: 'Mountain',
  },
  {
    id: 'excursion',
    name: 'Excursion',
    description: 'Day trips and tours to exciting destinations. Perfect for tourists and locals alike.',
    icon: 'Map',
  },
  {
    id: 'team-building',
    name: 'Team Building',
    description: 'Transport solutions for corporate team building events and group activities.',
    icon: 'Users',
  },
  {
    id: 'road-trips',
    name: 'Road Trips',
    description: 'Long-distance travel made comfortable. Explore Kenya with reliable transportation.',
    icon: 'Route',
  },
  {
    id: 'family-drive',
    name: 'Family Drive',
    description: 'Safe and comfortable rides for the whole family. Child-friendly vehicles available.',
    icon: 'Heart',
  },
];

export const generateTicketId = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `TRL-${year}-${random}`;
};

export const analyticsData = {
  serviceBreakdown: [
    { name: 'Corporate Rides', value: 35, color: 'hsl(210, 60%, 25%)' },
    { name: 'Airport Transfers', value: 25, color: 'hsl(42, 100%, 50%)' },
    { name: 'Game Drive', value: 15, color: 'hsl(205, 85%, 55%)' },
    { name: 'Family Drive', value: 12, color: 'hsl(45, 100%, 65%)' },
    { name: 'Road Trips', value: 8, color: 'hsl(210, 65%, 18%)' },
    { name: 'Others', value: 5, color: 'hsl(210, 15%, 70%)' },
  ],
  peakBookingTimes: [
    { hour: '6AM', bookings: 12 },
    { hour: '7AM', bookings: 28 },
    { hour: '8AM', bookings: 45 },
    { hour: '9AM', bookings: 32 },
    { hour: '10AM', bookings: 18 },
    { hour: '11AM', bookings: 15 },
    { hour: '12PM', bookings: 22 },
    { hour: '1PM', bookings: 20 },
    { hour: '2PM', bookings: 16 },
    { hour: '3PM', bookings: 24 },
    { hour: '4PM', bookings: 38 },
    { hour: '5PM', bookings: 42 },
    { hour: '6PM', bookings: 35 },
    { hour: '7PM', bookings: 25 },
  ],
  topLocations: [
    { location: 'Westlands', orders: 156 },
    { location: 'JKIA', orders: 134 },
    { location: 'CBD', orders: 98 },
    { location: 'Karen', orders: 87 },
    { location: 'Kilimani', orders: 76 },
  ],
  driverPerformance: [
    { name: 'James M.', trips: 156, rating: 4.9 },
    { name: 'Peter O.', trips: 98, rating: 4.8 },
    { name: 'David K.', trips: 45, rating: 4.7 },
  ],
  monthlyStats: {
    totalRides: 456,
    activeDrivers: 3,
    completedRides: 398,
    scheduledPickups: 58,
    revenue: 2450000,
  },
};
