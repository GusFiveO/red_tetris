import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OpponentState {
  id: string;
  name: string;
  firstLine: number;
}

// const opponentsSample = [
//   { name: 'Player 1', firstLine: 2 },
//   { name: 'Player 2', firstLine: 5 },
//   { name: 'Player 3', firstLine: 8 },
//   { name: 'Player 4', firstLine: 11 },
//   { name: 'Player 5', firstLine: 14 },
//   { name: 'Player 6', firstLine: 2 },
//   { name: 'Player 7', firstLine: 5 },
//   { name: 'Player 8', firstLine: 8 },
//   { name: 'Player 9', firstLine: 11 },
//   { name: 'Player 10', firstLine: 15 },
//   { name: 'Player 8', firstLine: 8 },
//   { name: 'Player 9', firstLine: 11 },
//   { name: 'Player 10', firstLine: 15 },
//   { name: 'Player 8', firstLine: 8 },
//   { name: 'Player 9', firstLine: 11 },
//   { name: 'Player 10', firstLine: 15 },
//   { name: 'Player 8', firstLine: 8 },
//   { name: 'Player 9', firstLine: 11 },
//   { name: 'Player 10', firstLine: 15 },
//   { name: 'Player 8', firstLine: 8 },
//   { name: 'Player 9', firstLine: 11 },
//   { name: 'Player 10', firstLine: 15 },
//   { name: 'Player 8', firstLine: 8 },
//   { name: 'Player 9', firstLine: 11 },
//   { name: 'Player 10', firstLine: 15 },
// ];

// const initialState: OpponentState[] = opponentsSample;
const initialState: OpponentState[] = [];

const opponentsSlice = createSlice({
  name: 'opponents',
  initialState,
  reducers: {
    addOpponent: (
      state: OpponentState[],
      action: PayloadAction<OpponentState>
    ) => {
      if (!action.payload) return;
      const player = state.find((elem) => elem.id == action.payload.id);
      if (!player) state.push(action.payload); // check if the player is already present
    },
    removeOpponent: (state: OpponentState[], action: PayloadAction<string>) => {
      const index = state.findIndex((opponent: OpponentState) => {
        return opponent.id == action.payload;
      });
      if (index > -1) {
        state.splice(index, 1);
      }
    },
    updateOpponentFirstLine: (
      state: OpponentState[],
      action: PayloadAction<{ playerId: string; firstLine: number }>
    ) => {
      const { playerId, firstLine } = action.payload;
      const index = state.findIndex((elem) => elem.id === playerId);
      state[index] = { ...state[index], firstLine };
    },
  },
});

export const { addOpponent, removeOpponent, updateOpponentFirstLine } =
  opponentsSlice.actions;
export default opponentsSlice.reducer;
