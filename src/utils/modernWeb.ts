/**
 * Modern Web Platform utilities following Modern Web Guidance:
 * - light-dismiss-a-dialog (`closedby="any"` + bounding rect fallback)
 * - animate-to-from-top-layer (`@starting-style`, `overlay`, `allow-discrete`, + `data-closing` exit fallback)
 * - directional-navigation-transitions (`document.startViewTransition` with `types: [direction]`)
 */

let supportsDisplayTransition: boolean | undefined;

export function canTransitionDisplay(): boolean {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
  if (
    typeof window === 'undefined' ||
    !window.CSS?.supports?.('transition-behavior', 'allow-discrete') ||
    !document.body
  ) {
    return false;
  }
  const probe = document.createElement('div');
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;';
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = 'none';
  supportsDisplayTransition = getComputedStyle(probe).display === 'block';
  probe.remove();
  return supportsDisplayTransition;
}

export function supportsTopLayerExit(): boolean {
  return (
    typeof window !== 'undefined' &&
    Boolean(window.CSS?.supports?.('overlay', 'auto')) &&
    canTransitionDisplay()
  );
}

export async function closeTopLayer(element: HTMLDialogElement | null): Promise<void> {
  if (!element || !element.open) return;

  if (!supportsTopLayerExit()) {
    element.setAttribute('data-closing', '');
    const animations = element.getAnimations({ subtree: true });
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((r) => setTimeout(r, 2000)),
      ]);
    }
    if (!element.hasAttribute('data-closing')) return;
    element.removeAttribute('data-closing');
  }

  element.close();
}

export function handleDialogBackdropClickFallback(
  event: React.MouseEvent<HTMLDialogElement>,
  dialog: HTMLDialogElement | null
): void {
  if (!dialog) return;
  // Fallback for browsers without native <dialog closedby="any"> support
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const isDialogContent =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;

    if (isDialogContent) return;
    void closeTopLayer(dialog);
  }
}

export function runDirectionalViewTransition(
  updateDOM: () => void,
  direction?: 'forward' | 'backward'
): void {
  if (typeof document === 'undefined' || !('startViewTransition' in document)) {
    updateDOM();
    return;
  }

  const docWithVT = document as Document & {
    startViewTransition: (
      callbackOrOptions:
        | (() => void)
        | { update: () => void; types?: string[] }
    ) => unknown;
  };

  try {
    if (direction) {
      docWithVT.startViewTransition({
        update: updateDOM,
        types: [direction],
      });
    } else {
      docWithVT.startViewTransition(updateDOM);
    }
  } catch {
    updateDOM();
  }
}

