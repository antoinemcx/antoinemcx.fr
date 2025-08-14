/**
 * Uses View Transition API to animate an appearance switch.
 * If the browser is set to reduced motion, the effect will not be applied.
 *
 * The View Transition API captures all DOM states and smoothly transitions
 * between the state changes.
 *
 * @param toggleFunction - A function that toggles the appearance state
 * @see https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
 */
export function useAnimateAppearance(toggleFunction: () => void) {
  /* Check if browser supports and enabled View Transition API */
  const transitionsEnabled = document
    && document.startViewTransition !== undefined
    && window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  if (!transitionsEnabled) {
    toggleFunction();
  }

  document.startViewTransition(async () => {
    toggleFunction();
    await nextTick();
  });
}
