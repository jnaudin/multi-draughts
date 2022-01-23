<script lang="ts">
  import { onMount } from "svelte";
  import { gameStore, gameTypeStore } from "../stores/stores";
  import { socketStore } from "../stores/socketStore";

  import Grid from "../lib/Grid/Grid.svelte";
  import Instructions from "../lib/Instructions/Instructions.svelte";
  import Choice from "$lib/Choice/Choice.svelte";
  import Board from "$lib/Board/Board.svelte";
  import NameInput from "$lib/NameInput/NameInput.svelte";

  //subscribe to store to connect to the websocket
  onMount(() => {
    socketStore.subscribe((data) => console.log("subscribe", data));
  });
</script>

<main>
  <h1>Jeux multi</h1>
  <NameInput />
  {#if $gameStore}
    {#if $gameTypeStore === "draughts"}
      <Grid />
      <Instructions />
    {:else}
      <Board />
    {/if}
  {:else}
    <Choice />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 0 0 3em;
  }

  h1 {
    color: brown;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 500;
  }
</style>
