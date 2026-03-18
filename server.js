const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 루트 경로 명시적 처리
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET /app - 신청 폼 JSON 반환
app.get('/app', (req, res) => {
  res.json({
    title: '📚 스마트올 무료 체험 신청',
    description: '우리 아이에게 딱 맞는 학습을 무료로 체험해보세요!',
    fields: [
      { name: 'name', label: '자녀 이름', type: 'text', placeholder: '이름을 입력해주세요', required: true },
      { name: 'grade', label: '학년 선택', type: 'select', placeholder: '학년을 선택해주세요', options: ['초1','초2','초3','초4','초5','초6','중1','중2','중3'], required: true },
      { name: 'phone', label: '보호자 연락처', type: 'tel', placeholder: '010-0000-0000', required: true }
    ],
    submitButton: '🎓 무료 체험 시작하기',
    notice: '입력하신 정보는 체험 안내 목적으로만 사용됩니다.'
  });
});

// POST /apply - 신청 데이터 수신
app.post('/apply', (req, res) => {
  const { name, grade, phone } = req.body;

  if (!name || !grade || !phone) {
    return res.status(400).json({
      success: false,
      emoji: '😅',
      message: '앗, 빠진 항목이 있어요! 모든 항목을 입력해주세요.'
    });
  }

  console.log('=== 🎉 새 신청 접수 ===');
  console.log(`이름: ${name}`);
  console.log(`학년: ${grade}`);
  console.log(`연락처: ${phone}`);
  console.log('========================');

  res.json({
    success: true,
    emoji: '🎉',
    message: `${name} 학생의 무료 체험 신청이 완료되었어요!`,
    detail: '담당 선생님이 빠른 시간 내에 연락드릴 예정입니다.',
    summary: { name, grade, phone }
  });
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
