import { Player } from './Player';

interface Players {
  [playerId: string]: Player;
}

export class Game {
  roomName: string;
  players: Players;

  constructor(roomName: string) {
    this.roomName = roomName;
    this.players = {};
  }

  hasPlayer(playerId: string) {
    return !!this.players[playerId];
  }

  addPlayer(playerId: string, playerName: string) {
    if (!this.players[playerId]) {
      this.players[playerId] = new Player(playerId, playerName);
      console.log(`Player ${playerName} join the game ${this.roomName}`);
      return { id: playerId, name: playerName, firstLine: 0 };
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
