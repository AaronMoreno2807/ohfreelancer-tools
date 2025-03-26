
import { useState, useRef } from 'react';
import { Upload, X, Camera, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  description?: string;
  onChange: (file: File | null) => void;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
}

const ImageUploader = ({
  label,
  description,
  onChange,
  acceptedFileTypes = 'image/jpeg, image/png',
  maxFileSizeMB = 5
}: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const maxFileSize = maxFileSizeMB * 1024 * 1024; // Convert MB to bytes
  
  const handleFileChange = (file: File | null) => {
    if (!file) {
      setPreviewUrl(null);
      onChange(null);
      return;
    }
    
    // Validate file type
    if (!file.type.match(acceptedFileTypes.replace(/\s/g, ''))) {
      setError(`Invalid file type. Please upload ${acceptedFileTypes}.`);
      return;
    }
    
    // Validate file size
    if (file.size > maxFileSize) {
      setError(`File is too large. Maximum size is ${maxFileSizeMB}MB.`);
      return;
    }
    
    // Reset error state
    setError(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Pass file to parent component
    onChange(file);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange(null);
  };
  
  const captureImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.capture = 'environment';
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <label className="oh-input-label">{label}</label>
      
      <div
        className={`
          mt-1 flex justify-center rounded-xl border-2 border-dashed transition-all duration-200
          ${isDragging ? 'border-oh-accent bg-oh-accent/5' : 'border-oh-border'}
          ${error ? 'border-red-300 bg-red-50' : ''}
          ${previewUrl ? 'bg-oh-border/10' : 'bg-oh-border/5 hover:bg-oh-border/10'}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <div className="w-full px-6 py-8 text-center">
          {previewUrl ? (
            <div className="relative w-full">
              <img
                src={previewUrl}
                alt="Preview"
                className="mx-auto max-h-64 rounded-lg object-contain animate-scale"
              />
              <button
                type="button"
                className="absolute -top-3 -right-3 rounded-full bg-oh-primary p-1 text-white shadow-sm transition-transform hover:scale-110"
                onClick={handleRemove}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-oh-border/20">
                <Upload className="h-6 w-6 text-oh-muted-text" />
              </div>
              <div className="text-sm text-oh-muted-text">
                <p className="font-medium">
                  Drag and drop your file here, or{" "}
                  <span className="text-oh-accent">browse</span>
                </p>
                {description && (
                  <p className="mt-1 text-xs">{description}</p>
                )}
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  className="flex items-center space-x-1 rounded-lg border border-oh-border bg-white px-3 py-1.5 text-xs font-medium text-oh-text shadow-sm transition-colors hover:bg-oh-border/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    captureImage();
                  }}
                >
                  <Camera size={14} />
                  <span>Camera</span>
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-1 rounded-lg border border-oh-border bg-white px-3 py-1.5 text-xs font-medium text-oh-text shadow-sm transition-colors hover:bg-oh-border/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                  }}
                >
                  <ImageIcon size={14} />
                  <span>Gallery</span>
                </button>
              </div>
            </div>
          )}
          
          <input
            type="file"
            className="hidden"
            accept={acceptedFileTypes}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFileChange(e.target.files[0]);
              }
            }}
            ref={fileInputRef}
          />
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600 animate-fade-in">{error}</p>
      )}
      
      <p className="mt-1 text-xs text-oh-muted-text">
        Accepted formats: {acceptedFileTypes} (Max: {maxFileSizeMB}MB)
      </p>
    </div>
  );
};

export default ImageUploader;
