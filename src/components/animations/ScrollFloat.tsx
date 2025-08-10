import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollFloatProps {
  children: React.ReactNode;
  y?: number; // total translateY range
  x?: number; // total translateX range
  scaleFrom?: number;
  scaleTo?: number;
  rotation?: number;
  ease?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  className?: string;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  y = 60,
  x = 0,
  scaleFrom = 1,
  scaleTo = 1,
  rotation = 0,
  ease = 'power2.out',
  start = 'top bottom',
  end = 'bottom top',
  scrub = true,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { y, x: -x, scale: scaleFrom, rotate: -rotation },
        {
          y: -y,
          x,
          scale: scaleTo,
          rotate: rotation,
          ease,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            scrub,
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [x, y, scaleFrom, scaleTo, rotation, ease, start, end, scrub]);

  return <div ref={ref} className={className}>{children}</div>;
};

export default ScrollFloat;


