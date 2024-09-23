import { EventEmitter } from 'events';
import { Player } from './Player';
import { mergeField, TETROMINOS } from './utils';

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
  // INITIALIZATION

  generateTetrominoSequence(): string[] {
    const sequence = [];
    const pieceKeys = Object.keys(TETROMINOS);

    for (let i = 0; i < 1000; i++) {
      const randomPieceKey =
        pieceKeys[Math.floor(Math.random() * pieceKeys.length)];
      sequence.push(randomPieceKey);
    }
    return sequence;
  }

  // GAME STATE
  isStarted() {
    return this.started;
  }

  isEmpty() {
    return Object.keys(this.players).length === 0;
  }

  start() {
    this.started = true;
    this.emit('gameStarted');
    for (const player of Object.values(this.players)) {
      player.startGameLoop();
    }
  }

  stop() {
    for (const player of Object.values(this.players)) {
      player.stopGameLoop();
      this.started = false;
    }
  }

  // PLAYER RELATED METHODS
  addPlayer(playerId: string, playerName: string) {
    if (!this.players[playerId]) {
      const newPlayer = new Player(playerId, playerName, [
        ...this.tetrominoSequence,
      ]);

      this.playerEventHandler(newPlayer);

      console.log(`Player ${playerName} join the game ${this.roomName}`);
      this.players[playerId] = newPlayer;
      return this.players[playerId];
    } else {
      return this.players[playerId];
    }
  }

  removePlayer(playerId: string) {
    if (this.players[playerId]) {
      this.players[playerId].stopGameLoop();
      delete this.players[playerId];
      console.log(`Player ${playerId} removed from game ${this.roomName}`);
    }
  }

  hasPlayer(playerId: string) {
    return !!this.players[playerId];
  }

  getAllPlayers() {
    return Object.values(this.players);
  }

  getAllOponents(playerId: string) {
    return Object.values(this.players).filter(
      (player) => player.id != playerId
    );
  }

  getWinner() {
    if (this.started) {
      const inGamePlayers = Object.values(this.players).filter(
        (player) => !player.gameOver
      );
      if (inGamePlayers.length === 1) {
        return inGamePlayers[0];
      }
    }
    return null;
  }

  areAllPlayersReady() {
    if (this.isEmpty()) {
      return false;
    }
    for (const player of Object.values(this.players)) {
      if (!player.isReady()) {
        return false;
      }
    }
    return true;
  }

  playerEventHandler(newPlayer: Player) {
    const playerId = newPlayer.id;

    newPlayer.on('gameOver', () => {
      this.emit('gameOver', playerId);
      this.players[playerId].gameOver = true;
      const winner = this.getWinner();
      if (winner) {
        this.stop();
        this.emit('gameWinner', {
          playerId: winner.id,
          playerName: winner.name,
          playerScore: winner.score,
        });
      }
    });

    newPlayer.on('updateGameState', () => {
      const player = this.players[playerId];
      if (player) {
        const field = mergeField(player.field, player.currentPiece);
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

    newPlayer.on('updateFirstLine', () => {
      this.emit('updateFirstLine', {
        playerId: newPlayer.id,
        firstLine: newPlayer.firstLine,
      });
    });
  }

  // GAMEPLAY
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
      if (moveType == 'hardDrop') {
        player.hardDropPiece();
      }
    }
  }
  applyPenalities(playerExceptionId: string, nbLines: number) {
    for (const player of Object.values(this.players)) {
      if (player.id != playerExceptionId) {
        player.addPendingPenality(nbLines);
      }
    }
  }
}
