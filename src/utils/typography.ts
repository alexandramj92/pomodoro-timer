import { TypographyVariants } from "@mui/material";
import { TypographyStyleOptions } from "@mui/material/styles/createTypography";

import { breakpoints } from "./breakpoints";

export type MuiVariants = keyof Pick<
  TypographyVariants,
  "h1" | "h2" | "h3" | "button" | "caption" | "overline"
>;
export type SeeTicketsVariants =
  | "bigStat"
  | "stat"
  | "h4"
  | "subtitle"
  | "p"
  | "small"
  | "label";

export const fontFamily = ["Poppins", "sans-serif"].join();

export const allVariants: Record<string, TypographyStyleOptions> = {
  h1: {
    fontFamily,
    fontSize: "4rem",
    letterSpacing: 0,
    fontWeight: 700,
    [`@media (max-width:${breakpoints.sm}px)`]: {
      fontSize: "2.25rem",
    },
  },
  h2: {
    fontFamily,
    fontSize: "2.286rem",
    letterSpacing: 0,
    fontWeight: 500,
    [`@media (max-width:${breakpoints.sm}px)`]: {
      fontSize: "2rem",
    },
  },
  p: {
    fontFamily,
    fontSize: "1rem",
    letterSpacing: 0,
    fontWeight: 500,
    [`@media (max-width:${breakpoints.sm}px)`]: {
      fontSize: ".714rem",
    },
  },
};
