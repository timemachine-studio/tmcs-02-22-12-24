import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, AlertCircle } from 'lucide-react';
import { useAudioRecording } from '../../hooks/useAudioRecording';

interface VoiceRecorderProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function VoiceRecorder({ onSendMessage, disabled }: VoiceRecorderProps) {
  const { isRecording, startRecording, stopRecording, error } = useAudioRecording();
  const [showError, setShowError] = useState(false);

  const handleToggleRecording = async () => {
    try {
      setShowError(false);
      if (isRecording) {
        const transcription = await stopRecording();
        if (transcription.trim()) {
          await onSendMessage(transcription);
        }
      } else if (!disabled) {
        await startRecording();
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleToggleRecording}
        disabled={disabled && !isRecording}
        className={`p-3 rounded-full transition-all duration-300 relative group
          backdrop-blur-sm border
          disabled:opacity-50 disabled:cursor-not-allowed
          ${isRecording 
            ? 'bg-red-600/20 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
            : 'bg-purple-600/20 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
          }`}
        type="button"
      >
        {/* Holographic glow effect */}
        <div className={`absolute inset-0 rounded-full
          bg-gradient-to-r
          group-hover:opacity-100 opacity-0 transition-opacity duration-300
          animate-pulse
          ${isRecording
            ? 'from-red-600/0 via-red-600/30 to-red-600/0'
            : 'from-purple-600/0 via-purple-600/30 to-purple-600/0'
          }`}
        />
        
        {isRecording ? (
          <Square className="w-5 h-5 text-white relative z-10 drop-shadow-glow" />
        ) : (
          <Mic className="w-5 h-5 text-white relative z-10 drop-shadow-glow" />
        )}
      </motion.button>

      <AnimatePresence>
        {showError && error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2
              bg-red-600/90 backdrop-blur-sm text-white text-sm px-3 py-1
              rounded-lg whitespace-nowrap border border-red-500/30"
          >
            <div className="flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2
              rotate-45 w-2 h-2 bg-red-600/90" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}