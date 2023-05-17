import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Auth } from '../pages/Auth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchGreenApiByLocal } from '../store/slice/greenApiSlice';
import { ErrorPage } from '../pages/ErrorPage';

export function Routing() {
  const [isMounted, setIsMointed] = useState(false);
  const idInstance = useAppSelector((state) => state.greenApiReducer.data.idInstance);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.idInstance) {
      dispatch(
        fetchGreenApiByLocal({ idInstance: localStorage.idInstance, apiTokenInstance: localStorage.apiTokenInstance })
      ).then(() => setIsMointed(true));
    } else {
      setIsMointed(true);
    }
  }, []);

  return (
    <>
      {isMounted && (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={idInstance ? <Home /> : <Navigate to='/auth' replace />} />
            <Route path='/auth' element={!idInstance ? <Auth /> : <Navigate to='/' replace />} />
            <Route path='/*' element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}
