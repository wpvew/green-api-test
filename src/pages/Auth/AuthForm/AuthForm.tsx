import React, { FormEvent, useState } from 'react';
import { Box, FormGroup, List, ListItem, TextField } from '@mui/material';
import { useAppSelector } from '../../../store/hooks';
import { LoadingButton } from '@mui/lab';

type TField = Record<'title' | 'value', string>;
export type TLoginData = Record<'idInstance' | 'apiTokenInstance', TField>;

interface IAuthFormProps {
  onSubmit: (e: FormEvent, loginData: TLoginData) => void;
}

export function AuthForm({ onSubmit }: IAuthFormProps) {
  const isLoading = useAppSelector((state) => state.greenApiReducer.isLoading);
  const [loginData, setLoadingData] = useState<TLoginData>({
    idInstance: { title: 'Instance ID', value: '' },
    apiTokenInstance: { title: 'Api Token Instance', value: '' },
  });

  const handleChangeLoginData = (value: string, key: keyof typeof loginData) => {
    setLoadingData({ ...loginData, [key]: { ...loginData[key], value } });
  };

  return (
    <Box component='form' onSubmit={(e) => onSubmit(e, loginData)}>
      <List>
        {(Object.keys(loginData) as Array<keyof typeof loginData>).map((key) => (
          <ListItem key={key} sx={{ paddingX: 0 }}>
            <FormGroup sx={{ display: 'flex', width: 1 }}>
              <TextField
                label={loginData[key].title}
                value={loginData[key].value}
                onChange={(e) => handleChangeLoginData(e.target.value, key)}
                placeholder={`Введите ваш ${key}`}
              />
            </FormGroup>
          </ListItem>
        ))}
      </List>
      <LoadingButton type='submit' variant='contained' loading={isLoading} sx={{ padding: '8px 40px' }}>
        Вход
      </LoadingButton>
    </Box>
  );
}
