/**
 * Device capability detection for PRINCE.OS
 * Differentiates mobile/touch devices from desktop environments
 * to manage virtual keyboard behavior and autofocus appropriately.
 */

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // Check if primary pointer is coarse (finger/touchscreen)
  const isCoarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  
  // Check touch points
  const hasTouch = 'ontouchstart' in window || (navigator.maxTouchPoints > 0);
  
  // Screen width threshold for mobile/tablet portrait
  const isNarrowScreen = window.innerWidth <= 820;

  return isCoarse || (hasTouch && isNarrowScreen);
}
