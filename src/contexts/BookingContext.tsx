import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockBookings, Booking, generateTicketId } from '@/lib/mockData';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'ticketId' | 'status' | 'createdAt'>) => string;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  getBookingByTicket: (ticketId: string) => Booking | undefined;
  assignDriver: (bookingId: string, driverId: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const addBooking = (booking: Omit<Booking, 'id' | 'ticketId' | 'status' | 'createdAt'>): string => {
    const ticketId = generateTicketId();
    const newBooking: Booking = {
      ...booking,
      id: `b${Date.now()}`,
      ticketId,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
    return ticketId;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const getBookingByTicket = (ticketId: string) => {
    return bookings.find((b) => b.ticketId.toLowerCase() === ticketId.toLowerCase());
  };

  const assignDriver = (bookingId: string, driverId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, assignedDriver: driverId } : b))
    );
  };

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, updateBookingStatus, getBookingByTicket, assignDriver }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
};
