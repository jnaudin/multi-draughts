<script lang="ts">
  import {
    gameListStore,
    messageStore,
    socketStore,
  } from "../../stores/stores";
  let gameName: string = "";
</script>

{#each $gameListStore as game}
  <ul>
    {game}
    <button
      on:click={() => {
        socketStore.sendMessage(`join-${game}`);
      }}>Rejoindre</button
    >
  </ul>
{/each}
<label for="gameName">Nom de partie : </label>
<input id="gameName" bind:value={gameName} />
<button
  on:click={() => {
    socketStore.sendMessage(`create-${gameName}`);
    messageStore.set(`Partie créée : ${gameName}`);
    gameName = "";
  }}>Créer une nouvelle partie</button
>

<style>
  ul {
    width: 30%;
    margin: auto;
  }
</style>
