
import { useRef, useEffect } from 'react';
import AnimatedText from '../ui/AnimatedText';

const Features = () => {
  const featureRefs = {
    left: useRef<HTMLDivElement>(null),
    right: useRef<HTMLDivElement>(null)
  };
  
  useEffect(() => {
    const observers = Object.entries(featureRefs).map(([key, ref]) => {
      if (!ref.current) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('staggered-reveal');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
      );
      
      observer.observe(ref.current);
      return observer;
    });
    
    return () => {
      observers.forEach((observer) => {
        if (observer) {
          Object.values(featureRefs).forEach(ref => {
            if (ref.current) {
              observer.unobserve(ref.current);
            }
          });
        }
      });
    };
  }, []);

  return (
    <section className="py-20">
      <div className="oh-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block mb-4 px-3 py-1 bg-oh-primary/10 rounded-full text-oh-primary text-sm font-medium">
            Key Features
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Why Choose OhFreelancers
          </h2>
          
          <p className="text-oh-muted-text">
            Our platform offers unique advantages designed specifically for the needs 
            of modern freelancers in an international marketplace.
          </p>
        </div>
        
        {/* Feature 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1" ref={featureRefs.left}>
            <div className="oh-badge-primary mb-4">ChatBot Integration</div>
            <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4">
              Manage Administrative Tasks Through Our Bot
            </h3>
            <p className="text-oh-muted-text mb-6">
              Our intuitive chatbot assistant helps you handle administrative operations 
              with simple text commands. Generate invoices, check payment status, and 
              manage your freelance business - all through a conversational interface.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-oh-accent/10 flex items-center justify-center mr-3 text-oh-accent flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm">
                  Available 24/7 for your administrative needs
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-oh-accent/10 flex items-center justify-center mr-3 text-oh-accent flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm">
                  Natural language processing understands your requests
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-oh-accent/10 flex items-center justify-center mr-3 text-oh-accent flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm">
                  WhatsApp integration for seamless communication
                </p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-video max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-oh-border p-4">
              <div className="absolute inset-0 bg-gradient-to-br from-oh-accent/5 to-transparent"></div>
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-oh-primary flex items-center justify-center mr-2">
                    <img 
                      src="/lovable-uploads/5aa96ccb-a325-426d-8ba4-dac5f7e0c0ef.png" 
                      alt="OhFreelancers Logo" 
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <span className="font-medium text-sm">OhFreelancers Assistant</span>
                </div>
                
                <div className="flex-1 space-y-4 overflow-y-auto">
                  <div className="max-w-[80%] bg-oh-border/30 rounded-tr-xl rounded-br-xl rounded-bl-xl p-3">
                    <p className="text-sm">Hello! How can I help with your freelance business today?</p>
                  </div>
                  
                  <div className="max-w-[80%] ml-auto bg-oh-accent text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl p-3">
                    <p className="text-sm">I need to create an invoice for my client in Germany</p>
                  </div>
                  
                  <div className="max-w-[80%] bg-oh-border/30 rounded-tr-xl rounded-br-xl rounded-bl-xl p-3">
                    <p className="text-sm">Great! Let's create an invoice compliant with German regulations. I'll need a few details:</p>
                    <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                      <li>Client's company name</li>
                      <li>Project description</li>
                      <li>Amount in EUR</li>
                    </ul>
                  </div>
                  
                  <div className="max-w-[80%] ml-auto bg-oh-accent text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl p-3">
                    <p className="text-sm">TechGmbH, Website Development, €2,500</p>
                  </div>
                </div>
                
                <div className="mt-4 relative">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="w-full py-2 px-4 bg-oh-border/20 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-oh-accent pr-10"
                  />
                  <button className="absolute right-1 top-1 w-8 h-6 bg-oh-accent rounded-full flex items-center justify-center text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 md:-right-8 w-16 h-16 bg-oh-accent/10 rounded-lg rotate-12 animate-float"></div>
            <div className="absolute -bottom-6 -left-6 md:-left-10 w-24 h-24 bg-oh-primary/5 rounded-full animate-pulse-subtle"></div>
          </div>
        </div>
        
        {/* Feature 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-oh-border">
              <div className="absolute inset-0 bg-gradient-to-tl from-oh-primary/5 to-transparent"></div>
              
              {/* World map illustration */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M769.29,292.72l-70.91-48.55l26.58-39.13l-80.56-24.15l-22.28,32.61l-92.56-62.89l-43.23,62.89
                    l-56.38-38.16l-41.14,59.84l-85.02-57.78l-56.19,81.9l-77.77-53.04l-35.91,52.39l-92.74-63.03l-25.94,37.92l81.52,55.37
                    l-16.9,24.55l61.91,42.14l-38.63,55.99l83.13,56.28l-31.46,45.85l69.78,47.22l-41.57,60.31l88.08,59.67l38.33-55.97
                    l51.48,35.02l45.37-66.05l62.98,42.75l55.4-80.66l75.42,51.22l40.7-59.21l58.84,39.86l28.02-40.84l-60.51-41.01
                    l22.05-31.98l-58.1-39.41l28.11-40.92l76.84,52.04l20.69-30.02l-59.03-40.03l26.24-38.21"
                    stroke="#0066cc"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    fill="none"
                  />
                  
                  {/* Dots for key countries */}
                  <circle cx="220" cy="220" r="10" fill="#0066cc" opacity="0.7" />
                  <circle cx="580" cy="210" r="10" fill="#0066cc" opacity="0.7" />
                  <circle cx="350" cy="320" r="10" fill="#0066cc" opacity="0.7" />
                  <circle cx="480" cy="380" r="10" fill="#0066cc" opacity="0.7" />
                  <circle cx="280" cy="420" r="10" fill="#0066cc" opacity="0.7" />
                </svg>
              </div>
              
              {/* Country cards */}
              <div className="absolute top-6 left-6 bg-white rounded-xl shadow-md border border-oh-border p-3 w-28">
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 rounded-sm overflow-hidden mr-2">
                    {/* USA flag */}
                    <div className="h-1/3 bg-red-500"></div>
                    <div className="h-1/3 bg-white"></div>
                    <div className="h-1/3 bg-red-500"></div>
                  </div>
                  <span className="text-xs font-medium">USA</span>
                </div>
                <div className="h-1 w-full bg-green-500 rounded-full"></div>
                <div className="text-[9px] text-oh-muted-text mt-1">Compliant</div>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-white rounded-xl shadow-md border border-oh-border p-3 w-28">
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 rounded-sm overflow-hidden mr-2">
                    {/* German flag */}
                    <div className="h-1/3 bg-black"></div>
                    <div className="h-1/3 bg-red-500"></div>
                    <div className="h-1/3 bg-yellow-400"></div>
                  </div>
                  <span className="text-xs font-medium">Germany</span>
                </div>
                <div className="h-1 w-full bg-green-500 rounded-full"></div>
                <div className="text-[9px] text-oh-muted-text mt-1">Compliant</div>
              </div>
              
              <div className="absolute top-1/2 right-10 transform -translate-y-1/2 bg-white rounded-xl shadow-md border border-oh-border p-3 w-28 rotate-3 animate-float" style={{animationDelay: "0.5s"}}>
                <div className="flex items-center mb-2">
                  <div className="w-5 h-5 rounded-sm overflow-hidden mr-2">
                    {/* UK flag simplified */}
                    <div className="h-full w-full bg-blue-800 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-1 w-full bg-white"></div>
                        <div className="h-full w-1 bg-white absolute"></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium">UK</span>
                </div>
                <div className="h-1 w-full bg-green-500 rounded-full"></div>
                <div className="text-[9px] text-oh-muted-text mt-1">Compliant</div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 md:-right-8 w-20 h-20 bg-oh-primary/10 rounded-lg -rotate-12 animate-float" style={{animationDelay: "1s"}}></div>
            <div className="absolute -top-6 -left-6 md:-left-10 w-28 h-28 bg-oh-accent/5 rounded-full animate-pulse-subtle"></div>
          </div>
          
          <div ref={featureRefs.right}>
            <div className="oh-badge-secondary mb-4">International Compliance</div>
            <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4">
              Global Regulatory Compliance
            </h3>
            <p className="text-oh-muted-text mb-6">
              Ensure all your projects, jobs, invoices, and documents comply with each 
              country's tax regulations automatically. Our system stays updated with 
              changing international tax laws, so you don't have to.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-oh-accent/10 flex items-center justify-center mr-3 text-oh-accent flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm">
                  Automatically generates tax-compliant documents for multiple countries
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-oh-accent/10 flex items-center justify-center mr-3 text-oh-accent flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm">
                  Regular updates to keep pace with changing global tax requirements
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-oh-accent/10 flex items-center justify-center mr-3 text-oh-accent flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm">
                  Specialized support for USA, UK, Germany, France, Italy, and Spain
                </p>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="px-3 py-2 border border-oh-border rounded-lg flex items-center">
                <span className="text-sm font-medium">USA</span>
              </div>
              <div className="px-3 py-2 border border-oh-border rounded-lg flex items-center">
                <span className="text-sm font-medium">Germany</span>
              </div>
              <div className="px-3 py-2 border border-oh-border rounded-lg flex items-center">
                <span className="text-sm font-medium">UK</span>
              </div>
              <div className="px-3 py-2 border border-oh-border rounded-lg flex items-center">
                <span className="text-sm font-medium">France</span>
              </div>
              <div className="px-3 py-2 border border-oh-border rounded-lg flex items-center">
                <span className="text-sm font-medium">Spain</span>
              </div>
              <div className="px-3 py-2 border border-oh-border rounded-lg flex items-center">
                <span className="text-sm font-medium">Italy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
