import { assoc } from './assoc';

export const generateRandomString = () => {
  const rand = Math.random().toString(36).substring(2, 15);
  return rand;
};

export const generateId = <O extends object>(obj: O) => assoc('id', generateRandomString())(obj);
