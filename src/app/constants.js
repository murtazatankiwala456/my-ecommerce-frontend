export const ITEMS_PER_PAGE = 6;
export function discountedPrice(item) {
  const discountPercentage = item.discountPercentage || 0; // Ensure discountPercentage is defined or default to 0
  return Math.round(item.price * (1 - item.discountPercentage / 100));
}
