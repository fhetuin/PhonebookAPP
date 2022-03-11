import { colors } from './variables';

export const light = {
  colors: {
    primary: `radial-gradient(
      at top left,
      rgb(255, 255, 255) 0%,
      rgb(197, 197, 197) 100%
    )`,
    secondary: colors.gray800,
    border: colors.gray400
  }
};

export const dark = {
  colors: {
    primary: `radial-gradient(
      at top left,
      rgb(0, 0, 0) 0%,
      rgb(105, 105, 105) 100%
    )`,
    secondary: colors.white,
    border: colors.gray800
  }
};
