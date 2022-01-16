<script lang="ts">
  import { socketStore } from "../../stores/socketStore";
  import { pyGuesserStore, pyGuessStore } from "../../stores/pyStores";
  import { playerNameStore } from "../../stores/stores";
</script>

{#if $pyGuesserStore === $playerNameStore}
  <div class="container">
    <label for="guessWord">le mot est : </label>
    <input id="guessWord" bind:value={$pyGuessStore} />
    <button
      on:click={() => {
        pyGuessStore.update((h) => h.replaceAll(/-|,/g, " "));
        socketStore.sendMessage("guess", $pyGuessStore);
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
