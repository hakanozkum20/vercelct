"use client";

import { Mic, MicOff, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface VoiceChatInputProps {
  onSendMessage?: (message: string) => void;
  onVoiceStart?: () => void;
  onVoiceStop?: (duration: number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const VoiceChatInput = ({
  onSendMessage,
  onVoiceStart,
  onVoiceStop,
  placeholder = "Mesajınızı yazın...",
  className,
  disabled = false
}: VoiceChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRecording) {
      onVoiceStart?.();
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000) as unknown as number;
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (recordingTime > 0) {
        onVoiceStop?.(recordingTime);
      }
      setRecordingTime(0);
    }

    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [isRecording, recordingTime, onVoiceStart, onVoiceStop]);

  const handleSendMessage = () => {
    if (message.trim() && !disabled) {
      onSendMessage?.(message.trim());
      setMessage("");
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    if (disabled) return;
    setIsRecording(prev => !prev);
    setIsListening(prev => !prev);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex items-center gap-2 p-3 bg-background border border-border rounded-lg shadow-sm">
        {/* Voice Recording Visualizer */}
        {isRecording && (
          <div className="absolute top-0 left-0 right-0 flex items-center justify-center gap-0.5 p-2 bg-primary/5 rounded-t-lg">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-foreground/70">
                {formatTime(recordingTime)}
              </span>
            </div>
            <div className="flex items-center gap-0.5 ml-2">
              {Array.from({ length: 12 }, (_, i) => i).map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-0.5 bg-primary rounded-full transition-all duration-300",
                    isListening ? "animate-pulse" : ""
                  )}
                  style={{
                    height: `${8 + Math.random() * 16}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Text Input */}
        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isRecording ? "Dinleniyor..." : placeholder}
            disabled={disabled || isRecording}
            className={cn(
              "w-full bg-transparent border-0 outline-none text-sm text-foreground placeholder:text-muted-foreground",
              isRecording && "pt-8"
            )}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Voice Button */}
          <button
            type="button"
            onClick={toggleRecording}
            disabled={disabled}
            className={cn(
              "p-2 rounded-md transition-all duration-200 hover:bg-accent",
              isRecording
                ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950 dark:text-red-400"
                : "text-muted-foreground hover:text-foreground",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            aria-label={isRecording ? "Kaydı durdur" : "Sesli mesaj"}
          >
            {isRecording ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>

          {/* Send Button */}
          {message.trim() && !isRecording && (
            <button
              type="button"
              onClick={handleSendMessage}
              disabled={disabled}
              className={cn(
                "p-2 rounded-md bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              aria-label="Mesaj gönder"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Recording Status */}
      {isRecording && (
        <div className="mt-2 text-center">
          <p className="text-xs text-muted-foreground">
            Konuşmaya başlayın... Durdurmak için mikrofon butonuna tekrar tıklayın
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceChatInput; 