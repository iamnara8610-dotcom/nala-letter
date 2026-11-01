import { useState } from 'react';
import type { LetterVideo } from '../content/types';
import { parseVideo } from '../lib/video';
import { externalProps } from '../lib/links';

export function VideoSlot({ video }: { video: LetterVideo }) {
  const v = parseVideo(video.url);
  // mp4 파일은 영상 비율(세로/가로)을 자동으로 감지합니다
  const [vertical, setVertical] = useState(false);

  return (
    <figure className="video-slot">
      {v.kind === 'youtube' ? (
        <div className={`video-slot__frame ${v.vertical ? 'is-vertical' : ''}`}>
          <iframe
            src={v.embedUrl}
            title={video.caption || 'NALA LETTER 영상'}
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      ) : v.kind === 'file' ? (
        <div className={`video-slot__frame ${vertical ? 'is-vertical' : ''}`}>
          <video
            src={v.src}
            poster={video.poster}
            controls
            playsInline
            preload="metadata"
            onLoadedMetadata={(e) => setVertical(e.currentTarget.videoHeight > e.currentTarget.videoWidth)}
          />
        </div>
      ) : (
        <div className="video-slot__frame video-slot__frame--empty">
          <div className="video-slot__placeholder">
            <span className="video-slot__play" aria-hidden="true" />
            <span className="video-slot__label">VIDEO</span>
            {v.kind === 'link' ? (
              <a className="btn btn--light btn--sm" href={v.href} {...externalProps}>
                {v.label} ↗
              </a>
            ) : (
              <span className="video-slot__soon">영상이 곧 업로드됩니다</span>
            )}
          </div>
        </div>
      )}
      {video.caption ? <figcaption>{video.caption}</figcaption> : null}
    </figure>
  );
}
