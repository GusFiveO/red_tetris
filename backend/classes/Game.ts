import { Player } from './Player';

interface Players {
  [playerId: string]: Player;
}

export class Game {
  roomName: string;
  players: Players;
  started: boolean;

  constructor(roomName: string) {
    this.roomName = roomName;
    this.players = {};
    this.started = false;
  }

  isStarted() {
    return this.started;
  }

  start() {
    this.started = true;
  }

  handlePlayerMove(playerId: string, moveType: string) {
    return;
  }

  hasPlayer(playerId: string) {
    return !!this.players[playerId];
  }

  addPlayer(playerId: string, playerName: string) {
    if (!this.players[playerId]) {
      this.players[playerId] = new Player(playerId, playerName);
      console.log(`Player ${playerName} join the game ${this.roomName}`);
      return this.players[playerId];
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

  broadcast(event: string, payload: any) {}
}
