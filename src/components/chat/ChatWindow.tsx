'use client';

import { useState } from 'react';
import Message from './Message';
import { Send, X } from 'lucide-react';

interface ChatWindowProps {
  noteId: string;
  isOpen: boolean;
  onClose: () => void;
  messages: Array<{ text: string; isUser: boolean }>;
  onSendMessage: (text: string) => void;
}

export default function ChatWindow({ 
  noteId, 
  isOpen, 
  onClose, 
  messages, 
  onSendMessage 
}: ChatWindowProps) {
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    
    onSendMessage(input);
    setInput('');
    
    // Simulate AI response
    const response = await fetch('/api/dummy-chat', {
      method: 'POST',
      body: JSON.stringify({ prompt: input }),
    });
    const data = await response.json();
    onSendMessage(data.response);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 w-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
      <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
        <h3 className="font-semibold">AI Assistant</h3>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto max-h-96">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Ask me anything about your note!
          </div>
        ) : (
          messages.map((message, index) => (
            <Message 
              key={index}
              text={message.text}
              isUser={message.isUser}
            />
          ))
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Type your question..."
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}