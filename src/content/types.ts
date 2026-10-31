/**
 * 뉴스레터 한 호(issue)의 데이터 형식입니다.
 * 새 호를 만들 때는 letters/_template.ts 를 복사해서 쓰세요.
 */

export interface LetterImage {
  /** public 폴더 기준 경로. 예: '/images/letters/2026-11/cover.jpg'  (파일이 없으면 자리표시 이미지가 보입니다) */
  src: string;
  /** 사진 설명(시각장애인 화면낭독·검색용). 짧게 */
  alt: string;
  /** 사진 아래 작은 캡션 (선택) */
  caption?: string;
}

export interface LetterVideo {
  /** 유튜브 주소(일반/쇼츠/youtu.be), mp4 파일 경로, 또는 인스타그램 릴스 주소. 비워두면 자리표시가 보입니다 */
  url: string;
  caption?: string;
}

export interface LetterSection {
  /** 소제목 앞 번호. 비워두면 순서대로 01, 02, 03 자동 */
  number?: string;
  title: string;
  /** 문단 배열. 한 줄 = 한 문단 */
  body: string[];
  /** 본문 이미지 (0~3장) */
  images?: LetterImage[];
  /** 본문 영상 (선택) */
  video?: LetterVideo;
}

export interface LetterNewsItem {
  /** 알약 모양 태그. 예: 'RUNNING', 'NEW CLASS' */
  tag: string;
  title: string;
  text?: string;
}

export interface Letter {
  /** 발행 연월 'YYYY-MM'. 주소가 됩니다 → /letter/2026-11  (한번 공개 후엔 바꾸지 마세요) */
  slug: string;
  /** 발행일 'YYYY-MM-DD' */
  publishedAt: string;
  /** 공개 여부. false면 사이트에 나타나지 않습니다 (로컬 미리보기에서는 DRAFT로 보임) */
  published: boolean;

  title: string;
  /** 제목 아래 서브 카피 */
  subtitle: string;
  /** 목록·카드·공유 미리보기에 쓰이는 짧은 요약 (1~2문장) */
  summary: string;
  /** 표지 이미지 */
  cover: LetterImage;

  /** 도입 문단 */
  intro: string[];
  /** 본문 섹션 */
  sections: LetterSection[];
  /** 나라필라테스 소식 (선택) */
  news?: {
    title?: string;
    items: LetterNewsItem[];
  };
  /** 마무리 문단 */
  outro: string[];

  /** 이 호에서만 다른 상담/시간표 링크를 쓰고 싶을 때 (선택, 비우면 site.ts 설정 사용) */
  cta?: {
    heading?: string;
    consultUrl?: string;
    scheduleUrl?: string;
  };
}

/** 사이트 안에서 쓰는 형태 (호수 번호가 자동으로 붙음) */
export interface IssuedLetter extends Letter {
  issueNumber: number;
}
