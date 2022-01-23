<script lang="ts">
  import { socketStore } from "../../stores/socketStore";
  import {
    foundStore,
    pyGuessesStore,
    pyHinterStore,
    pyHintsStore,
    pyNumberStore,
  } from "../../stores/pyStores";
  import { playerNameStore } from "../../stores/stores";
  let hint = "";
</script>

{#if $pyHinterStore === $playerNameStore && !!$pyNumberStore && $pyHintsStore.length === $pyGuessesStore.length}
  <div class="container">
    <label for="hintWord">Un mot pour l'aider : </label>
    <input id="hintWord" bind:value={hint} />
    <button
      on:click={() => {
        socketStore.sendMessage("hint", hint.replaceAll(/-|,/g, " "));
        socketStore.sendMessage("found", "WAIT");
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
