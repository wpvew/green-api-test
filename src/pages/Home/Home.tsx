import React, { FormEvent, useEffect, useState } from 'react';
import { MessagePanel } from './MessagePanel';
import { Box, Container } from '@mui/material';
import { Layout } from '../../components/Layout';
import { useAppSelector } from '../../store/hooks';
import { AuthPhone } from './AuthPhone';
import { ServicePanel } from './ServicePanel';
import { CreateChat } from './CreateChat';
import ApiServer from '../../API/ApiServer';

export function Home() {
  const loginData = useAppSelector((state) => state.greenApiReducer.data);
  const [isAuthPhone, setIsAuthPhone] = useState(true);
  const [chatPhone, setChatPhone] = useState('');
  const [chatId, setChatId] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    ApiServer.getStateInstance(loginData).then(({ data }) => {
      if (data.stateInstance == 'notAuthorized') setIsAuthPhone(false);
      setIsMounted(true);
    });
  }, []);

  const handleCheckPhone = async (e: FormEvent) => {
    e.preventDefault();
    const handlePhone = chatPhone.replace(/[\D]+/g, '');
    ApiServer.checkWhatsapp(loginData, handlePhone)
      .then(({ data: { existsWhatsapp } }) => {
        if (existsWhatsapp) {
          setChatId(`${handlePhone}@c.us`);
          setChatPhone('');
        } else {
          setErr('Пользователь не существует');
        }
      })
      .catch(() => {
        setErr('Телефон некорректный');
      });
  };
  return (
    <Layout>
      {isMounted && (
        <Box component='section' display='flex' height='100vh' position='relative' boxShadow='0 0 10px 0px black'>
          <Container maxWidth='lg' sx={{ p: '50px' }}>
            {isAuthPhone ? (
              <Box height={1} display='flex'>
                <ServicePanel removeChatId={() => setChatId('')} />
                <MessagePanel chatId={chatId} />
                {!chatId && (
                  <CreateChat value={chatPhone} onChange={setChatPhone} onSubmit={handleCheckPhone} errMsg={err} />
                )}
              </Box>
            ) : (
              <AuthPhone onChangeStatusLog={() => setIsAuthPhone(true)} />
            )}
          </Container>
        </Box>
      )}
    </Layout>
  );
}
