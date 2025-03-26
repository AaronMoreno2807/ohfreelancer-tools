
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield, Info, Check } from 'lucide-react';
import ImageUploader from '../ui/ImageUploader';
import AnimatedText from '../ui/AnimatedText';
import { useToast } from '@/hooks/use-toast';

const DocumentUpload = () => {
  const [frontIdFile, setFrontIdFile] = useState<File | null>(null);
  const [backIdFile, setBackIdFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleFrontIdChange = (file: File | null) => {
    setFrontIdFile(file);
  };
  
  const handleBackIdChange = (file: File | null) => {
    setBackIdFile(file);
  };
  
  const isNextEnabled = frontIdFile !== null;
  
  const handleContinue = () => {
    if (step === 1 && isNextEnabled) {
      setStep(2);
      // Scroll to top after step change
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!frontIdFile) {
      toast({
        title: "Front ID required",
        description: "Please upload the front of your ID document.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would upload the files to a server
      console.log('Submitting files:', { frontIdFile, backIdFile });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Verification successful",
        description: "Your documents have been uploaded and verified successfully.",
      });
      
      // Redirect to success page or dashboard
      navigate('/');
    } catch (error) {
      console.error('Error submitting documents:', error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your documents. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="oh-card max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <AnimatedText
          text="Document Verification"
          element="h2"
          className="text-2xl font-semibold"
        />
        <div className="oh-badge-primary flex items-center">
          <span>Step {step} of 2</span>
        </div>
      </div>
      
      <div className="bg-oh-accent/5 rounded-xl p-4 mb-8 flex items-start">
        <Shield className="w-5 h-5 text-oh-accent mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">Secure Document Upload</p>
          <p className="text-sm text-oh-muted-text">
            Your documents are encrypted and securely stored. We use them only for verification 
            purposes and comply with data protection regulations.
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 ? (
          <>
            <div className="space-y-2">
              <AnimatedText
                text="Front Side of ID Document"
                element="h3"
                className="text-lg font-medium"
                delay={100}
              />
              <p className="text-sm text-oh-muted-text mb-4">
                Please upload a clear photo of the front side of your government-issued ID, passport, or driver's license
              </p>
              
              <div className="bg-oh-secondary/10 rounded-lg p-3 mb-4 flex items-start">
                <Info className="w-4 h-4 text-oh-secondary mr-2 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-oh-muted-text">
                  <p className="font-medium">Tips for a good photo:</p>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Ensure all text is clearly visible</li>
                    <li>Avoid glare from lights or flash</li>
                    <li>Place the document on a dark, solid background</li>
                    <li>Make sure the entire document is in the frame</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <ImageUploader
              label="Front Side of ID/Passport"
              description="Clear photo showing all details of your ID document"
              onChange={handleFrontIdChange}
              acceptedFileTypes="image/jpeg, image/png"
              maxFileSizeMB={5}
              required={true}
            />
          </>
        ) : (
          <>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6 flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-sm text-green-700">Front side uploaded successfully</p>
            </div>
            
            <div className="space-y-2">
              <AnimatedText
                text="Back Side of ID Document"
                element="h3"
                className="text-lg font-medium"
                delay={100}
              />
              <p className="text-sm text-oh-muted-text mb-4">
                Now upload the back side of your ID document to complete the verification
              </p>
            </div>
            
            <ImageUploader
              label="Back Side of ID/Passport (Optional)"
              description="For complete verification, we recommend uploading the back side as well"
              onChange={handleBackIdChange}
              acceptedFileTypes="image/jpeg, image/png"
              maxFileSizeMB={5}
            />
          </>
        )}
        
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4">
          {step === 1 ? (
            <>
              <Link to="/register" className="flex items-center text-oh-muted-text hover:text-oh-text text-sm group">
                <ArrowLeft className="mr-1 w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to Registration</span>
              </Link>
              
              <button 
                type="button" 
                onClick={handleContinue}
                className={`
                  oh-button group mt-4 sm:mt-0
                  ${isNextEnabled ? 'oh-button-primary' : 'oh-button-outline bg-oh-border/20 text-oh-muted-text cursor-not-allowed'}
                `}
                disabled={!isNextEnabled}
              >
                <span>Continue</span>
                <ArrowRight className="inline-block ml-1 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </>
          ) : (
            <>
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center text-oh-muted-text hover:text-oh-text text-sm group"
              >
                <ArrowLeft className="mr-1 w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to Front Side</span>
              </button>
              
              <button 
                type="submit" 
                className={`
                  oh-button group mt-4 sm:mt-0
                  ${isSubmitting ? 'oh-button-outline cursor-wait' : 'oh-button-primary'}
                `}
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Processing...' : 'Complete Verification'}</span>
                {!isSubmitting && (
                  <ArrowRight className="inline-block ml-1 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default DocumentUpload;
