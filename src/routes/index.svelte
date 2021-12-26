<script lang="ts">
  import { onMount } from "svelte";
  import { gameStore, socketStore } from "../stores/stores";

  import Grid from "../lib/Grid/Grid.svelte";
  import Instructions from "../lib/Instructions/Instructions.svelte";
  import Choice from "$lib/Choice/Choice.svelte";

  //subscribe to store to connect to the websocket
  onMount(() => {
    socketStore.subscribe((data) => console.log("subscribe", data));
  });
</script>

<main>
  <h1>Jeu de dames</h1>
  {#if $gameStore}
    <Grid />
    <Instructions />
  {:else}
    <Choice />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 0 0 3em;
    background-color: skyblue;
  }

  h1 {
    color: brown;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 500;
  }
</style>
