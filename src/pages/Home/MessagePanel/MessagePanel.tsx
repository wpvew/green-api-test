import React, { FormEvent, useEffect, useRef, useState } from 'react';
import ApiServer, { TChatHistoryData } from '../../../API/ApiServer';
import { Box, Typography } from '@mui/material';
import { assoc } from '../../../utils/assoc';
import { InputArea } from './InputArea';
import { Header } from './Header';
import { MessageList } from './MessageList';
import { useAppSelector } from '../../../store/hooks';

export function makeTimeFromTimestamp(timestamp: number) {
  return new Date(+(timestamp + '000')).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

interface IMessagePanelProps {
  chatId: string;
}

export function MessagePanel({ chatId }: IMessagePanelProps) {
  const [chatHistoryData, setChatHistoryData] = useState<Array<TChatHistoryData>>([]);
  const [text, setText] = useState('');
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const loginData = useAppSelector((state) => state.greenApiReducer.data);
  const ref = useRef<HTMLDivElement>(null);
  const refList = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setErr('');
    if (chatId) {
      ApiServer.getChatHistory({ chatId, count: 50 }, loginData).then(({ data }) => {
        const chatHistory = data
          .reverse()
          .map((message) => assoc('time', makeTimeFromTimestamp(message.timestamp))(message) as TChatHistoryData);
        setChatHistoryData(chatHistory);
      });
    }
  }, [chatId]);

  useEffect(() => {
    if (refList.current) ref.current?.scrollTo(0, refList.current.clientHeight);
  }, [chatHistoryData.length]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    ApiServer.sendMessage({ chatId, message: text }, loginData).then(({ data }) => {
      const newMessage: TChatHistoryData = {
        type: 'outgoing',
        idMessage: data.idMessage,
        typeMessage: 'textMessage',
        textMessage: text,
        timestamp: new Date().getTime(),
        time: makeTimeFromTimestamp(new Date().getTime()),
      };
      setChatHistoryData([...chatHistoryData, newMessage]);
    });
    setText('');
  };

  const setReceivedMessage = () => {
    setIsLoading(true);
    setErr('');
    ApiServer.receiveNotification(loginData)
      .then(({ data }) => {
        if (data && data.body.senderData.sender === chatId) {
          const newMessage: TChatHistoryData = {
            type: 'incoming',
            idMessage: data.body.idMessage,
            typeMessage: 'textMessage',
            textMessage: data.body.messageData.textMessageData.textMessage,
            senderName: data.body.senderData.senderName,
            timestamp: data.body.timestamp,
            time: makeTimeFromTimestamp(new Date(data.body.timestamp).getTime()),
          };
          setChatHistoryData([...chatHistoryData, newMessage]);
          ApiServer.deleteNotification(loginData, data.receiptId);
        } else {
          setErr('Новых входящих сообщений от данного пользователя нет');
        }
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Box
      display='flex'
      flexDirection='column'
      bgcolor='black'
      height={1}
      flexGrow={1}
      boxShadow='0 0 10px 0px black'
      position='relative'
    >
      <Header chatId={chatId} />

      <Box overflow='scroll' height='100%' ref={ref}>
        <MessageList messageData={chatHistoryData} ref={refList} />

        <Box
          position='absolute'
          display={err || isLoading ? 'flex' : 'none'}
          alignItems='center'
          justifyContent='center'
          sx={{ top: '16px', right: '24px' }}
        >
          {err && !isLoading && <Typography color='white'>{err}</Typography>}
        </Box>
      </Box>

      <InputArea
        text={text}
        handleChangeText={(e) => setText(e.target.value)}
        handleSubmit={handleSubmit}
        setMessage={setReceivedMessage}
        isLoading={isLoading}
      />
    </Box>
  );
}
