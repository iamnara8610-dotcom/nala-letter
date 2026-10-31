import type { Letter } from '../types';

/**
 * ✍️ 새 뉴스레터 템플릿
 *
 * 1) 이 파일을 복사해서 이름을 'YYYY-MM.ts'로 바꾸세요.  예) 2026-12.ts
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
    {
      title: '첫 번째 소제목',
      body: ['문단 1', '문단 2'],
      images: [{ src: '/images/letters/2026-12/photo-1.jpg', alt: '사진 설명', caption: '캡션(선택)' }],
      video: { url: '', caption: '영상 설명(선택)' },
    },
    {
      title: '두 번째 소제목',
      body: ['문단 1'],
    },
  ],

  news: {
    title: 'NALA NEWS',
    items: [{ tag: 'NOTICE', title: '소식 제목', text: '소식 내용' }],
  },

  outro: ['마무리 문단'],

  // 이 호에서만 다른 링크를 쓰려면 주석을 풀고 입력
  // cta: { heading: 'CTA 문구', consultUrl: 'https://...', scheduleUrl: 'https://...' },
};

export default letter;
