/**
 * Overlay and Modal Management for PRINCE.OS
 * Manages modal dialogs, lightbox zooms, certificate viewers, and mascot guides
 * with seamless Android hardware/gesture Back and browser history integration.
 */

export interface OverlayEntry {
  id: string;
  dismiss: () => void;
}

class OverlayManager {
  private stack: OverlayEntry[] = [];
  private programmaticBackCount = 0;
  private isPopStateClosing = false;

  /**
   * Register an overlay when it mounts / opens.
   * Pushes a history entry to support Android Back without screen exit.
   */
  public register(id: string, dismiss: () => void): () => void {
    // If already registered with this id, update the dismiss function
    const existingIndex = this.stack.findIndex((item) => item.id === id);
    if (existingIndex !== -1) {
      this.stack[existingIndex].dismiss = dismiss;
      return () => this.unregister(id);
    }

    this.stack.push({ id, dismiss });

    // Push history entry for this overlay
    if (typeof window !== 'undefined') {
      window.history.pushState(
        { isOverlay: true, overlayId: id },
        '',
        window.location.hash || window.location.pathname
      );
    }

    return () => this.unregister(id);
  }

  /**
   * Unregister an overlay when it unmounts or closes via UI (close button / ESC).
   */
  public unregister(id: string): void {
    const index = this.stack.findIndex((item) => item.id === id);
    if (index === -1) return;

    this.stack.splice(index, 1);

    // If closed via UI (not by browser popstate), revert the history entry we pushed
    if (!this.isPopStateClosing && typeof window !== 'undefined') {
      this.programmaticBackCount++;
      window.history.back();
    }
  }

  /**
   * Handle browser popstate event.
   * Returns true if the popstate was consumed (by programmatic close or overlay dismissal),
   * or false if no overlay was open (allowing parent screen navigation to handle it).
   */
  public handlePopState(): boolean {
    if (this.programmaticBackCount > 0) {
      this.programmaticBackCount--;
      return true; // Ignored popstate from UI close
    }

    if (this.stack.length > 0) {
      this.isPopStateClosing = true;
      const topmost = this.stack.pop();
      try {
        topmost?.dismiss();
      } finally {
        this.isPopStateClosing = false;
      }
      return true; // Dismissed topmost overlay
    }

    return false; // No overlays open
  }

  /**
   * Check if any overlays are currently open.
   */
  public hasOpenOverlays(): boolean {
    return this.stack.length > 0;
  }

  /**
   * Dismiss the topmost overlay directly.
   */
  public dismissTopmost(): boolean {
    if (this.stack.length > 0) {
      const topmost = this.stack[this.stack.length - 1];
      topmost.dismiss();
      return true;
    }
    return false;
  }

  /**
   * Dismiss all currently open overlays (e.g. before navigating to a new screen).
   */
  public dismissAll(): void {
    while (this.stack.length > 0) {
      this.isPopStateClosing = true;
      const item = this.stack.pop();
      try {
        item?.dismiss();
      } finally {
        this.isPopStateClosing = false;
      }
    }
    this.programmaticBackCount = 0;
  }
}

export const overlayManager = new OverlayManager();
