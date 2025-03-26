
import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import ChatInterface from '../components/ui/ChatInterface';

const Home = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-fade-in">
      <Hero />
      <Services />
      <Features />
      <Testimonials />
      <ChatInterface />
    </div>
  );
};

export default Home;
