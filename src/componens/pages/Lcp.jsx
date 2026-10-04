import React, { useEffect, useRef, useState } from "react";

import Videobg from "../../assets/video_home_com.mp4";
import { useTranslation } from "react-i18next";
import poster from "../../assets/firstVideoFrame.png";

export default function Lcp() {
  const { i18n, t } = useTranslation();

  const dir = i18n.dir();
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false);

  useEffect(() => {
    const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const update = (event) => setPaused(event.matches);
    preference?.addEventListener?.('change', update);
    return () => preference?.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (paused) video.pause();
    else video.play()?.catch(() => setPaused(true));
  }, [paused]);

  const slogan_style = {
    fontFamily: "system-ui sans-serif",
    fontWeight: "bold",
    fontStyle: "italic",
    textShadow: "3px 1px 2px black",
    wordSpacing: "100vmax",
    fontSize: "10vmin",
    direction: dir,
  };

  return (
    <div className="heroSection d-flex flex-column align-items-center col-12">
      <video ref={videoRef} src={Videobg} poster={poster} autoPlay={!paused}
        playsInline loop muted aria-hidden="true" className="videoHeader"
        onPlay={() => setPaused(false)} onPause={() => setPaused(true)} />
      <div
        className="col-12 position-absolute flex-column justify-content-around d-flex align-items-center lcpOverlay"
        style={{
          padding: "10vh",
          objectFit: "cover",
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="text-light lcpText" style={{ fontSize: "30px" }}>
          <h1 style={slogan_style}>{t("slogen")}</h1>
        </div>
      </div>
      <button type="button" className="videoToggle" onClick={() => setPaused((value) => !value)}>
        {t(paused ? 'play video' : 'pause video')}
      </button>
    </div>
  );
}
