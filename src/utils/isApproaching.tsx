export const isApproaching = (
  prevDistance: number,
  currentDistance: number
): boolean => {
  return currentDistance < prevDistance;
};
