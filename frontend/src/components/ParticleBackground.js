import React, { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false,
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 160, // Increased link distance slightly for better connections
            enable: true,
            opacity: 0.3,
            width: 1
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out", // Changed from "bounce" to "out" for smoother transitions
            },
            random: true,
            speed: 1.2, // Slightly increased speed for more dynamic movement
            straight: true,
            trail: {
              enable: false,
              length: 10,
              fillColor: "#000000"
            },
          },
          number: {
            density: {
              enable: true,
              area: 700, // Reduced area to increase particle density
            },
            value: 80, // Increased number of particles to fill empty spaces
          },
          opacity: {
            value: 1,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 2 },
          },
        },
        detectRetina: true,
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: {
              enable: true,
              mode: "connect"
            },
            onClick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            connect: {
              distance: 150, // Increased connection distance
              links: {
                opacity: 0.5 // Slightly more visible connections
              },
              radius: 100 // Larger radius for mouse connection effect
            },
            push: {
              quantity: 4
            }
          }
        },
        background: {
          color: "transparent",
          image: "",
          position: "50% 50%",
          repeat: "no-repeat",
          size: "cover"
        }
      }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 0
      }}
    />
  );
};

export default ParticleBackground;
