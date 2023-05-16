import * as React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps, MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link, { LinkProps } from '@mui/material/Link';
import LinkBehavior from './LinkBehavior';

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location='/'>{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

interface ILinkRouterWithThemeProps {
  children: React.ReactNode;
  href: string;
  variant?: 'contained' | 'outlined' | 'text';
}

export default function LinkRouterWithTheme(props: ILinkRouterWithThemeProps) {
  const { children, href, variant = 'text' } = props;
  return (
    <Stack sx={{ typography: 'body1' }} alignItems='center' spacing={1} width={1}>
      <ThemeProvider theme={theme}>
        <Button
          href={href}
          variant={variant}
          fullWidth
          sx={{ alignItems: 'flex-start', justifyContent: 'flex-start', p: 0 }}
        >
          {children}
        </Button>
      </ThemeProvider>
    </Stack>
  );
}
