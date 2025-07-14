// Model.jsx
import { useGSAP } from "@gsap/react";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { yellowImg } from "../utils";
import * as THREE from "three";
import ModelView from "./ModelView";
import { Canvas } from "@react-three/fiber";
import { models, sizes } from "../constants";
import { animationWithGsapTimeline } from "../utils/animation";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();
  const small = useRef();
  const large = useRef();
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  useEffect(() => {
    if (!small.current || !large.current) return;

    const tl = gsap.timeline();

    if (size === "large") {
      // Hide small model
      gsap.to(small.current.position, {
        x: "-100%",
        duration: 0.8,
        ease: "power2.inOut"
      });

      // Show large model
      gsap.to(large.current.position, {
        x: 0,
        duration: 0.8,
        ease: "power2.inOut"
      });
    } else {
      // Hide large model
      gsap.to(large.current.position, {
        x: 10,
        duration: 0.8,
        ease: "power2.inOut"
      });

      // Show small model
      gsap.to(small.current.position, {
        x: 0,
        duration: 0.8,
        ease: "power2.inOut"
      });
    }
  }, [size]);

  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a Closer Look
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <Canvas
              className="w-full h-full"
              camera={{ position: [0, 0, 8], fov: 75 }}
            >
              <ModelView
                index={1}
                groupRef={small}
                gsapType="view1"
                controlRef={cameraControlSmall}
                setRotation={setSmallRotation}
                item={model}
                size={size}
                isVisible={size === "small"}
              />
              <ModelView
                index={2}
                groupRef={large}
                gsapType="view2"
                controlRef={cameraControlLarge}
                setRotation={setLargeRotation}
                item={model}
                size={size}
                isVisible={size === "large"}
              />
            </Canvas>
          </div>

          <div className="ms-auto w-full">
            <p className="text-sm font-light text-center mb-5">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    onClick={() => setModel(item)}
                    style={{ backgroundColor: item.color[0] }}
                  />
                ))}
              </ul>
              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? 'white' : 'transparent',
                      color: size === value ? 'black' : 'white'
                    }}
                    onClick={() => {
                      setSize(value);
                      if (value === "large") {
                        setModel({
                          title: "iPhone 15 Pro Max",
                          color: ["#1C1C1E", "#D4AF37", "#C0C0C0"],
                          img: yellowImg,
                        });
                      } else {
                        setModel({
                          title: "iPhone 15 Pro",
                          color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
                          img: yellowImg,
                        });
                      }
                    }}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;