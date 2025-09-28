import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Loader } from 'lucide-react';

const ChatbotModule = ({ stockData, newsData }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your HSBC banking consultant. I can help you with banking questions, regulatory costs, investment advice, and more. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ollamaStatus, setOllamaStatus] = useState('checking');
  const messagesEndRef = useRef(null);

  // Format stock data for context
  const formatStockData = () => {
    if (!stockData || stockData.length === 0) return "No current stock data available.";

    return stockData.map(stock =>
      `${stock.symbol} (${stock.name}): $${stock.price.toFixed(2)} (${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} / ${stock.changePercent >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%)`
    ).join('\n');
  };

  // Format news data for context
  const formatNewsData = () => {
    if (!newsData || newsData.length === 0) return "No recent news available.";

    return newsData.slice(0, 5).map(news =>
      `${news.title} (${news.category}) - ${news.summary.substring(0, 100)}...`
    ).join('\n');
  };

  const systemPrompt = `You are a professional HSBC banking consultant with access to real-time market data. You can help with banking questions, regulatory costs, investment advice, and discuss current market conditions.

Available Data:
CURRENT STOCK PRICES:
${formatStockData()}

RECENT MARKET NEWS:
${formatNewsData()}

Guidelines:
- Provide financial advice when there is an opportunity, but make sure the statement is purely objective
- EVERY piece of financial advice should include a disclaimer that "this is purely advisory information and should not be taken as financial fact"
- Use the available stock and news data to provide informed responses
- Answer banking and investment questions using the current market data
- Avoid inappropriate concepts and language
- Be helpful and professional`;

  // Check if Ollama is running
  useEffect(() => {
    checkOllamaStatus();
  }, []);

  const checkOllamaStatus = async () => {
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      if (response.ok) {
        setOllamaStatus('connected');
      } else {
        setOllamaStatus('disconnected');
      }
    } catch (error) {
      setOllamaStatus('disconnected');
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim() || isLoading) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Check if Ollama is available
      if (ollamaStatus === 'disconnected') {
        throw new Error('Ollama not available');
      }

      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3.2:1b',
          prompt: `${systemPrompt}\n\nUser: ${userMessage}\nAssistant:`,
          stream: false,
          options: {
            temperature: 0.7,
            max_tokens: 150,
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Ollama');
      }

      const data = await response.json();
      
      // Add bot response
      const botMsg = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.response || 'I apologize, but I couldn\'t process your request at the moment.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error('Ollama error:', error);
      
      // Fallback response when Ollama is not available
      const fallbackMsg = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'I\'m currently offline. Please ensure Ollama is running with: `ollama serve` and the model is installed: `ollama pull llama3.2:1b`',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMsg]);
      setOllamaStatus('disconnected');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="chatbot-module">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <MessageCircle size={20} />
          <span>Banking Consultant</span>
        </div>
        <div className={`status-indicator ${ollamaStatus}`}>
          <div className="status-dot"></div>
          <span className="status-text">
            {ollamaStatus === 'connected' ? 'Online' : 
             ollamaStatus === 'checking' ? 'Connecting...' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-avatar">
              {message.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className="message-content">
              <div className="message-text">{message.content}</div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot loading">
            <div className="message-avatar">
              <Bot size={16} />
            </div>
            <div className="message-content">
              <div className="loading-indicator">
                <Loader size={16} className="spinning" />
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about banking, regulations, investments..."
            className="chat-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={isLoading || !input.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      </form>

      <style jsx>{`
        .chatbot-module {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: white;
        }

        .chatbot-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e9ecef;
          background: #fafbfc;
        }

        .chatbot-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #2c3e50;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e74c3c;
        }

        .status-indicator.connected .status-dot {
          background: #27ae60;
        }

        .status-indicator.checking .status-dot {
          background: #f39c12;
          animation: pulse 1.5s infinite;
        }

        .status-text {
          color: #666;
          font-weight: 500;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: #f8f9fa;
        }

        .message {
          display: flex;
          gap: 0.75rem;
          max-width: 85%;
        }

        .message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .message.bot {
          align-self: flex-start;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .message.bot .message-avatar {
          background: #dc143c;
          color: white;
        }

        .message.user .message-avatar {
          background: #3498db;
          color: white;
        }

        .message-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .message-text {
          background: white;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 1px solid #e9ecef;
          font-size: 0.9rem;
          line-height: 1.4;
          color: #2c3e50;
        }

        .message.user .message-text {
          background: #3498db;
          color: white;
          border-color: #3498db;
        }

        .message-time {
          font-size: 0.7rem;
          color: #999;
          padding: 0 0.5rem;
        }

        .message.user .message-time {
          text-align: right;
        }

        .loading-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: white;
          border-radius: 12px;
          border: 1px solid #e9ecef;
          color: #666;
          font-size: 0.9rem;
        }

        .chat-input-form {
          padding: 1rem;
          border-top: 1px solid #e9ecef;
          background: white;
        }

        .input-container {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .chat-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #e9ecef;
          border-radius: 20px;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .chat-input:focus {
          border-color: #dc143c;
        }

        .send-button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: #dc143c;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .send-button:hover:not(:disabled) {
          background: #b91c3c;
          transform: scale(1.05);
        }

        .send-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Scrollbar styling */
        .messages-container::-webkit-scrollbar {
          width: 6px;
        }

        .messages-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .messages-container::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 3px;
        }

        .messages-container::-webkit-scrollbar-thumb:hover {
          background: #999;
        }
      `}</style>
    </div>
  );
};

export default ChatbotModule;








