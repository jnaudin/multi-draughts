<script lang="ts">
  import {
    gameListStore,
    gameStore,
    gameTypeStore,
    messageStore,
  } from "../../stores/stores";
  import { socketStore } from "../../stores/socketStore";
  import { pyGameListStore } from "../../stores/pyStores";
  let gameName = "";
  let gameType = "draughts";
</script>

<h1>Dames</h1>
{#each $gameListStore as game}
  <ul>
    {game}
    <button
      on:click={() => {
        socketStore.sendMessage("join", game);
      }}>Rejoindre</button
    >
  </ul>
{/each}

<h1>Pyramide</h1>
{#each $pyGameListStore as game}
  <ul>
    {game}
    <button
      on:click={() => {
        socketStore.sendMessage("join", game);
      }}>Rejoindre</button
    >
  </ul>
{/each}

<div class="flex">
  <div class="section">
    <label>
      <input
        type="radio"
        bind:group={gameType}
        name="draughts"
        value="draughts"
      />
      Dames
    </label>

    <label>
      <input type="radio" bind:group={gameType} name="py" value="py" />
      Pyramide
    </label>
  </div>
  <div class="section">
    <label for="gameName">Nom de partie : </label>
    <input id="gameName" bind:value={gameName} />
  </div>
  <button
    on:click={() => {
      socketStore.sendMessage("create", gameName, gameType);
      messageStore.set(`Partie de ${gameType} créée : ${gameName}`);
      gameName = "";
    }}>Créer une nouvelle partie</button
  >
</div>

<style>
  ul {
    width: 30%;
    margin: auto;
  }

  .flex {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
  }

  .section {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 0 1rem;
  }
</style>
