import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { animateWithGsap } from "../utils/animation";
import { explore1Img, explore2Img, exploreVideo } from "../utils";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.to("#exploreVideo", {
      scrollTrigger: {
        trigger: "#exploreVideo",
        toggleActions: "play pause resume restart",
        start: "-10% bottom",
      },
      onComplete: () => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      },
    });

    animateWithGsap("#features_title", {
      y: 0,
      opacity: 1,
    });

    animateWithGsap(".g_text", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "Power2.inOut",
    });

    // Add animation for the images
    animateWithGsap(".g_grow", {
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: "power2.inOut"
    });

  }, []);

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full text-center">
          <h1 id="features_title" className="section-heading">
            Explore the full Story
          </h1>
        </div>

        <div className="mt-16 mb-12 text-center">
          <h2 className="text-5xl font-semibold lg:text-7xl">iPhone.</h2>
          <h2 className="text-5xl font-semibold lg:text-7xl">
            Forged in Titanium.
          </h2>
        </div>

        {/* Video */}
        <div className="w-full h-[50vh] mb-10">
          <video
            playsInline
            id="exploreVideo"
            className="w-full h-full object-cover rounded-lg shadow-lg"
            preload="none"
            muted
            autoPlay
            ref={videoRef}
          >
            <source src={exploreVideo} type="video/mp4" />
          </video>
        </div>

        {/* Images & Text */}
        <div className="flex flex-col md:flex-row items-center gap-8 w-full">
          {/* Left Image & Text */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-[500px] h-[500px] overflow-hidden">
              <img
                src={explore1Img}
                alt="titanium"
                className="w-full h-full object-cover rounded-lg shadow-lg g_grow opacity-0 scale-95"
              />
            </div>
            <p className="feature-text g_text text-center mt-4 text-lg">
              iPhone 15 Pro is{" "}
              <span className="text-white">
                The first iPhone to feature an aerospace-grade titanium design
              </span>
              , using the same alloy that spacecraft use for missions to Mars.
            </p>
          </div>

          {/* Right Image & Text */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-[500px] h-[500px] overflow-hidden">
              <img
                src={explore2Img}
                alt="titanium2"
                className="w-full h-full object-cover rounded-lg shadow-lg g_grow opacity-0 scale-95"
              />
            </div>
            <p className="feature-text g_text text-center mt-4 text-lg">
              Titanium has one of the best strength-to-weight ratios of any
              metal, making these our{" "}
              <span className="text-white">lightest Pro models ever</span>. You'll
              notice the difference the moment you pick one up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;