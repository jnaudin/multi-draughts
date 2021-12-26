import WebSocket, { WebSocketServer } from "ws";

//initialize the WebSocket server instance
const wss = new WebSocketServer({ port: Number(process.env.PORT) || 8999 });

type GameType = {
  name: string;
  player1: WebSocket;
  player2?: WebSocket;
  turn: "black" | "white";
};

const games: GameType[] = [];

const changeTurn = (game: GameType) => {
  game.turn = game.turn === "black" ? "white" : "black";
};

wss.on("connection", (ws: WebSocket) => {
  // on connexion, assign game
  const availableGame = games.find(({ player2 }) => !player2);
  if (availableGame) availableGame.player2 = ws;
  else games.push({ name: "todo", player1: ws, turn: "white" });
  ws.send(`color-${availableGame ? "black" : "white"}`);

  ws.on("message", (move) => {
    //send back the message to opponent
    wss.clients.forEach((client) => {
      const game = games.find(
        ({ player1, player2 }) =>
          client != ws && (player1 === client || player2 === client)
      );

      if (game && client.readyState === WebSocket.OPEN) {
        client.send(move.toString());
        changeTurn(game);
      }
    });
  });
});
