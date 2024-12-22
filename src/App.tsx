import React, { useState, useEffect } from 'react';
import { ChatMessage } from './components/chat/ChatMessage';
import { ChatInput } from './components/chat/ChatInput';
import { ShowHistory } from './components/chat/ShowHistory';
import { BrandLogo } from './components/brand/BrandLogo';
import { InitialLoader } from './components/loading/InitialLoader';
import { LoadingContainer } from './components/loading/LoadingContainer';
import { useChat } from './hooks/useChat';

export default function App() {
  const { messages, showHistory, isLoading, setShowHistory, handleSendMessage } = useChat();
  const lastMessage = messages[messages.length - 1];
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Reduced loading time to 2 seconds
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Add viewport height fix for mobile browsers
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  if (isInitialLoading) {
    return <InitialLoader />;
  }

  return (
    <div 
      className="min-h-screen bg-black text-white"
      style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <main className="relative h-screen flex flex-col" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
        <BrandLogo />
        <LoadingContainer isVisible={isLoading} />
        <div className="absolute top-4 right-4 z-10">
          <ShowHistory showHistory={showHistory} onToggle={() => setShowHistory(!showHistory)} />
        </div>
        <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto">
          {showHistory ? (
            <div className="w-full max-w-4xl space-y-4 pb-20">
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  {...message}
                />
              ))}
            </div>
          ) : (
            lastMessage && (
              <ChatMessage 
                {...lastMessage}
              />
            )
          )}
        </div>
        <div className="p-4 w-full fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading} 
          />
        </div>
      </main>
    </div>
  );
}