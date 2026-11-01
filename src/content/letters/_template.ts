import type { Letter } from '../types';

/**
 * ✍️ 새 뉴스레터 템플릿  — 매달 같은 구조: [지난달 돌아보기] + [이번 달 계획]
 *
 * 1) 이 파일을 복사해서 이름을 'YYYY-MM.ts'로 바꾸세요.  예) 2026-12.ts
 *    (호수는 '발행하는 달' 기준. 12월 초에 내는 호 = 12월호 = 11월 돌아보기 + 12월 계획)
 *    (이름이 _ 로 시작하는 파일은 사이트에 나타나지 않습니다)
 * 2) 아래 내용을 채우고 published: true 로 바꾸면
 *    메인 최신호 · 아카이브 · 이전/다음 이동에 자동 반영됩니다.
 * 3) 사진은 public/images/letters/YYYY-MM/ 폴더에 넣으세요.
 */
const letter: Letter = {
  slug: '2026-12', // 파일 이름과 똑같이
  publishedAt: '2026-12-01',
  published: false,

  title: '제목을 입력하세요',
  subtitle: '제목 아래 한 줄 서브 카피',
  summary: '목록과 카카오톡 공유 미리보기에 보이는 1~2문장 요약',
  cover: { src: '/images/letters/2026-12/cover.jpg', alt: '표지 사진 설명' },

  intro: ['도입 문단 1', '도입 문단 2'],

  sections: [
    // ── 지난달 돌아보기 (파트 첫 섹션에만 part 를 적어요) ──
    {
      part: { label: 'NOVEMBER REVIEW', title: '11월 돌아보기' },
      title: '지난달 활동 1',
      body: ['문단 1', '문단 2'],
      images: [{ src: '/images/letters/2026-12/review-1.jpg', alt: '사진 설명', caption: '캡션(선택)' }],
      video: { url: '', caption: '영상 설명(선택)' },
    },
    {
      title: '지난달 활동 2',
      body: ['문단 1'],
    },

    // ── 이번 달 계획 ──
    {
      part: { label: 'DECEMBER PLAN', title: '12월 계획' },
      title: '이번 달 일정·이벤트 1',
      body: ['날짜, 시간, 대상, 참여 방법을 구체적으로'],
    },
    {
      title: '이번 달 일정·이벤트 2',
      body: ['문단 1'],
    },
  ],

  // 이번 달 일정 한눈에 보기 (태그에 날짜를 쓰면 달력처럼 보여요)
  news: {
    title: 'DECEMBER AT A GLANCE',
    items: [
      { tag: '12.00 MON', title: '일정 제목', text: '한 줄 설명' },
      { tag: 'EVERY FRI 21:00', title: '정기 일정', text: '한 줄 설명' },
    ],
  },

  outro: ['마무리 문단'],

  // 이 호에서만 다른 링크를 쓰려면 주석을 풀고 입력
  // cta: { heading: 'CTA 문구', consultUrl: 'https://...', scheduleUrl: 'https://...' },
};

export default letter;
