import React, { FormEvent } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ReactInputMask from 'react-input-mask';
import { ErrorMsg } from '../../../components/ErrorMsg/ErrorMsg';
import Modal from '../../../components/Modal/Modal';
import { createPortal } from 'react-dom';

interface ICreateChatProps {
  value: string;
  errMsg: string;
  onChange: (e: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export function CreateChat({ value, onSubmit, onChange, errMsg }: ICreateChatProps) {
  const node = document.getElementById('modal-root');
  if (!node) return null;

  return createPortal(
    <Modal>
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
        <Button type='submit' sx={{ py: '10px' }}>
          Создать чат
        </Button>
      </Box>
      {errMsg && <ErrorMsg text={errMsg} top='5px' left={0} right={0} textAlign='center' />}
    </Modal>,
    node
  );
}
