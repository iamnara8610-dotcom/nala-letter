/**
 * ─────────────────────────────────────────────
 *  NALA LETTER 사이트 설정 파일
 *  링크·연락처·주소가 바뀌면 이 파일만 수정하세요.
 *  (디자인 코드는 건드릴 필요가 없습니다)
 * ─────────────────────────────────────────────
 */
export const site = {
  /** 배포 후 실제 공개 주소. 독립 도메인 연결 시 여기만 바꾸면 됩니다. (마지막 / 없이) */
  siteUrl: 'https://nala-letter.nalapilates.workers.dev',

  brand: 'NALA PILATES',
  title: 'NALA LETTER',
  tagline: 'MOVEMENT · LIFE · WELLNESS',
  description: '움직임과 일상, 웰니스를 전하는 나라필라테스의 월간 매거진 NALA LETTER.',

  /** 공유(카카오톡 등) 미리보기 기본 이미지. public 폴더 기준 경로 */
  defaultShareImage: '/images/share-default.jpg',

  /**
   * 버튼 링크
   * - 비워두면('') 상담·시간표 버튼은 아래 instagram 주소로 연결됩니다.
   * - 네이버 예약, 카카오톡 채널, 구글폼, 노션 시간표 등 어떤 URL이든 가능합니다.
   */
  links: {
    consult: 'https://m.place.naver.com/place/1138429674/home', // 네이버 플레이스 (예약·상담)
    schedule: 'https://rhetorical-jumpsuit-0d5.notion.site/NALA-PILATES-4098aaef1067815abd46fd5b2c2f031c', // 노션 시간표 (노션에서만 수정)
    instagram: 'https://www.instagram.com/nala_pilates/',
    kakao: '', // 카카오톡 채널 주소 (있으면 하단에 표시)
    naverPlace: 'https://m.place.naver.com/place/1138429674/home', // 네이버 플레이스 (하단에 표시)
  },

  /** 버튼 문구 */
  labels: {
    consult: '운동 상담 문의하기',
    schedule: '수업 시간표 확인하기',
  },

  /** 하단 센터 정보 (비워두면 해당 줄이 숨겨집니다) */
  studio: {
    name: '나라필라테스',
    summary: '제주 일도동의 필라테스 & 웨이트 트레이닝 스튜디오',
    description:
      '움직임을 관찰하고, 불편함의 원인을 찾고, 지금의 몸에 맞는 운동을 설계합니다. 기구 필라테스와 웨이트 트레이닝을 함께 다루는 나라필라테스입니다.',
    address: '제주시 일도동',
    phone: '', // 예: '064-000-0000'
    hours: '', // 예: '평일 07:00–22:00 · 토 09:00–14:00'
    instagramHandle: '@nala_pilates',
  },
} as const;

export type SiteConfig = typeof site;
