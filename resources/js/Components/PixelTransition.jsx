import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './PixelTransition.css';

function PixelTransition({
  firstContent,
  secondContent,
  contentArray,
  gridSize = 12,
  pixelColor = 'currentColor',
  animationStepDuration = 0.3,
  autoPlayInterval = 3000,
  once = false,
  aspectRatio = '100%',
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const pixelGridRef = useRef(null);
  const activeRef = useRef(null);
  const delayedCallRef = useRef(null);

  const [isActive, setIsActive] = useState(false);
  const [curIndex, setCurIndex] = useState(0);

  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;

  const currentFirst = contentArray ? contentArray[curIndex] : firstContent;
  const currentSecond = contentArray ? contentArray[(curIndex + 1) % contentArray.length] : secondContent;

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = '';

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelated-image-card__pixel');
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  const animatePixels = activate => {
    setIsActive(activate);

    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    const pixels = pixelGridEl.querySelectorAll('.pixelated-image-card__pixel');
    if (!pixels.length) return;

    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) {
      delayedCallRef.current.kill();
    }

    gsap.set(pixels, { display: 'none' });

    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;

    gsap.to(pixels, {
      display: 'block',
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });

    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      activeEl.style.display = activate ? 'block' : 'none';
      activeEl.style.pointerEvents = activate ? 'none' : '';
    });

    gsap.to(pixels, {
      display: 'none',
      duration: 0,
      delay: animationStepDuration,
      stagger: {
        each: staggerDuration,
        from: 'random'
      }
    });
  };

  useEffect(() => {
    if (!contentArray || contentArray.length === 0) return;

    const interval = setInterval(() => {
      animatePixels(true);

      // Wait for animation to fully complete (step duration + stagger time + a bit buffer)
      // Stagger is negligible for total time since it runs concurrentlyish? 
      // Max delay is animationStepDuration + (staggerDuration * totalPixels) which is ~ animationStepDuration + animationStepDuration = 2x
      // Actually GSAP stagger logic: duration 0, staggered start. Last one starts at animationStepDuration.
      // Then second tween starts at animationStepDuration.
      // Total time approx 2 * animationStepDuration.

      setTimeout(() => {
        setCurIndex(prev => (prev + 1) % contentArray.length);
        setIsActive(false);
        if (activeRef.current) {
          activeRef.current.style.display = 'none';
        }
      }, (animationStepDuration * 2 * 1000) + 1200);

    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [contentArray, autoPlayInterval, animationStepDuration]);

  const handleEnter = () => {
    if (!isActive && !contentArray) animatePixels(true);
  };
  const handleLeave = () => {
    if (isActive && !once && !contentArray) animatePixels(false);
  };
  const handleClick = () => {
    if (contentArray) return;
    if (!isActive) animatePixels(true);
    else if (isActive && !once) animatePixels(false);
  };

  return (
    <div
      ref={containerRef}
      className={`pixelated-image-card ${className}`}
      style={style}
      onMouseEnter={!isTouchDevice ? handleEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
      onFocus={!isTouchDevice ? handleEnter : undefined}
      onBlur={!isTouchDevice ? handleLeave : undefined}
      tabIndex={0}
    >
      <div style={{ paddingTop: aspectRatio }} />
      <div className="pixelated-image-card__default" aria-hidden={isActive}>
        {currentFirst}
      </div>
      <div className="pixelated-image-card__active" ref={activeRef} aria-hidden={!isActive} style={{ display: 'none' }}>
        {currentSecond}
      </div>
      <div className="pixelated-image-card__pixels" ref={pixelGridRef} />
    </div>
  );
}

export default PixelTransition;
