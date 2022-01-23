<script lang="ts">
  import { socketStore } from "../../stores/socketStore";
  import {
    pyGuesserStore,
    pyGuessesStore,
    pyHintsStore,
  } from "../../stores/pyStores";
  import { playerNameStore } from "../../stores/stores";
  let guess = "";
</script>

{#if $pyGuesserStore === $playerNameStore && $pyHintsStore.length > $pyGuessesStore.length}
  <div class="container">
    <label for="guessWord">Je devine : </label>
    <input id="guessWord" bind:value={guess} />
    <button
      on:click={() => {
        socketStore.sendMessage("guess", guess.replaceAll(/-|,/g, " "));
        guess = "";
      }}
    >
      je propose
    </button>
  </div>
{/if}

<style>
  .container {
    margin: 1rem;
  }
</style>
