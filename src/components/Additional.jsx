import React, { useRef } from "react";
import { chipImg, frameImg, frameVideo } from "../utils"; // Ensure frameVideo is imported
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { animateWithGsap } from "../utils/animation";

gsap.registerPlugin(ScrollTrigger); // ✅ Register ScrollTrigger

const Additional = () => {
  const videoRef = useRef();
  const textRef = useRef(); // ✅ Add ref for text animation

  useGSAP(() => {
    gsap.from("#chip", {
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
        toggleActions: "play none none none",
      },
    });

    gsap.from(textRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        {/* Chip Image */}
        <div className="flex-center w-full" id="chip">
          <img src={chipImg} alt="chip" width={180} height={190} />
        </div>

        {/* Title & Subtitle */}
        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            A17 PRO chip.
            <br />
            A monster for gaming.
          </h2>
          <p className="hiw-subtitle">
            It's here. The biggest redesign in the history of GPUs.
          </p>
        </div>

        {/* Frame Image & Video */}
        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img
                src={frameImg}
                alt="frame"
                className="bg-transparent relative z-10"
              />
            </div>
            <div className="hiw-video">
              <video
                src={frameVideo}
                type="video/mp4"
                className="pointer-events-none"
                playsInline
                autoPlay
                muted
                loop
                preload="none"
                ref={videoRef}
              />
            </div>
          </div>
          <p className="text-gray font-semibold text-center mt-3">
            Honkai: Star Rail
          </p>
        </div>

        {/* Updated Text */}
        <div className="text-center mt-4">
          <p className="hiw-text text-lg font-semibold">
            A17 Pro is an entirely new class of iPhone chip that delivers our <span className="font-bold">best graphics performance by far.</span>
          </p>
          <p className="hiw-text text-lg mt-2">
            Mobile <span className="font-bold">games will look and feel so immersive</span>, with incredibly detailed environments and more realistic characters. And with industry-leading speed and efficiency, A17 Pro takes fast and runs with it.
          </p>
        </div>

        {/* Additional Text */}
        <div className="flex flex-1 justify-center flex-col text-center mt-6">
          <p className="hiw_text text-lg text-blue-500">New</p>
          <p className="hiw_bg_text text-2xl font-bold text-blue-600">Pro-class GPU</p>
          <p className="hiw_text text-lg text-blue-500">with 6 cores</p>
        </div>
      </div>
    </section>
  );
};

export default Additional;
