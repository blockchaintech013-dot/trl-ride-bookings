import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Plane, 
  Mountain, 
  Map, 
  Users, 
  Route, 
  Heart,
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/mockData';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Briefcase,
  Plane,
  Mountain,
  Map,
  Users,
  Route,
  Heart,
};

const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block bg-secondary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transportation Solutions for <span className="text-primary">Every Need</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From corporate rides to family adventures, we've got you covered with our comprehensive 
            range of transport services.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Briefcase;
            return (
              <div
                key={service.id}
                className="service-card group bg-card rounded-2xl p-6 shadow-card border border-border hover:border-secondary/50 card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="service-icon mb-4">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {service.description}
                </p>
                <Link to={`/book?service=${service.id}`}>
                  <Button 
                    variant="ghost" 
                    className="p-0 h-auto text-primary font-medium group-hover:text-secondary transition-colors"
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
