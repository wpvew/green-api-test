import React from 'react';
import { Box } from '@mui/material';

interface ILayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: ILayoutProps) {
  return (
    <Box component='main' minHeight='100vh' bgcolor={'#111b21'}>
      {children}
    </Box>
  );
}
