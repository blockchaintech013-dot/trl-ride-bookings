import React from 'react';
import { Shield, Clock, ThumbsUp, Headphones, Award, MapPin } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Vetted drivers, maintained vehicles, and comprehensive insurance for peace of mind.',
  },
  {
    icon: Clock,
    title: 'Always On Time',
    description: 'We value your time. Our drivers arrive promptly, every single time.',
  },
  {
    icon: ThumbsUp,
    title: 'Professional Service',
    description: 'Trained, courteous drivers who represent professionalism at its finest.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer support to assist you whenever you need us.',
  },
  {
    icon: Award,
    title: 'Quality Vehicles',
    description: 'Well-maintained, comfortable vehicles suitable for all occasions.',
  },
  {
    icon: MapPin,
    title: 'Live Tracking',
    description: 'Track your ride in real-time and stay informed throughout your journey.',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-4">
            Why TRL?
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-secondary">Timely Response</span> Logistics?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're not just a transport company—we're your reliable partner in mobility, 
            committed to excellence in every journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex gap-4 p-6 bg-card rounded-2xl shadow-sm border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-blue">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-card rounded-2xl p-6 shadow-lg border border-border">
            <div className="text-left">
              <p className="font-display font-semibold text-lg text-foreground">
                Ready to experience the difference?
              </p>
              <p className="text-muted-foreground text-sm">
                Book your first ride with TRL today.
              </p>
            </div>
            <a href="/book" className="btn-yellow inline-block">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
