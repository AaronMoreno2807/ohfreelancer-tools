
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  content: string;
  name: string;
  role: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "The WhatsApp integration has revolutionized the way I manage my invoices. Everything is faster and simpler.",
    name: "María G.",
    role: "Graphic Designer"
  },
  {
    id: 2,
    content: "As a developer working with international clients, I needed a solution that simplified payment and invoicing management. OhFreelancers.com has been the perfect answer.",
    name: "Carlos M.",
    role: "Web Developer"
  },
  {
    id: 3,
    content: "The automated compliance with different tax regulations saves me so much time and stress when working with international clients.",
    name: "Sophie L.",
    role: "Marketing Consultant"
  },
  {
    id: 4,
    content: "The chat support is incredibly responsive. I had a complex invoice issue that was resolved within hours.",
    name: "Javier P.",
    role: "Content Creator"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisibleItems = 2;
  const totalTestimonials = testimonials.length;
  const maxIndex = totalTestimonials - maxVisibleItems;
  
  const testimonialRefs = useRef<Array<HTMLDivElement | null>>([]);
  
  const prev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  
  const next = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };
  
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + maxVisibleItems);

  return (
    <section className="py-20 bg-oh-primary text-white overflow-hidden">
      <div className="oh-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block mb-4 px-3 py-1 bg-white/10 rounded-full text-white/90 text-sm font-medium">
            Testimonials
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            What Our Users Say
          </h2>
          
          <p className="text-white/80">
            Discover how OhFreelancers is helping freelancers around the world 
            streamline their administrative tasks.
          </p>
        </div>
        
        <div className="relative">
          {/* Testimonials grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                ref={el => testimonialRefs.current[index] = el}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-500 animate-scale"
              >
                <Quote className="w-10 h-10 text-white/30 mb-4" />
                <blockquote className="text-lg mb-6">{testimonial.content}</blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-oh-accent/20 flex items-center justify-center mr-4 text-white">
                    {testimonial.avatar ? (
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-medium">{testimonial.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-white/70">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                currentIndex === 0 
                ? 'bg-white/10 text-white/30 cursor-not-allowed' 
                : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                currentIndex >= maxIndex 
                ? 'bg-white/10 text-white/30 cursor-not-allowed' 
                : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              aria-label="Next testimonials"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-4 space-x-1">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/30'
                }`}
                aria-label={`Go to testimonial set ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
