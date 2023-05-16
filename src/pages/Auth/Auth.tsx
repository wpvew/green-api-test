import React, { FormEvent } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { Layout } from '../../components/Layout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchGreenApiByLogin } from '../../store/slice/greenApiSlice';
import { AuthForm, TLoginData } from './AuthForm';

export function Auth() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.greenApiReducer.error);

  const handleSubmit = (e: FormEvent, loginData: TLoginData) => {
    e.preventDefault();
    dispatch(
      fetchGreenApiByLogin({
        idInstance: loginData.idInstance.value,
        apiTokenInstance: loginData.apiTokenInstance.value,
      })
    );
  };

  return (
    <Layout>
      <Container maxWidth='sm'>
        <Typography paddingY='27px' component='h1' fontSize='20px' fontWeight='600' color='white'>
          Green-Api
        </Typography>
        <Box>
          <Paper sx={{ p: '30px', minHeight: '360px' }}>
            <Box position='relative'>
              <Typography component='h2' fontSize='24px' fontWeight='500'>
                Вход
              </Typography>

              <AuthForm onSubmit={handleSubmit} />

              {error && (
                <Typography position='absolute' top={0} right={0} color='red' fontSize='14px'>
                  {error}
                </Typography>
              )}
            </Box>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
}
