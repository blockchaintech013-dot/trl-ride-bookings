import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-gradient hero-pattern relative overflow-hidden">
      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-primary-foreground animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Reliable Transport Solutions</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              We Stay <span className="text-secondary">Productive</span>,
              <br />Not Busy
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg">
              Let us handle your transport needs while you concentrate on your core business. 
              Professional, timely, and reliable logistics services in Nairobi and beyond.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/book">
                <Button size="lg" className="btn-yellow text-lg px-8 py-6 w-full sm:w-auto">
                  Book a Ride
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/track">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6 w-full sm:w-auto"
                >
                  Track Your Ride
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Car className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-sm text-primary-foreground/70">Rides Completed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm text-primary-foreground/70">Safe Journeys</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-sm text-primary-foreground/70">Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent rounded-3xl blur-3xl"></div>
            <div className="relative bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 border border-primary-foreground/20">
              <div className="space-y-6">
                {/* Simulated Car Graphic */}
                <div className="aspect-video bg-gradient-to-br from-secondary/30 to-primary-foreground/5 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Car className="w-24 h-24 text-secondary mx-auto mb-4 animate-float" />
                    <p className="text-primary-foreground/80 font-medium">Your Ride Awaits</p>
                  </div>
                </div>
                
                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-foreground/10 rounded-xl p-4">
                    <p className="text-secondary font-semibold text-lg">Fast Booking</p>
                    <p className="text-sm text-primary-foreground/70">Book in under 2 minutes</p>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-xl p-4">
                    <p className="text-secondary font-semibold text-lg">Live Tracking</p>
                    <p className="text-sm text-primary-foreground/70">Real-time updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;
