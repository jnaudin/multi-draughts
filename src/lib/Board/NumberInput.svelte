<script lang="ts">
  import { socketStore } from "../../stores/socketStore";
  import { pyHinterStore, pyNumberStore } from "../../stores/pyStores";
  import { playerNameStore } from "../../stores/stores";
  let number = 3;
</script>

{#if $pyHinterStore === $playerNameStore && !$pyNumberStore}
  <div class="container">
    <label for="number">Combien d'indice ? </label>
    <input style={"width: 12px"} id="number" bind:value={number} />
    <button
      on:click={() => {
        socketStore.sendMessage("number", number);
      }}
    >
      C'est parti !
    </button>
  </div>
{/if}

<style>
  .container {
    margin: 1rem;
  }
</style>
