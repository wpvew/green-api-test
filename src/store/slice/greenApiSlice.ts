import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue } from '@reduxjs/toolkit';
import ApiServer from '../../API/ApiServer';

type TLoginData = {
  idInstance: string;
  apiTokenInstance: string;
};

const emptyGreenApiData: TLoginData = {
  idInstance: '',
  apiTokenInstance: '',
};

type TGreenApiState = {
  isLoading: boolean;
  error: string;
  data: TLoginData;
};

const initialState: TGreenApiState = {
  isLoading: false,
  error: '',
  data: emptyGreenApiData,
};

export const fetchGreenApiByLogin = createAsyncThunk<TLoginData, TLoginData, { rejectValue: string }>(
  'greenApiData/fetchByLogin',
  async (loginData, { rejectWithValue }) => {
    try {
      await ApiServer.getStateInstance(loginData).then(() => {
        localStorage.setItem('idInstance', loginData.idInstance);
        localStorage.setItem('apiTokenInstance', loginData.apiTokenInstance);
      });
      return loginData;
    } catch (e) {
      throw rejectWithValue('Некорретные данные');
    }
  }
);

export const fetchGreenApiByLocal = createAsyncThunk<TLoginData, TLoginData, { rejectValue: string }>(
  'greenApiData/fetchByLocal',
  async (loginData, { rejectWithValue }) => {
    try {
      await ApiServer.getStateInstance(loginData).then(({ data }) => data);
      return loginData;
    } catch (e) {
      throw rejectWithValue('Некорретные данные');
    }
  }
);

const greenApiSlice = createSlice({
  name: 'greenApiData',
  initialState,
  reducers: {
    updateGreenApiData(state, action) {
      state.data.idInstance = action.payload.idInstance;
      state.data.apiTokenInstance = action.payload.apiTokenInstance;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isPending(fetchGreenApiByLogin, fetchGreenApiByLocal), (state) => {
        state.error = '';
        state.isLoading = true;
        state.data = emptyGreenApiData;
      })
      .addMatcher(isFulfilled(fetchGreenApiByLogin, fetchGreenApiByLocal), (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addMatcher(isRejectedWithValue(fetchGreenApiByLogin, fetchGreenApiByLocal), (state, action) => {
        state.isLoading = false;
        if (action.payload) state.error = action.payload;
      });
  },
});

export const { updateGreenApiData } = greenApiSlice.actions;

export default greenApiSlice.reducer;
