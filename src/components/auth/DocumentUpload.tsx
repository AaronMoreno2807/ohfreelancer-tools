
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import ImageUploader from '../ui/ImageUploader';

const DocumentUpload = () => {
  const [frontIdFile, setFrontIdFile] = useState<File | null>(null);
  const [backIdFile, setBackIdFile] = useState<File | null>(null);
  
  const handleFrontIdChange = (file: File | null) => {
    setFrontIdFile(file);
  };
  
  const handleBackIdChange = (file: File | null) => {
    setBackIdFile(file);
  };
  
  const isNextEnabled = frontIdFile !== null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, you would upload the files to a server
    console.log('Submitting files:', { frontIdFile, backIdFile });
    
    // Redirect to success page or dashboard
    window.location.href = '/';
  };

  return (
    <div className="oh-card max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">Document Verification</h2>
        <div className="oh-badge-primary">Step 2 of 2</div>
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
        {/* Front ID */}
        <ImageUploader
          label="Front Side of ID/Passport"
          description="Please upload a clear photo of the front side of your ID or passport"
          onChange={handleFrontIdChange}
          acceptedFileTypes="image/jpeg, image/png"
          maxFileSizeMB={5}
        />
        
        {/* Back ID */}
        <ImageUploader
          label="Back Side of ID/Passport (Optional)"
          description="For complete verification, we recommend uploading the back side as well"
          onChange={handleBackIdChange}
          acceptedFileTypes="image/jpeg, image/png"
          maxFileSizeMB={5}
        />
        
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4">
          <Link to="/register" className="flex items-center text-oh-muted-text hover:text-oh-text text-sm group">
            <ArrowLeft className="mr-1 w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Registration</span>
          </Link>
          
          <button 
            type="submit" 
            className={`
              oh-button group mt-4 sm:mt-0
              ${isNextEnabled ? 'oh-button-primary' : 'oh-button-outline bg-oh-border/20 text-oh-muted-text cursor-not-allowed'}
            `}
            disabled={!isNextEnabled}
          >
            <span>Complete Registration</span>
            <ArrowRight className="inline-block ml-1 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUpload;
