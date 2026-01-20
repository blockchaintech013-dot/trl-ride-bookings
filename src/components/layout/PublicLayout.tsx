import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MessageCircle, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Book a Ride', href: '/book' },
  { name: 'Track Ride', href: '/track' },
];

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const openWhatsApp = () => {
    window.open('https://wa.me/254715133570', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-center md:justify-between items-center text-sm gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="tel:0724210330" className="flex items-center gap-1 hover:text-secondary transition-colors">
              <Phone className="w-4 h-4" />
              <span>0724 210 330</span>
            </a>
            <a href="mailto:tirelogistics@gmail.com" className="flex items-center gap-1 hover:text-secondary transition-colors">
              <Mail className="w-4 h-4" />
              <span>tirelogistics@gmail.com</span>
            </a>
          </div>
          <button
            onClick={openWhatsApp}
            className="flex items-center gap-1 hover:text-secondary transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-card shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-secondary font-display font-bold text-xl">T</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display font-bold text-primary text-lg leading-tight">
                  Timely Response
                </h1>
                <p className="text-xs text-muted-foreground">Logistics</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-medium transition-colors ${
                    location.pathname === link.href
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link to="/book">
                <Button className="btn-yellow">Book Now</Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors ${
                        location.pathname === link.href
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link to="/book" onClick={() => setIsOpen(false)}>
                    <Button className="btn-yellow w-full">Book Now</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* WhatsApp Floating Button */}
      <button onClick={openWhatsApp} className="whatsapp-btn" aria-label="Chat on WhatsApp">
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="text-secondary-foreground font-display font-bold text-xl">T</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">Timely Response Logistics</h3>
                </div>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                We stay productive, not busy. Let us handle your transport needs while you focus on what matters most.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/80 hover:text-secondary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li>
                  <a href="tel:0724210330" className="flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>0724 210 330</span>
                  </a>
                </li>
                <li>
                  <a href="tel:0715133570" className="flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>0715 133 570 (WhatsApp)</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:tirelogistics@gmail.com" className="flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>tirelogistics@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} Timely Response Logistics. All rights reserved.</p>
            <p className="mt-1">Nairobi, Kenya</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
