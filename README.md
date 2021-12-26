# Draughts

It is a classic draught game wth Front in Svelte and back in Rust

## Front

Start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Building:

```bash
npm run build
```

## Back

REST API needs to have four endpoints:
/games
GET: list available games
POST: create a new game
/games/:id
GET: find a game by its ID
DELETE: delete a game by its ID
/registration
GET: list all registations attached to a game
POST: register to a game
DELETE: unregister to a game
/games/:id/click
POST: click on a cell - params: {line, col}
websocket for changes ...
