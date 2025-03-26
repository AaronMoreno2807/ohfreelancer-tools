
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle } from 'lucide-react';
import AnimatedText from '../ui/AnimatedText';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('staggered-reveal');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(heroRef.current);
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-oh-accent/5 blur-3xl opacity-70" />
        <div className="absolute bottom-1/3 -right-10 w-60 h-60 rounded-full bg-oh-accent/10 blur-3xl opacity-70" />
      </div>

      <div className="oh-container">
        <div className="max-w-3xl mx-auto text-center" ref={heroRef}>
          <div className="inline-block mb-4 px-3 py-1 bg-oh-accent/10 rounded-full text-oh-accent text-sm font-medium">
            Empowering Freelancers Worldwide
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight mb-6">
            Simplify Your Freelance <br className="hidden sm:block" />
            <span className="text-oh-accent">Administrative Tasks</span>
          </h1>
          
          <p className="text-oh-muted-text text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            OhFreelancers.com helps you manage invoices, payments, and administrative 
            operations so you can focus on what you do best.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/register" className="oh-button-primary w-full sm:w-auto">
              Get Started
            </Link>
            <Link to="/services" className="oh-button-outline w-full sm:w-auto group">
              <span>Explore Services</span>
              <ChevronRight className="inline-block ml-1 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-oh-accent mr-2" />
              <span className="text-oh-muted-text">ChatBot Integration</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-oh-accent mr-2" />
              <span className="text-oh-muted-text">Regulatory Compliance</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-oh-accent mr-2" />
              <span className="text-oh-muted-text">Fast & Secure Payments</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-oh-accent mr-2" />
              <span className="text-oh-muted-text">Personalized Support</span>
            </div>
          </div>
        </div>
        
        {/* Hero image/illustration */}
        <div className="mt-16 max-w-4xl mx-auto relative">
          <div className="aspect-video rounded-2xl bg-white shadow-xl border border-oh-border overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-oh-accent/5 to-transparent"></div>
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-oh-primary flex items-center justify-center mr-2">
                    <img 
                      src="/lovable-uploads/5aa96ccb-a325-426d-8ba4-dac5f7e0c0ef.png" 
                      alt="OhFreelancers Logo" 
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <span className="font-semibold text-sm">OhFreelancers Dashboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-oh-border/20 rounded-xl p-4">
                  <div className="h-4 w-32 bg-oh-border/50 rounded-full mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-oh-border/40 rounded-full"></div>
                    <div className="h-3 w-5/6 bg-oh-border/40 rounded-full"></div>
                    <div className="h-3 w-4/6 bg-oh-border/40 rounded-full"></div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="h-16 bg-oh-border/30 rounded-lg"></div>
                    <div className="h-16 bg-oh-border/30 rounded-lg"></div>
                  </div>
                </div>
                <div className="bg-oh-border/20 rounded-xl p-4 flex flex-col">
                  <div className="h-4 w-24 bg-oh-border/50 rounded-full mb-4"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-10 bg-oh-border/30 rounded-lg"></div>
                    <div className="h-10 bg-oh-border/30 rounded-lg"></div>
                    <div className="h-10 bg-oh-accent/20 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Visual elements overlapping the illustration */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-xl bg-white rotate-12 shadow-lg border border-oh-border flex items-center justify-center p-3 animate-float">
            <div className="w-full h-full bg-oh-accent/10 rounded-lg flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 5L2 12.5L9 13.5M21 5L18.5 20L9 13.5M21 5L9 13.5" stroke="#0066cc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div className="absolute -bottom-5 -left-5 w-28 h-16 bg-white rounded-xl shadow-lg border border-oh-border p-3 flex items-center animate-float" style={{ animationDelay: "1s" }}>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-xs font-medium">Payment</div>
              <div className="text-xs text-oh-muted-text">Received</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
