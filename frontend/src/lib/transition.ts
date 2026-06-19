export const triggerTransition = (targetSectionId: string) => {
  const event = new CustomEvent("page-transition", { detail: { targetSectionId } });
  window.dispatchEvent(event);
};
