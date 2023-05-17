import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Layout } from '../../components/Layout';

export function ErrorPage() {
  return (
    <Layout>
      <Container maxWidth='md'>
        <Box py='60px' textAlign='center'>
          <Typography color='#454545' fontSize='144px'>
            404
          </Typography>
          <Typography component='h1' color='#454545' fontSize='44px'>
            Page not found
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
}
