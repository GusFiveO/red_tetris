import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OpponentState {
  name: string;
  score: number;
  firstLine: number;
}

// const initialState: OpponentState[] = [];

const opponentsSample = [
  { name: 'Player 1', firstLine: 2, score: 100 },
  { name: 'Player 2', firstLine: 5, score: 150 },
  { name: 'Player 3', firstLine: 8, score: 80 },
  { name: 'Player 4', firstLine: 11, score: 200 },
  { name: 'Player 5', firstLine: 14, score: 120 },
  { name: 'Player 6', firstLine: 2, score: 90 },
  { name: 'Player 7', firstLine: 5, score: 110 },
  { name: 'Player 8', firstLine: 8, score: 180 },
  { name: 'Player 9', firstLine: 11, score: 160 },
  { name: 'Player 10', firstLine: 15, score: 140 },
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
    updateOpponentScore: (
      state: OpponentState[],
      action: PayloadAction<{ index: number; score: number }>
    ) => {
      state[action.payload.index].score = action.payload.score;
    },
    updateOpponentField: (
      state: OpponentState[],
      action: PayloadAction<{ index: number; firstLine: number }>
    ) => {
      state[action.payload.index].firstLine = action.payload.firstLine;
    },
  },
});

// Export actions and reducer
export const { addOpponent, updateOpponentScore, updateOpponentField } =
  opponentsSlice.actions;
export default opponentsSlice.reducer;
