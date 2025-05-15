import React from 'react';
import { useNavigate } from 'react-router-dom';

const personas = [
  { label: '일상', value: 'daily', color: 'from-sky-100 to-sky-200' },
  { label: '비즈니스', value: 'business', color: 'from-indigo-100 to-indigo-200' },
  { label: '여행', value: 'travel', color: 'from-pink-100 to-pink-200' },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">🧑‍🎤 어떤 상황에서 대화하고 싶으신가요?</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {personas.map((persona) => (
          <div
            key={persona.value}
            className={`w-60 h-40 bg-gradient-to-br ${persona.color} rounded-xl shadow-lg flex items-center justify-center text-xl font-bold text-gray-700 hover:scale-105 cursor-pointer transition`}
            onClick={() => navigate(`/scenarios/${persona.value}`)}
          >
            {persona.label}
          </div>
        ))}
      </div>
    </div>
  );
}
