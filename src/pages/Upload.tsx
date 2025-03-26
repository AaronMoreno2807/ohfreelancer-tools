
import { useEffect } from 'react';
import DocumentUpload from '../components/auth/DocumentUpload';
import AnimatedText from '../components/ui/AnimatedText';

const Upload = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-oh-bg to-oh-border/20 animate-fade-in">
      <div className="oh-container">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <AnimatedText 
            text="Secure Document Verification" 
            element="h1"
            className="text-3xl md:text-4xl font-bold mb-4"
          />
          <p className="text-oh-muted-text max-w-2xl mx-auto">
            To complete your account setup, we need to verify your identity. Please upload clear photos of your ID document using the options below.
          </p>
        </div>
        
        <DocumentUpload />
        
        <div className="max-w-2xl mx-auto mt-8 pt-8 border-t border-oh-border text-center">
          <p className="text-sm text-oh-muted-text">
            By uploading your documents, you agree to our{" "}
            <a href="#" className="text-oh-accent hover:underline">Terms of Service</a> and{" "}
            <a href="#" className="text-oh-accent hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upload;
