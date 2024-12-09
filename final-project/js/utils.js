/**
 * Get the current selection.
 * @returns {number} The index of the current selection.
 */
export function getCurrentSelection() {
  const storedSelection = localStorage.getItem("currentSelection");
  return storedSelection;
}

/**
 * Set the current selection.
 * @param {number} index - The index to set as the current selection.
 */
export function setCurrentSelection(index) {
  localStorage.setItem("currentSelection", index);
}
