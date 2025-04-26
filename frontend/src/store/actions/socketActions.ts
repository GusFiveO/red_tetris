// actions/socketActions.ts
export const connectSocket = (
  url: string,
  room: string,
  playerName: string
) => ({
  type: 'SOCKET_CONNECT' as const,
  payload: { url, room, playerName },
});

export const emitSocketEvent = (event: string, data?: any) => ({
  type: 'SOCKET_EMIT' as const,
  payload: { event, data },
});

export const disconnectSocket = () => ({
  type: 'SOCKET_DISCONNECT' as const,
});

export const playerMove = (roomName: string | undefined, moveType: string) => ({
  type: 'SOCKET_EMIT',
  payload: {
    event: 'playerMove',
    data: { roomName, moveType },
  },
});
