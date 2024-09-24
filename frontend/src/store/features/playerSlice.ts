import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createMatrix } from '../../utils/gameUtils';

interface PlayerState {
  id: string;
  score: number;
  field: number[][];
}

const initialState: PlayerState = {
  id: '',
  score: 0,
  field: createMatrix(20, 10),
};

type Matrix = number[][];

export interface Piece {
  matrix: Matrix;
  position: { x: number; y: number };
}

export function mergeField(field: Matrix, piece: Piece) {
  const mergedField = field.map((row) => [...row]);

  const { x: pieceX, y: pieceY } = piece.position;

  for (let y = 0; y < piece.matrix.length; y++) {
    for (let x = 0; x < piece.matrix[y].length; x++) {
      if (piece.matrix[y][x] !== 0) {
        const fieldX = pieceX + x;
        const fieldY = pieceY + y;

        if (
          fieldY >= 0 &&
          fieldY < field.length &&
          fieldX >= 0 &&
          fieldX < field[0].length
        ) {
          mergedField[fieldY][fieldX] = piece.matrix[y][x];
        }
      }
    }
  }

  return mergedField;
}

function collides(field: Matrix, piece: Piece) {
  const { x: pieceX, y: pieceY } = piece.position;

  for (let y = 0; y < piece.matrix.length; y++) {
    for (let x = 0; x < piece.matrix[y].length; x++) {
      if (piece.matrix[y][x] !== 0) {
        const fieldX = pieceX + x;
        const fieldY = pieceY + y;

        if (
          fieldX < 0 ||
          fieldX > field[0].length ||
          fieldY > field.length ||
          field[fieldY]?.[fieldX] != 0 ||
          field[fieldY]?.[fieldX] < 0
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updatePlayerScore: (state: PlayerState, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    updatePlayerField: (
      state: PlayerState,
      action: PayloadAction<{ field: Matrix; piece: Piece }>
    ) => {
      const shadow = {
        matrix: [...action.payload.piece.matrix],
        position: { ...action.payload.piece.position },
      };

      while (!collides(action.payload.field, shadow)) shadow.position.y += 1;
      shadow.position.y -= 1;

      shadow.matrix = shadow.matrix.map((row) =>
        row.map((cell) => (cell === 0 ? 0 : cell + 10))
      );

      console.log(shadow.matrix);
      state.field = mergeField(action.payload.field, shadow);
      state.field = mergeField(state.field, action.payload.piece);
    },
  },
});

export const { updatePlayerScore, updatePlayerField } = playerSlice.actions;
export default playerSlice.reducer;
