import React from 'react';
import { List, ListItem } from '@mui/material';
import { MessageItem } from './MessageItem';
import { TChatHistoryData } from '../MessagePanel';

interface IMessageListProps {
  messageData: Array<TChatHistoryData>;
}

export const MessageList = React.forwardRef((props: IMessageListProps, ref: React.ForwardedRef<HTMLUListElement>) => {
  const { messageData } = props;
  return (
    <List
      ref={ref}
      sx={{
        paddingX: 3,
        boxSizing: 'border-box',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ListItem sx={{ flex: '1 1 auto' }} />
      {messageData.map((message) => (
        <React.Fragment key={message.idMessage}>
          <MessageItem data={message} />
        </React.Fragment>
      ))}
    </List>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;