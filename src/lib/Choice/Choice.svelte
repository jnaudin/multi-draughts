<script lang="ts">
  import { gameListStore } from "../../stores/stores";
  import { socketStore } from "../../stores/socketStore";
  import { pyGameListStore } from "../../stores/pyStores";
  import { toast } from "$lib/Toast/toastStore";
  import Add from "../assets/add.svg";
  import GameList from "$lib/GameList/GameList.svelte";
  let gameName = "";
  let gameType = "draughts";
  const addGame = () => {
    gameName = gameName.replaceAll(/-|,/g, " ");
    socketStore.sendMessage("create", gameName, gameType);
    toast.add({ message: `Partie de ${gameType} créée : ${gameName}` });
    gameName = "";
  };
</script>

<GameList label="Dames" games={$gameListStore} />
<GameList label="Pyramide" games={$pyGameListStore} />

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
  <img on:click={addGame} src={Add} alt="ajouter" />
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
    width: 100%;
    flex-direction: column;
    align-items: start;
  }

  img {
    width: 24px;
    height: 24px;
    align-self: end;
    margin-left: 0.5rem;
  }
</style>
