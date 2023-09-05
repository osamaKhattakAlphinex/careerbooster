import React, { useEffect } from "react";

const Confetti = () => {
  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const maxConfettis = 150;
    const possibleColors = [
      "DodgerBlue",
      "OliveDrab",
      "Gold",
      "Pink",
      "SlateBlue",
      "LightBlue",
      "Gold",
      "Violet",
      "PaleGreen",
      "SteelBlue",
      "SandyBrown",
      "Chocolate",
      "Crimson",
    ];

    const randomFromTo = (from, to) => {
      return Math.floor(Math.random() * (to - from + 1) + from);
    };

    const confettiParticle = () => {
      const x = Math.random() * W; // x
      const y = Math.random() * H - H; // y
      const r = randomFromTo(11, 33); // radius
      const d = Math.random() * maxConfettis + 11;
      const color =
        possibleColors[Math.floor(Math.random() * possibleColors.length)];
      let tilt = Math.floor(Math.random() * 33) - 11;
      const tiltAngleIncremental = Math.random() * 0.07 + 0.05;
      let tiltAngle = 0;

      const draw = () => {
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        context.beginPath();
        context.lineWidth = r / 2;
        context.strokeStyle = color;
        context.moveTo(x + tilt + r / 3, y);
        context.lineTo(x + tilt, y + tilt + r / 5);
        return context.stroke();
      };

      return { x, y, r, d, color, tilt, tiltAngleIncremental, tiltAngle, draw };
    };

    const Draw = () => {
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, W, window.innerHeight);

      const particles = [];
      for (let i = 0; i < maxConfettis; i++) {
        particles.push(confettiParticle());
      }

      let particle = {};
      for (let i = 0; i < maxConfettis; i++) {
        particle = particles[i];

        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

        if (particle.y <= H) {
          const canvas = document.getElementById("canvas");
          const context = canvas.getContext("2d");
          context.beginPath();
          context.lineWidth = particle.r / 2;
          context.strokeStyle = particle.color;
          context.moveTo(
            particle.x + particle.tilt + particle.r / 3,
            particle.y
          );
          context.lineTo(
            particle.x + particle.tilt,
            particle.y + particle.tilt + particle.r / 5
          );
          context.stroke();
        }

        if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
          particle.x = Math.random() * W;
          particle.y = -30;
          particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
      }

      requestAnimationFrame(Draw);
    };

    const canvas = document.getElementById("canvas");
    canvas.width = W;
    canvas.height = H;

    // Initialize
    canvas.width = W;
    canvas.height = H;
    Draw();

    window.addEventListener(
      "resize",
      function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      },
      false
    );
  }, []);

  return <canvas id="canvas"></canvas>;
};

export default Confetti;
