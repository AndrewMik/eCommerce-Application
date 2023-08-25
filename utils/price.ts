export function transformCentToDollar(centAmount: number) {
  return (centAmount / 100).toFixed(2);
}

export function calculateDiscountPercentage(originalPrice: number, discountedPrice: number) {
  const discount = originalPrice - discountedPrice;
  const discountPercentage = (discount / originalPrice) * 100;
  return Math.round(discountPercentage);
}
