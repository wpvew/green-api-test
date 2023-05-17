import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import ApiServer from '../../../API/ApiServer';

interface IServicePanelProps {
  removeChatId: () => void;
}

export function ServicePanel({ removeChatId }: IServicePanelProps) {
  const loginData = useAppSelector((state) => state.greenApiReducer.data);
  const [avatar, setAvater] = useState('');

  useEffect(() => {
    ApiServer.getSettings(loginData).then(({ data }) => {
      setAvater(data.urlAvatar);
    });
  }, []);

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='space-between'
      p='10px 5px'
      bgcolor='#1f2c33'
      boxShadow='0 0 10px 0px black'
      flexShrink={0}
    >
      <Avatar alt='avatar' src={avatar} />
      <Button onClick={removeChatId} size='small'>
        Сменить чат
      </Button>
    </Box>
  );
}
