import React from 'react';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection: React.FC = () => {
  const openWhatsApp = () => {
    window.open('https://wa.me/254715133570', '_blank');
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div>
            <span className="inline-block bg-secondary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-4">
              Get In Touch
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to <span className="text-primary">Start Your Journey</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg">
              Have questions or need to book a ride? Our team is here to help you 24/7. 
              Reach out through any of our channels below.
            </p>

            <div className="space-y-4 mb-8">
              <a 
                href="tel:0724210330"
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Phone className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Call Us</p>
                  <p className="text-muted-foreground">0724 210 330</p>
                </div>
              </a>

              <button 
                onClick={openWhatsApp}
                className="w-full flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-[#25D366]/50 transition-colors group text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors">
                  <MessageCircle className="w-6 h-6 text-[#25D366] group-hover:text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">WhatsApp</p>
                  <p className="text-muted-foreground">0715 133 570</p>
                </div>
              </button>

              <a 
                href="mailto:tirelogistics@gmail.com"
                className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-secondary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-colors">
                  <Mail className="w-6 h-6 text-secondary-foreground group-hover:text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-muted-foreground">tirelogistics@gmail.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-card rounded-3xl overflow-hidden shadow-lg border border-border">
            <div className="aspect-square lg:aspect-[4/3] bg-muted relative">
              {/* Simulated Map */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                      Nairobi, Kenya
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Serving the greater Nairobi area and beyond
                    </p>
                  </div>
                </div>
                
                {/* Decorative grid lines */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="p-6 bg-primary text-primary-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold">Timely Response Logistics</p>
                  <p className="text-primary-foreground/80 text-sm">Available 24/7</p>
                </div>
                <Button 
                  onClick={openWhatsApp}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Chat Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
