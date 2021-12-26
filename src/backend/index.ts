import WebSocket, { WebSocketServer } from "ws";

//initialize the WebSocket server instance
const wss = new WebSocketServer({ port: Number(process.env.PORT) || 8999 });

wss.on("connection", (ws: WebSocket) => {
  console.log("connected");
  //todo, handle color, game ...

  ws.on("message", (move) => {
    //send back the message to the other clients
    wss.clients.forEach(
      (client) =>
        client != ws &&
        client.readyState === WebSocket.OPEN &&
        client.send(move.toString())
    );
  });
});
