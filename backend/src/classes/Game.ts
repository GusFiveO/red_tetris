import { EventEmitter } from 'events';
import { Player } from './Player';
import { TETROMINOS } from './utils';

interface Players {
  [playerId: string]: Player;
}

export class Game extends EventEmitter {
  ownerId: string;
  roomName: string;
  players: Players;
  started: boolean;
  tetrominoSequence: string[];

  constructor(ownerId: string, roomName: string) {
    super();
    this.ownerId = ownerId;
    this.roomName = roomName;
    this.players = {};
    this.tetrominoSequence = this.generateTetrominoSequence();
    this.started = false;
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

  start(level: number) {
    this.started = true;
    this.emit('gameStarted');
    console.log('start level:', level);
    for (const player of Object.values(this.players)) {
      player.level = level;
      player.linesCleared = (level - 1) * 10;
      player.gameOver = false;
      // player.startGameLoop();
      player.updateDropInterval();
    }
  }

  stop() {
    this.started = false;
    for (const player of Object.values(this.players)) {
      player.stopGameLoop();
    }
  }

  // PLAYER RELATED METHODS
  addPlayer(player: Player) {
    if (!this.players[player.id]) {
      this.playerEventHandler(player);

      console.log(`Player ${player.name} join the game ${this.roomName}`);
      this.players[player.id] = player;
      return this.players[player.id];
    } else {
      return this.players[player.id];
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

  playerEventHandler(newPlayer: Player) {
    const playerId = newPlayer.id;

    newPlayer.on('gameOver', () => {
      const winner = this.getWinner();
      this.emit('gameOver', {
        playerId: playerId,
        playerName: newPlayer.name,
        playerScore: newPlayer.score,
      });
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
        // const field = mergeField(player.field, player.currentPiece);
        const field = player.field;
        this.emit('updateGameState', {
          playerId: playerId,
          field: field,
          score: player.score,
          piece: player.currentPiece.getState(),
        });
      }
    });

    newPlayer.on('linesDeleted', (payload: { nbLines: number }) => {
      const penalityLines = payload.nbLines - 1;
      if (penalityLines) {
        this.applyPenalities(newPlayer.id, penalityLines);
      }
    });

    newPlayer.on('updateSpectrum', () => {
      this.emit('updateSpectrum', {
        playerId: newPlayer.id,
        spectrum: newPlayer.spectrum,
      });
    });

    newPlayer.on('updateNextPiece', () => {
      this.emit('updateNextPiece', {
        playerId: newPlayer.id,
        nextPiece: newPlayer.getNextPiece().getState(),
      });
    });
  }

  // GAMEPLAY
  handlePlayerMove(playerId: string, moveType: string) {
    if (!this.started) {
      return;
    }
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
