import { useEffect, useRef, useState } from 'react';
import type { SceneBackground, SceneColors } from '../lib/scene-background';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import type { Theme } from '../hooks/useTheme';

type RGB = [number, number, number];

function readVar(name: string): RGB {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parts = raw.split(/[\s,]+/).map(Number);
  if (parts.length >= 3 && parts.every((n) => !Number.isNaN(n))) {
    return [parts[0] / 255, parts[1] / 255, parts[2] / 255];
  }
  return [0, 0, 0];
}

function readColors(): SceneColors {
  return {
    bg: readVar('--bg'),
    accent: readVar('--accent'),
    accent2: readVar('--accent2'),
  };
}

export function Background({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<SceneBackground | null>(null);
  const reducedRef = useRef(false);
  const [fallback, setFallback] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // Lazy-load Three.js and set up the scene once.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let teardown = () => {};

    import('../lib/scene-background')
      .then(({ SceneBackground }) => {
        if (cancelled || !canvasRef.current) return;

        const engine = new SceneBackground(canvasRef.current);
        if (!engine.init()) {
          setFallback(true);
          return;
        }
        engineRef.current = engine;
        engine.setColors(readColors());
        engine.setMotion(!reducedRef.current);

        let ticking = false;
        const onScroll = () => {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(() => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            engine.setScroll(max > 0 ? window.scrollY / max : 0);
            ticking = false;
          });
        };
        const onResize = () => engine.resize();
        const onVisibility = () => (document.hidden ? engine.stop() : engine.start());

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', onVisibility);
        onScroll();

        teardown = () => {
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onResize);
          document.removeEventListener('visibilitychange', onVisibility);
          engine.dispose();
        };
      })
      .catch(() => setFallback(true));

    return () => {
      cancelled = true;
      teardown();
      engineRef.current = null;
    };
  }, []);

  // React to reduced-motion changes.
  useEffect(() => {
    reducedRef.current = reducedMotion;
    engineRef.current?.setMotion(!reducedMotion);
  }, [reducedMotion]);

  // Re-read palette after a theme change (rAF ensures CSS vars are applied).
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    const id = requestAnimationFrame(() => engine.setColors(readColors()));
    return () => cancelAnimationFrame(id);
  }, [theme]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      {fallback ? (
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(120% 80% at 20% 10%, rgb(var(--accent)/0.18), transparent 60%),' +
              'radial-gradient(120% 80% at 85% 90%, rgb(var(--accent2)/0.14), transparent 60%),' +
              'rgb(var(--bg))',
          }}
        />
      ) : (
        <canvas ref={canvasRef} className="h-full w-full" />
      )}
      {/* Legibility scrim: keeps text crisp over the 3D scene. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 90% at 50% 40%, transparent 30%, rgb(var(--bg)/0.55) 100%)',
        }}
      />
    </div>
  );
}
