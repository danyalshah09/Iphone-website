import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../utils";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  useEffect(() => {
    const handleResize = () => {
      setVideoSrc(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);//cleaning event listener in react
  }, []);

  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 2,
    });
    gsap.to("#cta", {
        opacity: 1,
        y: -50,
        delay: 1.5,
      });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative" id="hero">
      <div className="h-5/6 w-full flex-center flex-col">
        <p className="hero-title">iPhone 15 Pro</p>
        <div className="md:w-10/12 w-9/12">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div id="cta" className="flex flex-col items-center opacity- translate-y-20">

    <a href="#highlights" className="btn">Buy</a>
    <p className="font-normal text-xl">From $100/month or $999</p>


      </div>
    </section>
  );
};

export default Hero;
