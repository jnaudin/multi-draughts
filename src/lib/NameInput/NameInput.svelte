<script lang="ts">
  import { gameStore, playerNameStore } from "../../stores/stores";
  import { socketStore } from "../../stores/socketStore";
  import { toast } from "$lib/Toast/toastStore";
</script>

<div class="container">
  {#if gameStore}
    Mon nom : {$playerNameStore}
  {:else}
    <label for="playerName">Mon nom : </label>
    <input id="playerName" bind:value={$playerNameStore} />
    <button
      on:click={() => {
        playerNameStore.update((n) => n.replaceAll(/-|,/g, " "));
        socketStore.sendMessage("changename", $playerNameStore);
        toast.add({
          type: "info",
          message: `Ton nouveau nom est maintenant : ${$playerNameStore}`,
        });
      }}>Je change mon pseudo</button
    >
  {/if}
</div>

<style>
  .container {
    margin: 1rem;
  }
</style>
