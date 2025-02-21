import React, { useRef, useState, useEffect } from "react";
import { hightlightsSlides } from "../constants";
import { gsap } from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";

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

  const [loadedData, setLoadedData] = useState([]); // FIXED: Initialized properly

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  useEffect(() => {
    if (loadedData.length > 3) {
      if (isPlaying) {
        videoRef.current[videoId]?.pause();
      } else {
        startPlay && videoRef.current[videoId]?.play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]); // FIXED: Corrected dependencies

  useEffect(() => {
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // Animate the progress of the video
      gsap.to(span[videoId], {
        onUpdate: () => {
          // Handle progress bar animation
        },
        onComplete: () => {
          // Handle next video
        },
      });
    }
  }, [videoId, startPlay]); // FIXED: Corrected condition

const handleProcess = (type,i) =>{
  switch (type) {
    case 'video-end':
      setVideo((prevVideo) => ({...prevVideo,isEnd: true, videoId:i+1}))
      break;
  
      case 'video-last':
        setVideo((prevVideo) => ({...prevVideo,isLastVideo: true}))
        break;


        case 'video-reset':
        setVideo((prevVideo) => ({...prevVideo,isLastVideo: false,videoId:0}))
        break;

        case 'play':
          setVideo((prevVideo) => ({...prevVideo,isPlaying: !prevVideo.isPlaying}))
          break;
  
    default:
      break;
  }
}



  return (
  <>
    <div className="flex items-center">
      {hightlightsSlides.map((list, i) => (
        <div key={list.id} id="slider" className="sm:pr-20 pr-10 relative">
          <div className="video-carousel_container">
            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black"></div>
            <video
              id="video"
              ref={(el) => (videoRef.current[i] = el)}
              playsInline
              preload="auto"
              muted
              onPlay={() =>
                setVideo((prevVideo) => ({
                  ...prevVideo,
                  isPlaying: true,
                }))
              }
            >
              <source src={list.video} type="video/mp4" />
            </video>
          </div>

          <div className="absolute top-12 left-[5%] z-10 flex flex-col gap-y-4 max-w-md">
            {list.textLists.map((text, index) => (
              <p key={index} className="text-white font-medium text-base">
                {text}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>

  <div className="relative flex-center mt-10">
    <div className="flex-center py-5 px-7 bg-gray-300 rounded-full">
  {videoRef.current.map((_,i)=>(
    <span className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
    key={i}
    ref={(el)=> (videoDivRef.current[i]=el)}
    >

      <span className="absolute h-full w-full rounded-full" ref={(el)=> (videoSpanRef.current[i]=el)}></span>
    </span>
  ))}

    </div>

    <button className="control-btn" onClick={isLastVideo ? ()=> handleProcess('video-reset') :
        !isPlaying ? ()=> handleProcess('video-play') : ()=> handleProcess('video-pause')
          
          }>
      <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'


      } 
      
      
      />
    </button>
  </div>
  </>

  );
};

export default VideoCarousel;
