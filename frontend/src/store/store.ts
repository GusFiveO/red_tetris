import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import gameSlice from './features/gameSlice';
import opponentsReducer from './features/opponentsSlice';
import playerReducer from './features/playerSlice';
import { socketMiddleware } from './socketMiddleware';

const store = configureStore({
  reducer: {
    player: playerReducer,
    opponents: opponentsReducer,
    game: gameSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
