
import { useEffect } from 'react';
import DocumentUpload from '../components/auth/DocumentUpload';

const Upload = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-oh-bg to-oh-border/20 animate-fade-in">
      <div className="oh-container">
        <DocumentUpload />
      </div>
    </div>
  );
};

export default Upload;
