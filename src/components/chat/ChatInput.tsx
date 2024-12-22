import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { VoiceRecorder } from './VoiceRecorder';
import { ChatInputProps } from '../../types/chat';
import { LoadingSpinner } from '../loading/LoadingSpinner';

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      await onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="flex gap-2 items-center">
        <div className="flex-1 relative">
          {/* Inner glow container */}
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md" />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Explore the future..."
            disabled={isLoading}
            className="w-full px-4 py-2.5 sm:px-6 sm:py-3 rounded-full 
              bg-white/10 backdrop-blur-md border border-purple-500/50
              text-white placeholder-purple-200/50 text-sm sm:text-base
              focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
              disabled:opacity-50
              shadow-[inset_0_0_20px_rgba(168,85,247,0.3),0_0_15px_rgba(168,85,247,0.5)]
              transition-all duration-300
              relative z-10"
          />
        </div>
        <VoiceRecorder 
          onSendMessage={onSendMessage}
          disabled={isLoading || message.trim().length > 0}
        />
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="p-2.5 sm:p-3 rounded-full bg-purple-600/20 backdrop-blur-sm
            text-white hover:bg-purple-700/30 transition-all duration-300
            disabled:opacity-50 relative group
            border border-purple-500/30
            shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          {/* Holographic glow effect */}
          <div className="absolute inset-0 rounded-full
            bg-gradient-to-r from-purple-600/0 via-purple-600/30 to-purple-600/0
            group-hover:opacity-100 opacity-0 transition-opacity duration-300
            animate-pulse" />
          
          {isLoading ? (
            <LoadingSpinner size="sm" />
          ) : (
            <Send className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 drop-shadow-glow" />
          )}
        </button>
      </div>
    </form>
  );
}