import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player } from '../../types';

const initialState: Player[] = [];

const opponentsSlice = createSlice({
  name: 'opponents',
  initialState,
  reducers: {
    addOpponent: (state: Player[], action: PayloadAction<Player>) => {
      if (!action.payload) return;
      const player = state.find((elem) => elem.id == action.payload.id);
      if (!player) state.push(action.payload); // check if the player is already present
    },
    removeOpponent: (state: Player[], action: PayloadAction<string>) => {
      const index = state.findIndex((opponent: Player) => {
        return opponent.id == action.payload;
      });
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    updateOpponentSpectrum: (
      state: Player[],
      action: PayloadAction<{ playerId: string; spectrum: number[] }>
    ) => {
      const { playerId, spectrum } = action.payload;
      const index = state.findIndex((elem) => elem.id === playerId);
      state[index] = { ...state[index], spectrum };
    },
  },
});

export const { addOpponent, removeOpponent, updateOpponentSpectrum } =
  opponentsSlice.actions;
export default opponentsSlice.reducer;
