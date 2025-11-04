import React, { useCallback, useMemo } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";
import usePerformanceMode from "@/hooks/usePerformanceMode";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const { lowPerf, reducedMotion, isMobile } = usePerformanceMode();

  // Derive throttled settings
  const settings = useMemo(() => {
    const base = {
      linksDistance: 160,
      speed: 1.2,
      number: 80,
      linkOpacity: 0.3,
      connectDistance: 150,
      connectRadius: 100,
    };
    if (lowPerf) {
      return {
        linksDistance: 120,
        speed: 0.6,
        number: 35,
        linkOpacity: 0.2,
        connectDistance: 100,
        connectRadius: 60,
      };
    }
    return base;
  }, [lowPerf]);

  if (reducedMotion) {
    // Respect OS-level reduced motion
    return null;
  }

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
            distance: settings.linksDistance, // tuned per device
            enable: true,
            opacity: settings.linkOpacity,
            width: 1
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out", // Changed from "bounce" to "out" for smoother transitions
            },
            random: true,
            speed: settings.speed,
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
              area: 700, // keep area constant
            },
            value: settings.number,
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
            onHover: lowPerf ? { enable: false } : { enable: true, mode: "connect" },
            onClick: {
              enable: false,
              mode: "push"
            },
            resize: true
          },
          modes: {
            connect: {
              distance: settings.connectDistance, // tuned per device
              links: {
                opacity: lowPerf ? 0.3 : 0.5 // tuned per device
              },
              radius: settings.connectRadius // tuned per device
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
  zIndex: 0,
  pointerEvents: "none"
      }}
    />
  );
};

export default ParticleBackground;
