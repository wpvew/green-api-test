import React from 'react';
import { Box, ListItem, ListItemText, Typography } from '@mui/material';
import { TChatHistoryData } from '../../../../../API/ApiServer';

interface IMessageItemProps {
  data: TChatHistoryData;
}

export function MessageItem({ data }: IMessageItemProps) {
  return (
    <ListItem
      sx={{
        justifyContent: data.type === 'incoming' ? 'flex-start' : 'flex-end',
        padding: '4px 0',
      }}
    >
      <Box
        display='flex'
        maxWidth={'60%'}
        flexDirection='column'
        p='5px 12px'
        borderRadius='8px'
        bgcolor={'#202c33'}
        color={'white'}
      >
        <ListItemText
          sx={{ m: 0 }}
          primary={
            <Typography fontSize='14px' color='#8697a0' m={0}>
              {data.senderName || data.senderId?.replace(/[\D]+/g, '')}
            </Typography>
          }
        />
        <ListItemText
          primary={
            <Typography fontSize='18px' sx={{ mb: 1, lineHeight: 1 }}>
              {data.typeMessage === 'textMessage' || data.typeMessage === 'extendedTextMessage'
                ? data.textMessage
                : '[message]'}
            </Typography>
          }
          secondary={
            <Typography fontSize='14px' color='#8697a0' sx={{ lineHeight: 1, textAlign: 'end' }}>
              {data.time}
            </Typography>
          }
        />
      </Box>
    </ListItem>
  );
}
