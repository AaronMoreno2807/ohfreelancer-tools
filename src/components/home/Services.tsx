
import { useRef, useEffect } from 'react';
import { ArrowRight, FileText, DollarSign, BarChart, Users, ReceiptText, HelpCircle } from 'lucide-react';
import AnimatedText from '../ui/AnimatedText';

const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!servicesRef.current) return;
    
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
    
    observer.observe(servicesRef.current);
    
    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-oh-border/20">
      <div className="oh-container">
        <div className="text-center max-w-2xl mx-auto mb-16" ref={servicesRef}>
          <div className="inline-block mb-4 px-3 py-1 bg-oh-primary/10 rounded-full text-oh-primary text-sm font-medium">
            Our Services
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Comprehensive Solutions for Freelancers
          </h2>
          
          <p className="text-oh-muted-text">
            We provide a complete ecosystem of services designed specifically for freelancers, 
            making administrative tasks effortless and allowing you to focus on your core skills.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Service 1 */}
          <div className="oh-card oh-card-hover group/card">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 rounded-full bg-oh-accent/10 flex items-center justify-center mr-4 text-oh-accent group-hover/card:bg-oh-accent group-hover/card:text-white transition-colors">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Project & Work Management</h3>
                <p className="text-oh-muted-text text-sm">
                  Billing, Collection, and Payment Systems
                </p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 text-green-600 flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm">
                    Generate and send personalized invoices complying with tax regulations of various countries
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 text-green-600 flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm">
                    Facilitate currency conversion and payment receipt from various freelance platforms
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 text-green-600 flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm">
                    Automate processes such as income tracking
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-oh-border/30 rounded-xl p-4 mb-6">
              <p className="text-sm font-medium">
                We handle all of this. You only receive payment for the project or work you negotiated through OHFREELANCERS!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 border-t border-oh-border">
              <div>
                <p className="text-sm font-medium">Service Costs:</p>
                <p className="text-sm text-oh-muted-text">10 dollars + 10% fee of OHF once paid</p>
              </div>
              <a href="#" className="flex items-center text-oh-accent text-sm font-medium mt-2 sm:mt-0 group/link">
                <span>Learn more</span>
                <ArrowRight size={16} className="ml-1 transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          </div>
          
          {/* Service 2 */}
          <div className="oh-card oh-card-hover group/card">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 rounded-full bg-oh-primary/10 flex items-center justify-center mr-4 text-oh-primary group-hover/card:bg-oh-primary group-hover/card:text-white transition-colors">
                <HelpCircle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Legal & Fiscal Consulting</h3>
                <p className="text-oh-muted-text text-sm">
                  Specialized Consulting for Freelancers
                </p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <p className="text-sm leading-relaxed">
                At OhFreelancers.com, we understand that legal and fiscal consultations can be complex 
                and require attention. Therefore, we offer an additional consulting service tailored to 
                the specific needs of freelancers.
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-oh-border/20">
                  <span className="text-sm">Basic consultation</span>
                  <span className="font-medium">$95</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-oh-border/20">
                  <span className="text-sm">USA, Germany, France, Italy, UK</span>
                  <span className="font-medium">$150</span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-oh-border/20">
                  <span className="text-sm">Fiscal & commercial structure</span>
                  <span className="font-medium">From $450</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 border-t border-oh-border">
              <div>
                <p className="text-sm font-medium">Response Times:</p>
                <p className="text-sm text-oh-muted-text">1 to 7 business days</p>
              </div>
              <a href="#" className="flex items-center text-oh-accent text-sm font-medium mt-2 sm:mt-0 group/link">
                <span>Learn more</span>
                <ArrowRight size={16} className="ml-1 transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Additional features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-oh-border transition-all hover:translate-y-[-2px] hover:shadow-md">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-4 text-green-600">
              <ReceiptText size={20} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Invoice Management</h3>
            <p className="text-oh-muted-text text-sm">
              Generate compliant invoices for global clients with just a few clicks.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-oh-border transition-all hover:translate-y-[-2px] hover:shadow-md">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
              <DollarSign size={20} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Fast Payments</h3>
            <p className="text-oh-muted-text text-sm">
              Receive payments efficiently and securely. Maximum payment time: 7 days.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-oh-border transition-all hover:translate-y-[-2px] hover:shadow-md">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4 text-purple-600">
              <BarChart size={20} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Income Tracking</h3>
            <p className="text-oh-muted-text text-sm">
              Automatically track your income and expenses for better financial insight.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-oh-border transition-all hover:translate-y-[-2px] hover:shadow-md">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-4 text-amber-600">
              <Users size={20} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Support Team</h3>
            <p className="text-oh-muted-text text-sm">
              Our team is available to provide assistance within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
