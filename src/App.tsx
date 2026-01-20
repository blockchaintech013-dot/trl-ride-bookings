import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { BookingProvider } from "@/contexts/BookingContext";

// Public Pages
import Index from "./pages/Index";
import BookRide from "./pages/BookRide";
import TrackRide from "./pages/TrackRide";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import CEODashboard from "./pages/admin/CEODashboard";
import ScheduledPickups from "./pages/admin/ScheduledPickups";
import Drivers from "./pages/admin/Drivers";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";

// Driver Pages
import DriverDashboard from "./pages/admin/driver/DriverDashboard";
import DriverPickups from "./pages/admin/driver/DriverPickups";
import DriverSettings from "./pages/admin/driver/DriverSettings";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: ('ceo' | 'driver')[] }> = ({ 
  children, 
  allowedRoles 
}) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/trl" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'ceo' ? '/trl/dashboard' : '/trl/driver'} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/book" element={<BookRide />} />
      <Route path="/track" element={<TrackRide />} />

      {/* Admin Login */}
      <Route path="/trl" element={<AdminLogin />} />

      {/* CEO Routes */}
      <Route
        path="/trl/dashboard"
        element={
          <ProtectedRoute allowedRoles={['ceo']}>
            <CEODashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trl/pickups"
        element={
          <ProtectedRoute allowedRoles={['ceo']}>
            <ScheduledPickups />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trl/drivers"
        element={
          <ProtectedRoute allowedRoles={['ceo']}>
            <Drivers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trl/analytics"
        element={
          <ProtectedRoute allowedRoles={['ceo']}>
            <Analytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trl/settings"
        element={
          <ProtectedRoute allowedRoles={['ceo']}>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* Driver Routes */}
      <Route
        path="/trl/driver"
        element={
          <ProtectedRoute allowedRoles={['driver']}>
            <DriverDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trl/driver/pickups"
        element={
          <ProtectedRoute allowedRoles={['driver']}>
            <DriverPickups />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trl/driver/settings"
        element={
          <ProtectedRoute allowedRoles={['driver']}>
            <DriverSettings />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BookingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </BookingProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
