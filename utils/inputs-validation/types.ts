const errorPositiveNumMessage = 'The provided argument must be a positive number';

type PostalCodesKeys = 'Georgia' | 'Lithuania' | 'Poland';

type PostalCodesMapper = {
  [key in PostalCodesKeys]: RegExp;
};

const PostalCodesMap: PostalCodesMapper = {
  Georgia: /^\d{3}[ ]?\d{2}$/,
  Lithuania: /^(LT-)?\d{5}$/,
  Poland: /^\d{2}-\d{3}$/,
};

export type { PostalCodesKeys };
export { errorPositiveNumMessage, PostalCodesMap };
