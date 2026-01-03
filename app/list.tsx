"use client";

import Star from '@/public/star.svg';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';



export const SpinningStar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const speedRef = useRef(20); // degrees per second

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let lastTime = performance.now();
    let animationId: number;

    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000; // seconds
      lastTime = currentTime;

      rotationRef.current += speedRef.current * delta;
      el.style.transform = `rotate(${rotationRef.current}deg)`;

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const maxDistance = 400;
      const minSpeed = 20;  // degrees per second when far
      const maxSpeed = 360; // degrees per second when close

      // Closer = faster
      const newSpeed = distance > maxDistance
        ? minSpeed
        : maxSpeed - (maxSpeed - minSpeed) * (distance / maxDistance);

      speedRef.current = newSpeed;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={ref} className="">
      <Image src={Star} alt="" width={32} height={32} />
    </div>
  );
}
