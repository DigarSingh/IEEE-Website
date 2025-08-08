import { useEffect, useMemo, useState } from "react";

// Heuristic-based performance mode detection for throttling heavy visuals
export function usePerformanceMode() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowSpecs, setLowSpecs] = useState(false);

  useEffect(() => {
    // Mobile viewport check
    const mobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
    setIsMobile(mobile);

    // Prefers reduced motion
    if (typeof window !== "undefined" && window.matchMedia) {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(media.matches);
      const onChange = () => setReducedMotion(media.matches);
      media.addEventListener?.("change", onChange);
      return () => media.removeEventListener?.("change", onChange);
    }
  }, []);

  useEffect(() => {
    // Device capabilities (best-effort)
    const memory = typeof navigator !== "undefined" && navigator.deviceMemory ? navigator.deviceMemory : undefined;
    const cores = typeof navigator !== "undefined" && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : undefined;
    // Consider low specs if <=4GB RAM or <=4 cores
    setLowSpecs((memory && memory <= 4) || (cores && cores <= 4));
  }, []);

  const lowPerf = useMemo(() => {
    // Any of these flags suggests throttling heavy animations
    return reducedMotion || isMobile || lowSpecs;
  }, [reducedMotion, isMobile, lowSpecs]);

  return { lowPerf, reducedMotion, isMobile };
}

export default usePerformanceMode;
