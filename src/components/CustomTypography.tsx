import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';
import { FC, ReactNode } from 'react';

import { allVariants, MuiVariants, SeeTicketsVariants } from '../utils/typography';

type MuiProps = Omit<MuiTypographyProps, 'variant'>;

export interface TypographyProps extends MuiProps {
  variant?: MuiVariants | SeeTicketsVariants;
  children: ReactNode;
}

const muiVariantsNames: MuiVariants[] = ['h1', 'h2', 'h3', 'button', 'caption', 'overline'];

export const CustomTypography: FC<TypographyProps> = ({ variant = 'p', children, sx, ...rest }) => {
  const muiVariant = muiVariantsNames.includes(variant as MuiVariants) ? (variant as MuiVariants) : undefined;
  const customStyle = allVariants[variant];

  const style = { ...customStyle, ...sx };

  return (
    <MuiTypography variant={muiVariant} sx={style} {...rest}>
      {children}
    </MuiTypography>
  );
};
