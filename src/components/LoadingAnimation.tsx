import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LoadingAnimation: React.FC<{ topic?: string; message?: string }> = ({ topic, message }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Prevent double initialization (React StrictMode)
    if (rendererRef.current) return;

    // Clear any existing canvas elements
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    // Scene Setup
    const width = 300;
    const height = 300;
    const scene = new THREE.Scene();
    // Fix: Aspect ratio must match the renderer size (300/300 = 1) to avoid distortion (egg shape)
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Geometry: Particle Sphere
    const particleCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xf5d0fe); // Pastel Purple
    const color2 = new THREE.Color(0xe0f2fe); // Pastel Blue

    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 1.5 + (Math.random() * 0.2); // Base radius + slight fuzziness

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Mix colors
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Material
    const material = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 4;

    // Interactive Mouse Tracking
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    // Animation Loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      time += 0.005;

      // Rotate the whole cluster
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.001;

      // Mouse influence
      particles.rotation.x += mouseRef.current.y * 0.05;
      particles.rotation.y += mouseRef.current.x * 0.05;

      // "Breathing" / Magnetic effect
      // We can slightly scale the object to simulate pulse
      const pulse = 1 + Math.sin(time * 2) * 0.05;
      particles.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Cancel animation frame
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      // Remove event listener
      window.removeEventListener('mousemove', handleMouseMove);

      // Clean up Three.js resources
      if (rendererRef.current) {
        if (containerRef.current && rendererRef.current.domElement.parentNode === containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        geometry.dispose();
        material.dispose();
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in h-full">
      <div ref={containerRef} className="w-[300px] h-[300px]" />
      <p className="text-xl font-medium text-white mt-4 animate-pulse text-center max-w-md px-4">
        {message || `Synthesizing Knowledge about ${topic}...`}
      </p>
    </div>
  );
};

export default LoadingAnimation;