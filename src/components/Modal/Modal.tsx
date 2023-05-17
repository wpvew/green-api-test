import { Box, Paper } from '@mui/material';
import React from 'react';

interface IModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: IModalProps) => {
  const style = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Box sx={style}>
      <Paper sx={{ minHeight: '100px', minWidth: '200px', p: '30px', position: 'relative' }}>{children}</Paper>
    </Box>
  );
};

export default Modal;
