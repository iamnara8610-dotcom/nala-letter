import type { LetterVideo } from '../content/types';
import { parseVideo } from '../lib/video';
import { externalProps } from '../lib/links';

export function VideoSlot({ video }: { video: LetterVideo }) {
  const v = parseVideo(video.url);

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
        <div className="video-slot__frame">
          <video src={v.src} controls playsInline preload="metadata" />
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
