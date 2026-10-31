# NALA LETTER

나라필라테스(NALA PILATES)의 월간 매거진 웹앱입니다.
로그인 없이 누구나 열람할 수 있는 공개 사이트이며, 매달 파일 하나만 추가하면 메인·아카이브·이전/다음 이동이 자동으로 갱신됩니다.

- 기술: React 19 · Vite 6 · TypeScript · 순수 CSS(반응형)
- 서버·DB 없음 → 무료 정적 호스팅(Cloudflare Pages 권장, Netlify·Vercel·GitHub Pages 가능)
- 주소 규칙
  - `/` 메인 (최신호 자동 표시)
  - `/letter/2026-11` 각 호 상세 (한 번 만든 주소는 영구 유지)
  - `/archive` 연도별·월별 아카이브

---

## 1. 프로젝트 파일 구조

```
nala-letter/
├─ index.html                  ← 기본 HTML (폰트, 공유 미리보기 기본값)
├─ package.json                ← 실행 명령어와 사용 라이브러리
├─ vite.config.ts
├─ tsconfig.json
├─ .nvmrc                      ← Node 버전(22)
├─ public/
│  └─ images/
│     ├─ share-default.jpg     ← (직접 추가) 카톡 공유 기본 이미지 1200×630
│     └─ letters/
│        └─ 2026-11/           ← 11월호 사진 폴더 (여기에 사진만 넣으면 교체 완료)
├─ scripts/
│  └─ postbuild.ts             ← 빌드 후 호별 페이지·sitemap 자동 생성
└─ src/
   ├─ config/
   │  └─ site.ts               ★ 상담·시간표 링크, 연락처, 주소 (운영자가 수정하는 파일)
   ├─ content/
   │  ├─ types.ts              ← 뉴스레터 입력 항목 정의
   │  ├─ letters.ts            ← 호 목록 자동 수집·정렬 (수정 불필요)
   │  └─ letters/
   │     ├─ _template.ts       ★ 새 호 작성용 템플릿
   │     └─ 2026-11.ts         ★ 11월호 콘텐츠
   ├─ components/              ← 디자인 부품 (헤더, 푸터, 사진/영상 자리, 카드, CTA)
   ├─ pages/                   ← 메인, 상세, 아카이브, 404 화면
   ├─ lib/                     ← 라우터, 날짜 표기, 영상 주소 처리
   ├─ styles/global.css        ← 컬러·타이포·레이아웃 (브랜드 팔레트)
   ├─ App.tsx
   └─ main.tsx
```

★ 표시된 3곳만 운영자가 손대는 파일이고, 나머지는 디자인·시스템 코드입니다.
콘텐츠(`src/content/letters/`)와 디자인(`components`, `pages`, `styles`)이 분리돼 있어 글을 고쳐도 디자인이 깨지지 않습니다.

### 브랜드 컬러 (styles/global.css 상단)

| 용도 | 토큰 | 코드 |
|---|---|---|
| 메인 · 강조 도형(알약 태그, 버튼, 하단 블록) | `--forest` 다크 그린 | `#263427` |
| 보조 · 소개 섹션 배경, 사진 자리표시 | `--sage` 세이지 그린 | `#CDD6CE` |
| 보조 · 소식 박스 | `--sand` 샌드 베이지 | `#E6DCCB` |
| 포인트 · 라벨, 소제목 번호, 주요 버튼 | `--terracotta` 테라코타 오렌지 | `#C57C49` |
| 본문 텍스트 | `--muted` 뮤트 그레이-그린 | `#56645A` |
| 페이지 배경 | `--ivory` 웜 아이보리 | `#F5F1E8` |

카드뉴스 컬러 가이드와 같은 4색을 그대로 쓰고, 웹 배경용 아이보리와 샌드만 추가했습니다. 인스타그램 카드뉴스와 뉴스레터가 같은 브랜드로 보이게 하기 위함입니다.

---

## 2. 로컬(내 컴퓨터)에서 실행하기

PC에 한 번만 설치: [Node.js](https://nodejs.org) LTS 버전(20 이상)

```bash
cd nala-letter
npm install        # 처음 한 번
npm run dev        # 미리보기 서버 실행 → 터미널에 뜨는 http://localhost:5173 열기
```

- `npm run dev` 상태에서는 `published: false`인 호도 **DRAFT** 표시와 함께 보입니다. 공개 전 검토용입니다.
- 사진 파일이 없는 자리에는 파일 경로가 표시되어 어떤 이름으로 넣어야 하는지 바로 알 수 있습니다.
- 실제 배포용 결과물 확인: `npm run build` → `npm run preview`

> 로컬 실행은 필수가 아닙니다. GitHub + Cloudflare Pages로 배포하면 빌드는 Cloudflare가 대신 합니다.

---

## 3. 새 뉴스레터 추가하기 (매월 반복 작업)

1. `src/content/letters/_template.ts` 를 복사해서 `2026-12.ts` 처럼 **발행 연월**로 이름을 바꿉니다.
2. 파일 안의 항목을 채웁니다.

| 항목 | 필드 | 예시 |
|---|---|---|
| 발행 연월 | `slug` | `'2026-12'` (파일 이름과 동일) |
| 발행일 | `publishedAt` | `'2026-12-01'` |
| 공개 여부 | `published` | `true` 공개 / `false` 비공개 |
| 제목 | `title` | |
| 서브 카피 | `subtitle` | |
| 요약 | `summary` | 카드·카톡 미리보기에 노출, 1~2문장 |
| 표지 이미지 | `cover.src` | `'/images/letters/2026-12/cover.jpg'` |
| 도입 | `intro` | 문단 배열 |
| 본문 | `sections[].title / body` | 소제목 + 문단 배열 (번호 01·02·03 자동) |
| 본문 이미지 | `sections[].images` | 0~3장, 2장이면 나란히 배치 |
| 영상 링크 | `sections[].video.url` | 유튜브(쇼츠 포함)·mp4·인스타 릴스 주소 |
| 센터 소식 | `news.items` | 태그 + 제목 + 설명 |
| 마무리 | `outro` | 문단 배열 |
| 상담 링크 | `cta.consultUrl` | 비우면 site.ts 기본값 사용 |

3. 사진을 `public/images/letters/2026-12/` 폴더에 올립니다.
4. 저장(GitHub에 커밋)하면 1~2분 뒤 자동 배포됩니다.
   - 메인 최신호가 12월호로 바뀌고, 11월호는 '지난 NALA LETTER'와 아카이브로 이동
   - 호수(VOL.02)는 공개된 순서대로 자동 부여
   - `/letter/2026-11` 주소는 그대로 유지

**규칙**
- 공개한 호의 파일 이름(slug)은 바꾸지 마세요. 주소가 바뀌어 이미 공유한 링크가 끊깁니다.
- 내리고 싶은 호는 파일을 지우지 말고 `published: false`로 바꾸세요.
- 문장 안에 작은따옴표(')를 쓰려면 `\'` 로 적거나, 문장 전체를 큰따옴표(" ")로 감싸세요.

> GitHub 웹사이트에서 파일 편집·사진 업로드가 모두 가능하므로, 매월 작업은 **휴대폰으로도** 할 수 있습니다.

---

## 4. 사진 교체하기

사진 자리는 **경로에 파일이 있으면 사진, 없으면 브랜드 컬러 자리표시**로 자동 전환됩니다. 코드를 고칠 필요 없이 정해진 이름으로 파일만 넣으면 됩니다.

11월호 사진 이름 (`public/images/letters/2026-11/`):

| 파일 이름 | 위치 | 권장 비율 |
|---|---|---|
| `cover.jpg` | 표지 (메인 최신호 + 상세 상단) | 4:5 세로 (1600×2000) · PC 상세는 16:9로 가운데 자르기 |
| `mat-1.jpg`, `mat-2.jpg` | 01 음악과 함께한 매트 필라테스 | 4:5 세로 |
| `running.jpg` | 02 금요일 러닝 | 3:2 가로 |
| `new-move.jpg` | 03 새로운 움직임 | 3:2 가로 |

- 파일 이름은 영문 소문자·숫자·하이픈만, 확장자까지 정확히 (`Cover.JPG` ≠ `cover.jpg`)
- 사진 한 장 500KB 이하 권장 (모바일 로딩 속도). [squoosh.app](https://squoosh.app)에서 무료 압축
- 다른 이름을 쓰고 싶으면 해당 호 파일의 `src` 경로만 바꾸면 됩니다
- 사진은 비율 박스에 맞춰 가운데 기준으로 잘리므로, 인물 얼굴은 사진 중앙 부근에 오도록 고르세요
- 카톡 공유 미리보기는 그 호의 `cover.jpg`를 사용합니다. 없으면 `public/images/share-default.jpg`(1200×630)를 사용합니다

---

## 5. 상담·시간표 링크 바꾸기

`src/config/site.ts` 파일의 `links`만 수정하세요.

```ts
links: {
  consult: 'https://pf.kakao.com/_xxxxx/chat',   // 상담 (카카오톡 채널, 네이버 예약, 구글폼 등)
  schedule: 'https://...',                        // 시간표 (노션, 이미지 링크, 네이버 예약 등)
  instagram: 'https://www.instagram.com/nala_pilates/',
  kakao: '',
  naverPlace: '',
},
```

- 비워 둔 링크(`''`)는 인스타그램으로 연결됩니다. 배포 전 반드시 채우세요.
- 같은 파일에서 전화번호(`studio.phone`), 운영시간(`studio.hours`), 주소, 버튼 문구도 바꿀 수 있습니다. 비워 두면 그 줄이 화면에서 숨겨집니다.
- 특정 호만 다른 링크(예: 이벤트 신청폼)를 쓰려면 그 호 파일의 `cta.consultUrl`에 넣으세요.

---

## 6. GitHub에 올리기

**방법 A — 웹 브라우저 (PC, 설치 없음)**

1. [github.com](https://github.com) 가입 → 우측 상단 `+` → **New repository**
2. 이름 `nala-letter`, **Public** 또는 Private(둘 다 배포 가능) → Create repository
3. 생성 화면의 **uploading an existing file** 클릭
4. `nala-letter` 폴더 **안의 내용 전체**를 드래그해서 올립니다 (`node_modules`, `dist` 폴더는 제외)
   - `src`, `public`, `scripts` 폴더 구조가 그대로 올라갔는지 확인
5. 아래 **Commit changes** 클릭

**방법 B — GitHub Desktop** (폴더째 관리하기 편함)
[desktop.github.com](https://desktop.github.com) 설치 → File › Add local repository → 폴더 선택 → Publish repository

---

## 7. 무료 호스팅에 배포하기 (Cloudflare Pages 권장)

**권장 이유**: 무료 요금제에서 트래픽 제한이 사실상 없고, 국내 접속 속도가 빠르며, 독립 도메인 연결과 HTTPS가 무료입니다. 회원 단톡방에 링크가 한꺼번에 퍼져도 과금·차단 걱정이 없습니다.

1. [dash.cloudflare.com](https://dash.cloudflare.com) 가입
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → GitHub 연결 → `nala-letter` 선택
3. 빌드 설정

| 항목 | 값 |
|---|---|
| Framework preset | Vite (또는 None) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| 환경 변수 (Environment variables) | `NODE_VERSION` = `22` |

4. **Save and Deploy** → 1~2분 후 `https://nala-letter.pages.dev` 같은 **공개 주소** 생성
5. `src/config/site.ts`의 `siteUrl`을 실제 주소로 바꾸고 다시 커밋 (카톡 미리보기 이미지 주소에 사용)

이후로는 GitHub에 파일을 올릴 때마다 자동으로 재배포됩니다.

<details>
<summary>다른 무료 호스팅을 쓸 경우</summary>

- **Netlify**: Add new site → Import from Git → Build `npm run build`, Publish `dist`
- **Vercel**: Add New Project → Framework Vite → Output `dist` (Build Command를 `npm run build`로 지정)
- **GitHub Pages**: 저장소 주소가 `아이디.github.io/nala-letter`처럼 하위 경로가 되므로 `vite.config.ts`의 `base` 수정이 필요합니다. 독립 도메인 연결 전제라면 위 세 곳 중 하나를 권장합니다.

빌드 결과물이 호마다 실제 폴더(`dist/letter/2026-11/index.html`)로 생성되므로 어느 호스팅에서도 같은 주소로 동작합니다. 특정 서비스 전용 설정 파일이 없어 호스팅을 옮겨도 그대로 사용할 수 있습니다.
</details>

---

## 8. 나중에 독립 도메인 연결하기

예: `letter.nalapilates.com` (서브도메인 권장 — 본 홈페이지와 분리 운영 가능)

1. 도메인 구매 (가비아, 후이즈, Cloudflare Registrar 등)
2. Cloudflare Pages 프로젝트 → **Custom domains** → **Set up a custom domain** → `letter.nalapilates.com` 입력
3. 화면 안내대로 DNS 설정
   - 도메인을 Cloudflare에서 관리하면 자동 설정
   - 가비아 등 외부 업체면 DNS 관리에서 **CNAME** 추가: 호스트 `letter` → 값 `nala-letter.pages.dev`
4. 연결 완료(보통 수 분~수 시간) 후 `src/config/site.ts`의 `siteUrl`을 `https://letter.nalapilates.com`으로 변경 → 커밋
5. 기존 `pages.dev` 주소도 계속 열리므로 이미 공유한 링크는 끊기지 않습니다

---

## 9. 배포 후 접속 확인

**휴대폰**
- [ ] 카카오톡 '나와의 채팅'에 `https://(주소)/letter/2026-11` 전송 → 미리보기에 제목·요약·표지가 뜨는지
- [ ] 링크 탭 → 카톡 인앱 브라우저에서 로그인 없이 열리는지
- [ ] 와이파이를 끄고 LTE/5G로도 열리는지
- [ ] 상단 Letter / Archive / 상담 버튼, 하단 시간표·상담 버튼이 의도한 링크로 가는지
- [ ] 상세 페이지 '공유하기' 버튼 → 공유 창이 뜨는지
- [ ] 사진이 잘리거나 가로 스크롤이 생기지 않는지

**PC**
- [ ] 시크릿 창(로그인 안 된 상태)에서 메인·상세·아카이브 열기
- [ ] 주소창에 `/letter/2026-11`을 직접 입력해도 열리는지 (새로고침 포함)
- [ ] 없는 주소(`/letter/2000-01`) → '페이지를 찾을 수 없어요' 화면

> 카톡 미리보기가 예전 내용으로 뜨면 카카오가 캐시를 저장한 것입니다. [카카오 개발자 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에서 주소 입력 → '캐시 초기화'.

---

## 10. 실제 배포 전 점검 목록

**콘텐츠**
- [ ] 11월호 발행일 `publishedAt` 확인 (현재 `2026-11-01`로 입력됨)
- [ ] 'NALA NEWS' 소식 2건 문구 확인 (본문 내용 기반으로 작성됨, 러닝 모임 참여 방법 안내 문구 포함)
- [ ] 오탈자, 띄어쓰기
- [ ] 회원 얼굴이 나오는 사진은 게시 동의 받았는지

**사진·영상**
- [ ] `cover.jpg` 등 5장 업로드 (파일 이름·대소문자 일치)
- [ ] 장당 500KB 이하로 압축
- [ ] `share-default.jpg` (1200×630) 업로드
- [ ] 매트 필라테스 영상: 유튜브(일부공개 가능) 또는 쇼츠 주소를 `video.url`에 입력. 인스타 릴스는 사이트 안 재생이 안 되고 '보러 가기' 버튼으로 표시됨

**설정 (`src/config/site.ts`)**
- [ ] `links.consult` 상담 링크
- [ ] `links.schedule` 시간표 링크
- [ ] `studio.phone`, `studio.hours` (필요 시)
- [ ] `siteUrl` 실제 배포 주소로 변경

**동작**
- [ ] 9번 접속 확인 목록 전체 통과
- [ ] 배포 후 공개 주소를 회원 단톡방·인스타 프로필 링크·문자 등 고정 채널 한 곳에 먼저 걸어 반응 확인
