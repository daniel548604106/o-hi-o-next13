const handleConvertDiscountPercentage = (
  fullPrice: number,
  discountPrice: number
) => {
  return discountPrice / fullPrice > 0.1
    ? `${Math.floor((discountPrice / fullPrice) * 10)}折`
    : `${Math.ceil((discountPrice / fullPrice) * 10)}折`;
};

export { handleConvertDiscountPercentage };
