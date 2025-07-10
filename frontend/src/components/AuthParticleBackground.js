import React, { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";

const AuthParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles-auth"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: false,
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: "#0066cc", // IEEE blue color
          },
          links: {
            color: "#0066cc",
            distance: 170,
            enable: true,
            opacity: 0.2,
            width: 1
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: 1.0,
            straight: false,
            trail: {
              enable: false,
              length: 10,
              fillColor: "#080D14"
            },
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 70,
          },
          opacity: {
            value: 0.7,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
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
              distance: 180,
              links: {
                opacity: 0.3
              },
              radius: 120
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
        pointerEvents: "none" // Ensures clicks go through to elements beneath
      }}
    />
  );
};

export default AuthParticleBackground;
