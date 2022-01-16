<script lang="ts">
  import { socketStore } from "../../stores/socketStore";
  import { pyHinterStore, pyHintStore } from "../../stores/pyStores";
  import { playerNameStore } from "../../stores/stores";
</script>

{#if $pyHinterStore === $playerNameStore}
  <div class="container">
    <label for="hintWord">Un mot pour l'aider : </label>
    <input id="hintWord" bind:value={$pyHintStore} />
    <button
      on:click={() => {
        pyHintStore.update((h) => h.replaceAll(/-|,/g, " "));
        socketStore.sendMessage("hint", $pyHintStore);
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
