import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Scenario {
  id: number;
  title: string;
  category: string;
  language: string;
  system_prompt: string;
}

export default function ScenarioPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  useEffect(() => {
    async function fetchScenarios() {
      try {
        const res = await axios.get(`http://localhost:3000/scenarios?category=${category}`);
        setScenarios(res.data);
      } catch (err) {
        console.error('시나리오 불러오기 실패:', err);
      }
    }
    fetchScenarios();
  }, [category]);

  const handleStartConversation = async (scenarioId: number) => {
    try {
      const res = await axios.post('http://localhost:3000/conversations', {
        user_id: 1, // 추후 로그인 기능으로 교체 가능
        scenario_id: scenarioId,
      });
      navigate(`/chat/${res.data.id}`);
    } catch (err) {
      console.error('대화 시작 실패:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">🗂️ {category} 상황에서 대화할 주제를 선택하세요</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {scenarios.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg hover:scale-[1.02] transition cursor-pointer"
            onClick={() => handleStartConversation(s.id)}
          >
            <h3 className="text-lg font-bold text-blue-600">{s.title}</h3>
            <p className="text-sm text-gray-500 mt-1">언어: {s.language === 'en' ? '영어' : '일본어'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
