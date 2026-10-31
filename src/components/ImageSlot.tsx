import { useState } from 'react';
import type { LetterImage } from '../content/types';

type Ratio = 'cover' | 'wide' | 'portrait' | 'square';

interface Props {
  image?: LetterImage;
  ratio?: Ratio;
  /** 자리표시 안에 보일 작은 라벨 */
  label?: string;
  className?: string;
  eager?: boolean;
  showCaption?: boolean;
}

/**
 * 사진 자리.
 * - src 경로에 파일이 있으면 사진을 보여주고
 * - 파일이 없거나 경로가 비어 있으면 브랜드 컬러의 자리표시를 보여줍니다.
 * 사진 비율은 ratio로 고정되어 모바일에서도 레이아웃이 깨지지 않습니다.
 */
export function ImageSlot({ image, ratio = 'wide', label = 'PHOTO', className = '', eager, showCaption = true }: Props) {
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(image?.src) && !failed;

  return (
    <figure className={`img-slot img-slot--${ratio} ${className}`}>
      <div className="img-slot__frame">
        {hasImage ? (
          <img
            src={image!.src}
            alt={image!.alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="img-slot__placeholder" role="img" aria-label={image?.alt || '사진 준비 중'}>
            <span className="img-slot__mark">NALA LETTER</span>
            <span className="img-slot__label">{label}</span>
            {import.meta.env.DEV && image?.src ? <code className="img-slot__path">{image.src}</code> : null}
          </div>
        )}
      </div>
      {showCaption && image?.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
}
