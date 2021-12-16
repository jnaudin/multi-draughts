<script lang="ts">
  import Grid from "../lib/Grid/Grid.svelte";
  import Instructions from "../lib/Instructions/Instructions.svelte";
</script>

<main>
  <h1>Jeu de dames</h1>
  <Grid />
  <Instructions />
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
