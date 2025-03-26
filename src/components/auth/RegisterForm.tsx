
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Check, Info } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  documentId: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
  creditCard: string;
  bankAccount: string;
  consentToTerms: boolean;
}

const countries = [
  { code: 'us', name: 'United States' },
  { code: 'es', name: 'Spain' },
  { code: 'uk', name: 'United Kingdom' },
  { code: 'de', name: 'Germany' },
  { code: 'fr', name: 'France' },
  { code: 'it', name: 'Italy' },
];

const RegisterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    documentId: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    email: '',
    phone: '',
    creditCard: '',
    bankAccount: '',
    consentToTerms: false,
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSpainSelected, setIsSpainSelected] = useState(false);
  const [nussNumber, setNussNumber] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'country') {
      setIsSpainSelected(value === 'es');
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: checked,
    });
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.documentId.trim()) newErrors.documentId = 'Document ID is required';
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.creditCard.trim()) newErrors.creditCard = 'Credit card information is required';
    if (!formData.consentToTerms) newErrors.consentToTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // TODO: Handle form submission
      console.log('Form submitted successfully:', formData);
      
      // For demo purposes, navigate to the document upload page
      window.location.href = '/upload';
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className="oh-card max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Register Your Account</h2>
        <div className="oh-badge-primary">$1 Registration Fee</div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
          </div>
          
          <div>
            <label htmlFor="firstName" className="oh-input-label">First Name (Nombre)</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className={`oh-input ${errors.firstName ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={formData.firstName}
              onChange={handleChange}
              maxLength={50}
            />
            {errors.firstName && (
              <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="oh-input-label">Last Name (Apellidos)</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className={`oh-input ${errors.lastName ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={formData.lastName}
              onChange={handleChange}
              maxLength={100}
            />
            {errors.lastName && (
              <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="documentId" className="oh-input-label">National ID/Passport (DNI/ID)</label>
            <input
              type="text"
              id="documentId"
              name="documentId"
              className={`oh-input ${errors.documentId ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={formData.documentId}
              onChange={handleChange}
            />
            {errors.documentId && (
              <p className="text-sm text-red-600 mt-1">{errors.documentId}</p>
            )}
          </div>
          
          {/* Address Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Address Information</h3>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="street" className="oh-input-label">Street Address</label>
            <input
              type="text"
              id="street"
              name="street"
              className={`oh-input ${errors.street ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={formData.street}
              onChange={handleChange}
              maxLength={200}
            />
            {errors.street && (
              <p className="text-sm text-red-600 mt-1">{errors.street}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="city" className="oh-input-label">City</label>
            <input
              type="text"
              id="city"
              name="city"
              className={`oh-input ${errors.city ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && (
              <p className="text-sm text-red-600 mt-1">{errors.city}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="postalCode" className="oh-input-label">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              className={`oh-input ${errors.postalCode ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={formData.postalCode}
              onChange={handleChange}
            />
            {errors.postalCode && (
              <p className="text-sm text-red-600 mt-1">{errors.postalCode}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="country" className="oh-input-label">Country</label>
            <select
              id="country"
              name="country"
              className={`oh-dropdown ${errors.country ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>{country.name}</option>
              ))}
            </select>
            {errors.country && (
              <p className="text-sm text-red-600 mt-1">{errors.country}</p>
            )}
          </div>
          
          {/* Spain-specific field */}
          {isSpainSelected && (
            <div>
              <label htmlFor="nussNumber" className="oh-input-label">NUSS Number (Número de Seguridad Social)</label>
              <input
                type="text"
                id="nussNumber"
                name="nussNumber"
                className="oh-input"
                value={nussNumber}
                onChange={(e) => setNussNumber(e.target.value)}
                maxLength={12}
              />
              <p className="text-xs text-oh-muted-text mt-1">Optional but recommended</p>
            </div>
          )}
          
          {/* Contact Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          </div>
          
          <div>
            <label htmlFor="email" className="oh-input-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`oh-input ${errors.email ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
            <p className="text-xs text-oh-muted-text mt-1">We'll send a verification code to this email</p>
          </div>
          
          <div>
            <label htmlFor="phone" className="oh-input-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`oh-input ${errors.phone ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (123) 456-7890"
            />
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
            )}
          </div>
          
          {/* Financial Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium mb-4">Financial Information</h3>
          </div>
          
          <div>
            <label htmlFor="creditCard" className="oh-input-label">Credit Card Information</label>
            <input
              type="text"
              id="creditCard"
              name="creditCard"
              className={`oh-input ${errors.creditCard ? 'border-red-300 focus:ring-red-500' : ''}`}
              value={formData.creditCard}
              onChange={handleChange}
              placeholder="XXXX XXXX XXXX XXXX"
            />
            {errors.creditCard && (
              <p className="text-sm text-red-600 mt-1">{errors.creditCard}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="bankAccount" className="oh-input-label">Bank Account Details (Optional)</label>
            <input
              type="text"
              id="bankAccount"
              name="bankAccount"
              className="oh-input"
              value={formData.bankAccount}
              onChange={handleChange}
            />
            <p className="text-xs text-oh-muted-text mt-1">IBAN or local bank account number</p>
          </div>
          
          {/* Terms and Consent */}
          <div className="md:col-span-2">
            <div className="flex items-start mt-2">
              <div className="flex items-center h-5">
                <input
                  id="consentToTerms"
                  name="consentToTerms"
                  type="checkbox"
                  className="oh-checkbox"
                  checked={formData.consentToTerms}
                  onChange={handleCheckboxChange}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="consentToTerms" className="font-medium text-oh-text">
                  I consent to store my personal information
                </label>
                <p className="text-oh-muted-text mt-1">
                  By checking this box, you agree to our{' '}
                  <Link to="/terms" className="text-oh-accent hover:underline">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-oh-accent hover:underline">
                    Privacy Policy
                  </Link>.
                </p>
              </div>
            </div>
            {errors.consentToTerms && (
              <p className="text-sm text-red-600 mt-1">{errors.consentToTerms}</p>
            )}
          </div>
        </div>
        
        <div className="bg-oh-border/20 rounded-xl p-4 flex items-start">
          <Info className="w-5 h-5 text-oh-muted-text mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Registration Fee: $1</p>
            <p className="text-sm text-oh-muted-text">
              A one-time registration fee of $1 will be charged to verify your account.
              This helps us maintain the quality of our service and ensure genuine users.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center pt-4">
          <Link to="/" className="text-oh-muted-text hover:text-oh-text text-sm mt-4 sm:mt-0">
            Return to home
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/login" className="oh-button-outline text-center">
              Already have an account?
            </Link>
            <button type="submit" className="oh-button-primary group">
              <span>Continue to Document Upload</span>
              <ChevronRight className="inline-block ml-1 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
