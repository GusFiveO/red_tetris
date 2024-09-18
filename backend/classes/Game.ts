import { EventEmitter } from 'events';
import { Player } from './Player';
import { TETROMINOS } from './utils';

interface Players {
  [playerId: string]: Player;
}

export class Game extends EventEmitter {
  roomName: string;
  players: Players;
  started: boolean;
  tetrominoSequence: string[];

  constructor(roomName: string) {
    super();
    this.roomName = roomName;
    this.players = {};
    this.started = false;
    this.tetrominoSequence = this.generateTetrominoSequence();
  }

  generateTetrominoSequence(): string[] {
    const sequence = [];
    const pieceKeys = Object.keys(TETROMINOS);

    for (let i = 0; i < 1000; i++) {
      // Generating a long sequence
      const randomPieceKey =
        pieceKeys[Math.floor(Math.random() * pieceKeys.length)];
      sequence.push(randomPieceKey);
    }
    return sequence;
  }

  isStarted() {
    return this.started;
  }

  start() {
    this.started = true;
    for (const player of Object.values(this.players)) {
      player.startGameLoop();
    }
  }

  areAllPlayersReady() {
    for (const player of Object.values(this.players)) {
      if (!player.isReady()) {
        return false;
      }
    }
    return true;
  }

  handlePlayerMove(playerId: string, moveType: string) {
    const player = this.players[playerId];
    if (player && !player.gameOver) {
      if (moveType == 'left' || moveType == 'right') {
        player.movePiece(moveType);
      }
      if (moveType == 'drop') {
        player.dropPiece();
      }
      if (moveType == 'rotate') {
        player.rotatePiece();
      }
    }
  }

  hasPlayer(playerId: string) {
    return !!this.players[playerId];
  }

  addPlayer(playerId: string, playerName: string) {
    if (!this.players[playerId]) {
      const newPlayer = new Player(playerId, playerName, [
        ...this.tetrominoSequence,
      ]);

      this.playerEventHandler(newPlayer);

      console.log(`Player ${playerName} join the game ${this.roomName}`);
      this.players[playerId] = newPlayer;
      return this.players[playerId];
    }
  }

  playerEventHandler(newPlayer: Player) {
    const playerId = newPlayer.id;

    newPlayer.on('gameOver', () => {
      this.emit('gameOver', playerId);
    });

    newPlayer.on('updateGameState', () => {
      const player = this.players[playerId];
      if (player) {
        const field = player.getMergedField();
        this.emit('updateGameState', {
          playerId: playerId,
          field: field,
          score: player.score,
        });
      }
    });

    newPlayer.on('linesDeleted', (payload: { nbLines: number }) => {
      const penalityLines = payload.nbLines - 1;
      if (penalityLines) {
        this.applyPenalities(newPlayer.id, penalityLines);
      }
    });
  }

  applyPenalities(playerExceptionId: string, nbLines: number) {
    for (const player of Object.values(this.players)) {
      if (player.id != playerExceptionId) {
        player.addUndestructibleLine(nbLines);
      }
    }
  }

  removePlayer(playerId: string) {
    if (this.players[playerId]) {
      delete this.players[playerId];
      console.log(`Player ${playerId} removed from game ${this.roomName}`);
    }
  }

  isEmpty() {
    return Object.keys(this.players).length === 0;
  }

  getAllPlayers() {
    return Object.values(this.players);
  }

  getAllOponents(playerId: string) {
    return Object.values(this.players).filter(
      (player) => player.id != playerId
    );
  }
}
