
import { useState, useRef, useEffect } from 'react';
import { Upload, X, Camera, Image as ImageIcon, RotateCw, Check, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Label } from './label';
import { Input } from './input';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  label: string;
  description?: string;
  onChange: (file: File | null) => void;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
  minResolution?: { width: number; height: number };
  required?: boolean;
}

const ImageUploader = ({
  label,
  description,
  onChange,
  acceptedFileTypes = 'image/jpeg, image/png',
  maxFileSizeMB = 5,
  minResolution = { width: 800, height: 600 },
  required = false
}: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isUsingCamera, setIsUsingCamera] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  
  const maxFileSize = maxFileSizeMB * 1024 * 1024; // Convert MB to bytes
  
  // Clean up camera resources when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);
  
  // Reset camera when isUsingCamera changes to false
  useEffect(() => {
    if (!isUsingCamera && videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  }, [isUsingCamera]);
  
  const validateImage = async (file: File): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    // Validate file type
    if (!file.type.match(acceptedFileTypes.replace(/\s/g, ''))) {
      setError(`Invalid file type. Please upload ${acceptedFileTypes}.`);
      setIsLoading(false);
      return false;
    }
    
    // Validate file size
    if (file.size > maxFileSize) {
      setError(`File is too large. Maximum size is ${maxFileSizeMB}MB.`);
      setIsLoading(false);
      return false;
    }
    
    // Validate image resolution
    try {
      const image = new Image();
      const imageUrl = URL.createObjectURL(file);
      
      const imageLoadPromise = new Promise<boolean>((resolve) => {
        image.onload = () => {
          URL.revokeObjectURL(imageUrl);
          if (image.width < minResolution.width || image.height < minResolution.height) {
            setError(`Image resolution is too low. Minimum required is ${minResolution.width}x${minResolution.height}px.`);
            resolve(false);
          } else {
            resolve(true);
          }
        };
        
        image.onerror = () => {
          URL.revokeObjectURL(imageUrl);
          setError('Failed to load image. Please try another file.');
          resolve(false);
        };
      });
      
      image.src = imageUrl;
      const result = await imageLoadPromise;
      setIsLoading(false);
      return result;
    } catch (err) {
      setError('Failed to validate image. Please try again.');
      setIsLoading(false);
      return false;
    }
  };
  
  const handleFileChange = async (file: File | null) => {
    if (!file) {
      setPreviewUrl(null);
      onChange(null);
      setRotation(0);
      return;
    }
    
    const isValid = await validateImage(file);
    if (!isValid) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    // Pass file to parent component
    onChange(file);
    
    // Reset rotation
    setRotation(0);
    
    toast({
      title: "Image uploaded successfully",
      description: "Your document image has been validated and is ready for submission."
    });
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
    setRotation(0);
  };
  
  const startCamera = async () => {
    setIsUsingCamera(true);
    setError(null);
    
    try {
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsCameraReady(true);
        };
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Failed to access camera. Please ensure you have granted camera permissions.');
      setIsUsingCamera(false);
    }
  };
  
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the video frame to the canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert the canvas to a blob
    canvas.toBlob(async (blob) => {
      if (!blob) {
        setError('Failed to capture image. Please try again.');
        return;
      }
      
      // Create a File from the Blob
      const capturedFile = new File([blob], 'captured-id.jpg', { type: 'image/jpeg' });
      
      // Close camera
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
      
      setIsUsingCamera(false);
      setIsCameraReady(false);
      
      // Use the same validation and handling as file upload
      await handleFileChange(capturedFile);
    }, 'image/jpeg', 0.95); // High quality JPEG
  };
  
  const cancelCamera = () => {
    setIsUsingCamera(false);
    setIsCameraReady(false);
  };
  
  const rotateImage = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className="w-full">
      <Label className="oh-input-label">{label} {required && <span className="text-destructive">*</span>}</Label>
      
      {isUsingCamera ? (
        <div className="mt-1 relative">
          <div className="rounded-xl overflow-hidden bg-black aspect-[4/3] relative">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover"
            />
            
            {/* Camera overlay with guidelines */}
            <div className="absolute inset-0 border-2 border-white border-opacity-50 m-8 pointer-events-none rounded">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white"></div>
            </div>
            
            {/* Hidden canvas for image capture */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
          
          <div className="mt-4 flex justify-center space-x-3">
            <Button 
              type="button" 
              variant="secondary"
              onClick={cancelCamera} 
              className="gap-2"
            >
              <X size={16} />
              <span>Cancel</span>
            </Button>
            
            <Button 
              type="button" 
              variant="default"
              onClick={captureImage} 
              disabled={!isCameraReady}
              className="gap-2"
            >
              <Camera size={16} />
              <span>Capture Photo</span>
            </Button>
          </div>
          
          <p className="text-center text-xs text-muted-foreground mt-2">
            Position your ID document within the frame and ensure it's well-lit
          </p>
        </div>
      ) : (
        <div
          className={`
            mt-1 flex justify-center rounded-xl border-2 border-dashed transition-all duration-200
            ${isDragging ? 'border-oh-accent bg-oh-accent/5' : 'border-oh-border'}
            ${error ? 'border-red-300 bg-red-50' : ''}
            ${previewUrl ? 'bg-oh-border/10' : 'bg-oh-border/5 hover:bg-oh-border/10'}
            ${isLoading ? 'cursor-wait' : 'cursor-pointer'}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={previewUrl ? undefined : handleClick}
        >
          <div className="w-full px-6 py-8 text-center">
            {isLoading ? (
              <div className="py-8 flex flex-col items-center">
                <RefreshCw className="h-10 w-10 text-oh-muted-text animate-spin" />
                <p className="mt-2 text-sm text-oh-muted-text">Processing image...</p>
              </div>
            ) : previewUrl ? (
              <div className="relative w-full">
                <div className="flex justify-center">
                  <img
                    src={previewUrl}
                    alt="ID document preview"
                    className="mx-auto max-h-64 rounded-lg object-contain animate-scale"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  />
                  <div className="absolute -top-3 -right-3 flex space-x-2">
                    <button
                      type="button"
                      className="rounded-full bg-oh-secondary p-1 text-white shadow-sm transition-transform hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        rotateImage();
                      }}
                    >
                      <RotateCw size={16} />
                    </button>
                    <button
                      type="button"
                      className="rounded-full bg-oh-primary p-1 text-white shadow-sm transition-transform hover:scale-110"
                      onClick={handleRemove}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="bg-oh-accent/10 text-oh-accent text-xs px-3 py-1 rounded-full flex items-center">
                    <Check size={12} className="mr-1" />
                    <span>Document validated</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
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
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      startCamera();
                    }}
                  >
                    <Camera size={14} />
                    <span>Camera</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick();
                    }}
                  >
                    <ImageIcon size={14} />
                    <span>Gallery</span>
                  </Button>
                </div>
                
                <p className="text-xs text-oh-muted-text mt-2">
                  For best results, use good lighting and ensure your ID is visible and readable
                </p>
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
      )}
      
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
