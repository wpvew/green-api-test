import React, { ChangeEvent, FormEvent } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
interface ITestTextAreaProps {
  text: string;
  setMessage: () => void;
  handleChangeText: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}

export function InputArea({ text, handleChangeText, handleSubmit, setMessage, isLoading }: ITestTextAreaProps) {
  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      display='flex'
      flexDirection='column'
      bgcolor='#202c33'
      p={'10px 20px'}
    >
      <LoadingButton onClick={setMessage} type='button' variant='contained' sx={{ mb: '10px' }} loading={isLoading}>
        Get Message
      </LoadingButton>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box display='flex' alignItems='center'>
          <TextField
            value={text}
            onChange={handleChangeText}
            placeholder='Type a message'
            sx={{
              flexGrow: 1,
              backgroundColor: '#2a3942',
              border: 'none',
              borderRadius: '8px',
              input: { color: 'white' },
              ':placeholder': {
                color: 'white',
              },
            }}
          />
          <Button type='submit'>Send</Button>
        </Box>
      </Box>
    </Box>
  );
}
