import React, { useState } from 'react';
import { Box, CardMedia, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import { LoadingButton } from '@mui/lab';

interface IAuthPhoneProps {
  onChangeStatusLog: () => void;
}

export function AuthPhone({ onChangeStatusLog }: IAuthPhoneProps) {
  const loginData = useAppSelector((state) => state.greenApiReducer.data);
  const [qr, setQr] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingScan, setIsWaitingScan] = useState(false);

  const handleClickGetQr = () => {
    setIsLoading(true);
    const ws = new WebSocket(
      `wss://api.green-api.com/waInstance${loginData.idInstance}/scanqrcode/${loginData.apiTokenInstance}`
    );

    ws.onopen = () => {
      // console.log('websocket is open');
    };

    ws.onmessage = (response) => {
      const data = JSON.parse(response.data);
      if (data.type === 'qrCode') {
        setIsLoading(false);
        setIsWaitingScan(true);
        setQr(`data:image/png;base64,${data.message}`);
      } else {
        setIsAuth(true);
        setIsWaitingScan(false);
        ws.close();
      }
    };
    ws.onerror = (response) => {
      console.error(response);
      ws.close();
    };

    ws.onclose = () => {
      // console.log(`websocket closed`);
    };
  };

  return (
    <Box display='flex' alignItems='center' justifyContent='center' height={1}>
      <Paper sx={{ display: 'flex', flexDirection: 'column', p: '40px' }}>
        <Typography mb='10px'>Необходимо авторизовать телефон</Typography>
        {qr && <CardMedia component='img' image={qr} alt='qr code' sx={{ maxWidth: '360px', maxHeight: '360px' }} />}
        {!isWaitingScan && (
          <LoadingButton
            variant='contained'
            loading={isLoading}
            onClick={isAuth ? onChangeStatusLog : handleClickGetQr}
          >
            {isAuth ? 'Войти' : 'Получить QR code'}
          </LoadingButton>
        )}
      </Paper>
    </Box>
  );
}
