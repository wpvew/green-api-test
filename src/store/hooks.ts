import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { TRootState, TAppDispatch } from '.';

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
