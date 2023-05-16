import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Box, Container, Typography } from '@mui/material';
import ApiServer from '../../../../API/ApiServer';
import { useAppSelector } from '../../../../store/hooks';

interface IHeaderProps {
  chatId: string;
}

export function Header({ chatId }: IHeaderProps) {
  const loginData = useAppSelector((state) => state.greenApiReducer.data);
  const [chatData, setChatData] = useState({ name: '', avatar: '' });

  useEffect(() => {
    if (chatId) {
      ApiServer.getContactInfo({ chatId }, loginData).then(({ data }) => {
        setChatData({ ...chatData, name: data.name, avatar: data.avatar });
      });
    }
  }, [chatId]);

  return (
    <AppBar position='static' sx={{ py: 1, backgroundColor: '#1f2c33', boxShadow: 'none' }}>
      <Container sx={{ m: 0 }}>
        <Box display='flex' alignItems='center'>
          <Avatar alt={chatData.name} src={chatData.avatar} />
          <Typography fontSize='22px' fontWeight='500' sx={{ paddingX: '25px' }}>
            {chatData.name}
          </Typography>
        </Box>
      </Container>
    </AppBar>
  );
}
