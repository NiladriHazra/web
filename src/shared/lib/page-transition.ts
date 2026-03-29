type PageTransitionListener = () => void;

const pageTransitionState = {
  active: false,
};

const pageTransitionListeners = new Set<PageTransitionListener>();

function emitPageTransitionChange() {
  pageTransitionListeners.forEach((listener) => listener());
}

export function activatePageTransition() {
  if (pageTransitionState.active) return;

  pageTransitionState.active = true;
  emitPageTransitionChange();
}

export function deactivatePageTransition() {
  if (!pageTransitionState.active) return;

  pageTransitionState.active = false;
  emitPageTransitionChange();
}

export function subscribeToPageTransition(listener: PageTransitionListener) {
  pageTransitionListeners.add(listener);

  return () => {
    pageTransitionListeners.delete(listener);
  };
}

export function getPageTransitionSnapshot() {
  return pageTransitionState.active;
}
