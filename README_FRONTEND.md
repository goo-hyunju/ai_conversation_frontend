# 🧠 AI Conversation App — Frontend

AI 기반 영어/일본어 회화 학습 웹앱의 프론트엔드입니다.  
React + TypeScript + Vite + TailwindCSS 기반으로 구성되어 있으며, 상황(페르소나)에 맞는 대화를 지원합니다.

---

## 🚀 주요 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) |
| 번들러 | [Vite](https://vitejs.dev/) |
| 스타일링 | [Tailwind CSS](https://tailwindcss.com/) |
| 상태 관리 | useState / useEffect (MVP 기준) |
| 라우팅 | react-router-dom |
| API 통신 | axios

---

## 📁 폴더 구조

```
src/
├── components/          # 재사용 UI 컴포넌트 (ChatMessage 등)
├── pages/               # 주요 페이지 (HomePage, ScenarioPage, ChatPage)
├── services/            # axios 기반 API 함수들
├── App.tsx              # 라우터 정의
├── index.tsx            # 엔트리 포인트
├── index.css            # Tailwind import
```

---

## 🧪 설치 및 실행

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저 열기
http://localhost:5173
```

---

## ⚙️ 필요한 환경

- Node.js 18 이상
- Vite
- 백엔드 서버: `http://localhost:3000`에서 실행 중이어야 합니다

---

## 🔌 API 연동 예시

### 🎯 시나리오 불러오기

```ts
axios.get('http://localhost:3000/scenarios?category=travel');
```

### ✏️ 대화 시작

```ts
axios.post('http://localhost:3000/conversations', {
  user_id: 1,
  scenario_id: 6,
});
```

### 💬 메시지 전송 (GPT 응답 포함)

```ts
axios.post(`http://localhost:3000/conversations/:id/messages`, {
  user_message: 'I'd like to check in to my flight.',
});
```

---

## 🧭 기능 흐름

1. `/` – 페르소나 선택 화면 (일상 / 비즈니스 / 여행)
2. `/scenarios/:category` – 선택한 상황별 대화 시나리오 카드
3. `/chat/:conversationId` – 실제 GPT 대화 페이지

---

## 🎨 디자인

- 하늘하늘한 파스텔톤 색감
- Tailwind의 `from-sky-*`, `to-indigo-*`, `rounded`, `shadow` 스타일 활용
- 카드 기반 인터랙션 UI

---

## ❓테스트 방법 (Postman 없이 프론트 테스트)

- 브라우저 열기 → 상황 선택 → 시나리오 선택 → 대화 입력
- 백엔드가 실행 중이어야 전체 흐름이 작동합니다 (`node app.js`)

---

## 📦 배포 시 유의사항

- CORS가 백엔드에 설정되어 있어야 함 (`cors` 미들웨어)
- 백엔드 주소가 고정된 경우 `.env` 파일 또는 Vite 설정에서 분리 가능