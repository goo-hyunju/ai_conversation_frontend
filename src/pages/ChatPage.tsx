import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ChatMessage from '../components/ChatMessage';

interface Message {
  sender: 'user' | 'ai';
  original: string;
  translated?: string;
  pronunciation?: string;
}

export default function ChatPage() {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // 1. 대화 불러오기
  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await axios.get(`http://localhost:3000/conversations/${conversationId}/messages`);
        const parsed = res.data.map((msg: any) => ({
          sender: msg.sender,
          original: msg.content,
          translated: msg.translated,
          pronunciation: msg.pronunciation
        }));
        setMessages(parsed);
      } catch (err) {
        console.error('대화 불러오기 실패:', err);
      }
    }
    fetchMessages();
  }, [conversationId]);

  // 2. 메시지 전송
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setInput("");

    const newMessages = [...messages, { sender: 'user' as 'user', original: userMessage }];
    setMessages(newMessages);

    try {
      const res = await axios.post(`http://localhost:3000/conversations/${conversationId}/messages`, {
        user_message: userMessage,
      });

      const { original, translated, pronunciation } = res.data.ai;
      setMessages([
        ...newMessages,
        {
          sender: 'ai',
          original,
          translated,
          pronunciation
        }
      ]);
    } catch (err) {
      console.error('GPT 응답 실패:', err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white p-4 rounded shadow-md">
        <div className="h-96 overflow-y-auto space-y-2">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} {...msg} />
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none"
            placeholder="메시지를 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
            onClick={handleSend}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
