import React from 'react';
import { Typography } from '@mui/material';

interface IErrorMsgProps {
  text: string;
  textAlign?: 'center' | 'start' | 'end';
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
}

export function ErrorMsg(props: IErrorMsgProps) {
  const { text, textAlign = 'start', top = 'auto', left = 'auto', right = 'auto', bottom = 'auto' } = props;

  const style = {
    position: 'absolute',
    top,
    left,
    right,
    bottom,
    textAlign: textAlign,
    fontSize: '14px',
    color: 'red',
  };

  return <Typography sx={style}>{text}</Typography>;
}
