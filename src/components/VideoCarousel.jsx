import React, { useRef, useState, useEffect } from "react";
import { hightlightsSlides } from "../constants";
import { gsap } from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useGSAP(() => {}, [isEnd, videoId]);

  useEffect(() => {
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
        onComplete: () => {
          setVideo((prev) => ({
            ...prev,
            startPlay: true, // Fixed syntax
          }));
        },
      },
    });

    if (loadedData.length > 3) {
      if (isPlaying) {
        videoRef.current[videoId]?.pause();
      } else {
        startPlay && videoRef.current[videoId]?.play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

const handleLoadedMetadata = (i, e) => {
  setLoadedData((prev) => {
    const newData = [...prev];
    newData[i] = e;
    return newData;
  });
};


  useEffect(() => {
    let span = videoSpanRef.current;
    let currentProgress = 0; 

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 10);
          if (progress !== currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw"
                  : window.innerWidth < 1200
                  ? "10VW"
                  : "4vw",
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });

            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            }); // Fixed misplaced closing parenthesis
          }
        },
      });
    }
  }, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    if (type === "video-play") {
      setVideo((prev) => ({ ...prev, isPlaying: true }));
      videoRef.current[i]?.play();
    } else if (type === "video-pause") {
      setVideo((prev) => ({ ...prev, isPlaying: false }));
      videoRef.current[i]?.pause();
    } else if (type === "video-reset") {
      setVideo((prev) => ({ ...prev, videoId: 0, isPlaying: false }));
      videoRef.current[0]?.play();
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10 relative">
            <div className="video-carousel_container relative">
              <video
                id="video"
                ref={(el) => (videoRef.current[i] = el)}
                playsInline
                preload="auto"
                muted
                className="w-full h-full rounded-3xl overflow-hidden bg-black"
                onPlay={() =>
                  setVideo((prevVideo) => ({
                    ...prevVideo,
                    isPlaying: true,
                  }))
                }
                onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
              >
                <source src={list.video} type="video/mp4" />
              </video>

              <div className="absolute top-5 left-5  z-10 flex flex-col gap-y-4 max-w-md text-left">
                {list.textLists.map((text, index) => (
                  <p
                    key={index}
                    className="text-white font-medium text-base bg-black bg-opacity-50 px-2 py-1 rounded"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              ></span>
            </span>
          ))}
        </div>

        <button
          className="control-btn"
          onClick={
            isLastVideo
              ? () => handleProcess("video-reset")
              : !isPlaying
              ? () => handleProcess("video-play", videoId)
              : () => handleProcess("video-pause", videoId)
          }
        >
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
