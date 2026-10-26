import { useEffect, useRef } from 'react';
import { overlayManager } from '../utils/overlayManager';

/**
 * Custom hook to register any overlay (modal, lightbox, zoom preview, mascot guide)
 * with the global OverlayManager for Android system Back and browser history management.
 *
 * @param isOpen Whether the overlay is currently open
 * @param onClose Callback to dismiss the overlay
 * @param id Unique identifier for this overlay instance
 */
export function useOverlay(isOpen: boolean, onClose: () => void, id: string): void {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    const unregister = overlayManager.register(id, () => {
      onCloseRef.current();
    });

    return () => {
      unregister();
    };
  }, [isOpen, id]);
}
