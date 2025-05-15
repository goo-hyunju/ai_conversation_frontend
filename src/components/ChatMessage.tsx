import React from 'react';

interface ChatMessageProps {
  sender: 'user' | 'ai';
  original: string;
  translated?: string | null;
  pronunciation?: string | null;
}

export default function ChatMessage({ sender, original, translated, pronunciation }: ChatMessageProps) {
  const isUser = sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
        <p className="font-semibold">{original}</p>
        {!isUser && (
          <>
            <p className="text-sm text-gray-600 mt-1">🇰🇷 번역: {translated}</p>
            <p className="text-sm text-gray-500 italic">🗣️ 발음: {pronunciation}</p>
          </>
        )}
      </div>
    </div>
  );
}
