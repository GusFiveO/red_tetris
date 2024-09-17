import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createMatrix } from '../../utils/gameUtils';

interface PlayerState {
  id: string;
  score: number;
  field: number[][];
}

const initialState: PlayerState = {
  id: '',
  score: 200,
  field: createMatrix(20, 10),
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updatePlayerScore: (state: PlayerState, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    updatePlayerField: (
      state: PlayerState,
      action: PayloadAction<number[][]>
    ) => {
      state.field = action.payload;
    },
  },
});

export const { updatePlayerScore, updatePlayerField } = playerSlice.actions;
export default playerSlice.reducer;
