import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OpponentState {
  name: string;
  firstLine: number;
}

// const initialState: OpponentState[] = [];

const opponentsSample = [
  { name: 'Player 1', firstLine: 2 },
  { name: 'Player 2', firstLine: 5 },
  { name: 'Player 3', firstLine: 8 },
  { name: 'Player 4', firstLine: 11 },
  { name: 'Player 5', firstLine: 14 },
  { name: 'Player 6', firstLine: 2 },
  { name: 'Player 7', firstLine: 5 },
  { name: 'Player 8', firstLine: 8 },
  { name: 'Player 9', firstLine: 11 },
  { name: 'Player 10', firstLine: 15 },
  { name: 'Player 8', firstLine: 8 },
  { name: 'Player 9', firstLine: 11 },
  { name: 'Player 10', firstLine: 15 },
  { name: 'Player 8', firstLine: 8 },
  { name: 'Player 9', firstLine: 11 },
  { name: 'Player 10', firstLine: 15 },
  { name: 'Player 8', firstLine: 8 },
  { name: 'Player 9', firstLine: 11 },
  { name: 'Player 10', firstLine: 15 },
  { name: 'Player 8', firstLine: 8 },
  { name: 'Player 9', firstLine: 11 },
  { name: 'Player 10', firstLine: 15 },
  { name: 'Player 8', firstLine: 8 },
  { name: 'Player 9', firstLine: 11 },
  { name: 'Player 10', firstLine: 15 },
];

const initialState: OpponentState[] = opponentsSample;

const opponentsSlice = createSlice({
  name: 'opponents',
  initialState,
  reducers: {
    addOpponent: (
      state: OpponentState[],
      action: PayloadAction<OpponentState>
    ) => {
      state.push(action.payload);
    },
    updateOpponentFirstLine: (
      state: OpponentState[],
      action: PayloadAction<{ index: number; firstLine: number }>
    ) => {
      const { index, firstLine } = action.payload;
      state[index] = { ...state[index], firstLine };
    },
  },
});

export const { addOpponent, updateOpponentScore, updateOpponentFirstLine } =
  opponentsSlice.actions;
export default opponentsSlice.reducer;
