
import { useState, useRef, useEffect } from 'react';
import { Send, Plus, Maximize2, Minimize2, X } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! Welcome to OhFreelancers. How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };
  
  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };
  
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I'd be happy to help with your freelance billing needs!",
        "You can generate invoices for multiple countries through our platform.",
        "Our fee is just 10% after your project is paid.",
        "Need any specific information about our services?",
        "I can help with registration questions too."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Chat bubble button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-oh-accent text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
      
      {/* Chat interface */}
      {isOpen && (
        <div 
          className={`
            bg-white rounded-2xl shadow-xl border border-oh-border overflow-hidden transition-all duration-300 ease-in-out
            ${isMinimized ? 'w-72 h-16' : 'w-96 h-[500px]'}
          `}
        >
          {/* Chat header */}
          <div 
            className="bg-oh-primary text-white p-4 flex items-center justify-between cursor-pointer"
            onClick={isMinimized ? toggleChat : undefined}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <img 
                  src="/lovable-uploads/5aa96ccb-a325-426d-8ba4-dac5f7e0c0ef.png" 
                  alt="OhFreelancers Logo" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">OhFreelancers Support</h3>
                {!isMinimized && (
                  <p className="text-xs text-white/70">We typically respond in minutes</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                onClick={toggleMinimize}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button 
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                onClick={handleClose}
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              {/* Messages container */}
              <div className="flex-1 p-4 h-[388px] overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`
                          max-w-[80%] rounded-2xl px-4 py-2 animate-scale
                          ${message.isUser 
                            ? 'bg-oh-accent text-white rounded-tr-none' 
                            : 'bg-oh-border/30 text-oh-text rounded-tl-none'
                          }
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-[10px] opacity-70 mt-1 text-right">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Input area */}
              <div className="border-t border-oh-border p-4 bg-white">
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="p-2 rounded-full text-oh-muted-text hover:text-oh-text hover:bg-oh-border/20 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 text-sm border-none bg-oh-border/20 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-oh-accent"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <button
                    type="submit"
                    className={`
                      p-2 rounded-full transition-colors
                      ${inputValue.trim() ? 'bg-oh-accent text-white' : 'bg-oh-border/20 text-oh-muted-text'}
                    `}
                    disabled={!inputValue.trim()}
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
