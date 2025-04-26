// store/features/gameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum GameState {
  InLobby = 'IN_LOBBY',
  InGame = 'IN_GAME',
  GameWin = 'GAME_WIN',
  GameOver = 'GAME_OVER',
}

type GameSliceState = {
  gameState: GameState;
  isOwner: boolean;
  isRunning: boolean;
  level: number;
};

const initialState: GameSliceState = {
  gameState: GameState.InLobby, // Initially in the lobby
  isOwner: false, // Initially, the player is not the owner
  isRunning: false,
  level: 1,
};

const gameReducer = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState: (state, action: PayloadAction<GameState>) => {
      state.gameState = action.payload;
    },
    setIsOwner: (state, action: PayloadAction<boolean>) => {
      state.isOwner = action.payload;
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setStartingLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
  },
});

export const { setGameState, setIsOwner, setIsRunning, setStartingLevel } =
  gameReducer.actions;
export default gameReducer.reducer;
