import React, { ChangeEvent, FormEvent } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import ReactInputMask from 'react-input-mask';

interface ICreateChatProps {
  value: string;
  errMsg: string;
  onChange: (e: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export function CreateChat({ value, onSubmit, onChange, errMsg }: ICreateChatProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper sx={{ p: '30px' }}>
        <Typography marginBottom='20px'>Введите номер телефона получателя</Typography>
        <Box component='form' onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
          <ReactInputMask
            style={{
              padding: '16px 14px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid',
              fontSize: '16px',
              backgroundColor: '#2a3942',
              borderStyle: 'none',
              color: 'white',
            }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            mask={'+7(999) 999-99-99'}
            maskChar={'_'}
            placeholder={'Type a phone'}
          />
          <Button sx={{ py: '10px' }}>Создать чат</Button>
        </Box>
        {errMsg && <Typography>{errMsg}</Typography>}
      </Paper>
    </Box>
  );
}
