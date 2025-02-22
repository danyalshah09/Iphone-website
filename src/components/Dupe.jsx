import React, { useRef, useState, useEffect } from "react";
import { hightlightsSlides } from "../constants";
import { gsap } from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

const Dupe = () => {
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
        invalidateOnRefresh: true,
        onComplete: () => {
          setVideo((prev) => ({
            ...prev,
            startPlay: true,
          }));
        },
      },
    });

    if (loadedData.length === hightlightsSlides.length) {
      if (isPlaying) {
        videoRef.current[videoId]?.play();
      } else {
        videoRef.current[videoId]?.pause();
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
    let currentVideo = videoRef.current[videoId];
  
    if (span[videoId] && currentVideo) {
      const videoDuration = currentVideo.duration || 1; // Prevent division by zero
  
      let anim = gsap.to(span[videoId], {
        width: "100%",
        duration: videoDuration, // Set GSAP animation duration equal to the video's duration
        ease: "linear",
        backgroundColor: "white",
        onComplete: () => {
          gsap.to(videoDivRef.current[videoId], { width: "12px" });
          gsap.to(span[videoId], { backgroundColor: "#afafaf" });
        },
      });
  
if(videoId===0)   {
  anim.restart()
} 
const animUpdate =() =>{
  anim.progress(videoRef.current[videoId]/hightlightsSlides[videoId].videoDuration)
}

}
if(isPlaying){
gsap.ticker.add(animUpdate)}
else{
  gsap.ticker.re
}
  }, [videoId, startPlay]);
  

  const handleProcess = (type, i) => {
    if (type === "video-play") {
      videoRef.current[i]?.play();
      gsap.to(videoSpanRef.current[i], { width: "0%" }); // Reset progress bar
      setVideo((prev) => ({ ...prev, isPlaying: true, videoId: i }));
    } else if (type === "video-pause") {
      videoRef.current[i]?.pause();
      gsap.killTweensOf(videoSpanRef.current[i]); // Pause animation
      setVideo((prev) => ({ ...prev, isPlaying: false }));
    } else if (type === "video-reset") {
      videoRef.current[0]?.play();
      gsap.to(videoSpanRef.current[0], { width: "0%" }); // Reset progress bar
      setVideo({ isEnd: false, startPlay: true, videoId: 0, isLastVideo: false, isPlaying: true });
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
                onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                onEnded={() => setVideo((prev) => ({ ...prev, isEnd: true }))}
              >
                <source src={list.video} type="video/mp4" />
              </video>

              <div className="absolute top-5 left-5 z-10 flex flex-col gap-y-4 max-w-md text-left">
                {list.textLists.map((text, index) => (
                  <p key={index} className="text-white font-medium text-base bg-black bg-opacity-50 px-2 py-1 rounded">
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
          {hightlightsSlides.map((_, i) => (
            <span
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span className="absolute h-full w-full rounded-full" ref={(el) => (videoSpanRef.current[i] = el)}></span>
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

export default Dupe;
